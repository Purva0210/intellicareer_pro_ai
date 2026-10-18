"""Train + honestly evaluate the role classifier, then export it for the JavaScript app.

Protocol (no leakage):
  1. 5-fold stratified CV on layouts A/B/C        -> in-distribution estimate + tune blend weight
  2. Train on A/B/C, test on unseen layout D       -> generalisation estimate
  3. Final model refit on all 150 resumes          -> exported to src/data/roleModel.json
Tokenisation is identical in JS (lowercase, [a-z0-9+#]+, unigrams+bigrams, sublinear tf, l2).
"""
import json, os, re, math, numpy as np
from collections import Counter
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold
from sklearn.metrics import f1_score
HERE = os.path.dirname(__file__)
data = json.load(open(os.path.join(HERE, '..', 'backend', 'dataset', 'resumes_synthetic_150.json')))
rule = json.load(open(os.path.join(HERE, 'rule_scores.json')))
ROLES = sorted(set(d['target_role'] for d in data))
TOK = re.compile(r'[a-z0-9+#]+')

def analyzer(text):
    w = TOK.findall(text.lower())
    return w + [f'{a} {b}' for a, b in zip(w, w[1:])]

def fit_vec(texts, min_df=2, max_features=3000):
    df = Counter()
    for t in texts: df.update(set(analyzer(t)))
    n = len(texts)
    terms = [t for t, c in df.most_common() if c >= min_df][:max_features]
    vocab = {t: i for i, t in enumerate(sorted(terms))}
    idf = np.zeros(len(vocab))
    for t, i in vocab.items(): idf[i] = math.log((1 + n) / (1 + df[t])) + 1
    return vocab, idf

def transform(texts, vocab, idf):
    X = np.zeros((len(texts), len(vocab)))
    for r, t in enumerate(texts):
        for term, c in Counter(analyzer(t)).items():
            i = vocab.get(term)
            if i is not None: X[r, i] = (1 + math.log(c)) * idf[i]
        nrm = np.linalg.norm(X[r])
        if nrm > 0: X[r] /= nrm
    return X

def train(rows, C=10.0):
    texts = [d['text'] for d in rows]; y = [ROLES.index(d['target_role']) for d in rows]
    vocab, idf = fit_vec(texts)
    clf = LogisticRegression(C=C, max_iter=2000).fit(transform(texts, vocab, idf), y)
    return vocab, idf, clf

def probs(model, rows):
    vocab, idf, clf = model
    return clf.predict_proba(transform([d['text'] for d in rows], vocab, idf))

def rule_mat(rows): return np.array([[rule[d['id']][r] for r in ROLES] for d in rows])
def gold(rows): return np.array([ROLES.index(d['target_role']) for d in rows])

def report(name, P, rows):
    y = gold(rows); pred = P.argmax(1)
    top3 = np.mean([y[i] in np.argsort(-P[i])[:3] for i in range(len(y))])
    print(f"  {name:<22} top1={np.mean(pred==y)*100:5.1f}  top3={top3*100:5.1f}  macroF1={f1_score(y,pred,average='macro')*100:5.1f}")
    return np.mean(pred == y)

ABC = [d for d in data if d['style'] != 'D']; D = [d for d in data if d['style'] == 'D']
# ---- 1. CV on A/B/C: ML probs out-of-fold, tune blend weight
oof = np.zeros((len(ABC), len(ROLES)))
for tr, te in StratifiedKFold(5, shuffle=True, random_state=0).split(ABC, gold(ABC)):
    oof[te] = probs(train([ABC[i] for i in tr]), [ABC[i] for i in te])
R_abc = rule_mat(ABC)
print('5-fold CV on layouts A/B/C (n=%d)' % len(ABC))
report('rules only', R_abc, ABC); report('ML only', oof, ABC)
accs = {}
for w in [0, .2, .4, .5, .6, .8, 1]:
    accs[w] = report(f'blend w_ml={w}', w * oof + (1 - w) * R_abc, ABC)
top = [w for w, a in accs.items() if a >= max(accs.values()) - 1e-9]
best_w = float(np.median(top))   # middle of the best plateau (more robust than an arbitrary tie-break)
print('  -> best plateau', top, '-> chosen w_ml =', best_w)
# ---- 2. unseen layout D
m = train(ABC); P_d = probs(m, D); R_d = rule_mat(D)
print('Train A/B/C -> test unseen layout D (n=%d)' % len(D))
report('rules only', R_d, D); report('ML only', P_d, D); report(f'blend w_ml={best_w}', best_w * P_d + (1 - best_w) * R_d, D)
# ---- 3. final export (fit on everything)
vocab, idf, clf = train(data)
model = {'roles': ROLES, 'blendWeightML': best_w, 'vocab': {t: i for t, i in vocab.items()},
         'idf': [round(float(x), 4) for x in idf], 'coef': [[round(float(x), 3) for x in row] for row in clf.coef_],
         'intercept': [round(float(x), 4) for x in clf.intercept_]}
out = os.path.join(HERE, '..', 'src', 'data', 'roleModel.json')
json.dump(model, open(out, 'w'), separators=(',', ':'))
parity = {d['id']: [round(float(x), 5) for x in p] for d, p in zip(data[:10], probs((vocab, idf, clf), data[:10]))}
json.dump(parity, open(os.path.join(HERE, 'parity_check.json'), 'w'))
print('exported', out, round(os.path.getsize(out) / 1024), 'KB, vocab', len(vocab))
