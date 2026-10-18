// Inference for the TF-IDF + logistic-regression role classifier trained in ml/train_role_model.py.
// Tokenisation MUST stay identical to the Python side (lowercase, [a-z0-9+#]+, uni+bigrams, sublinear tf, l2).
import MODEL from '../data/roleModel.json';

const VOCAB = new Map(Object.entries(MODEL.vocab));
const TOKEN_RE = /[a-z0-9+#]+/g;

function analyze(text) {
  const w = text.toLowerCase().match(TOKEN_RE) || [];
  const terms = w.slice();
  for (let i = 0; i < w.length - 1; i++) terms.push(`${w[i]} ${w[i + 1]}`);
  return terms;
}

export const ROLE_MODEL_BLEND_WEIGHT = MODEL.blendWeightML;

/** Returns { roleId: probability } (sums to 1) or null when the text has no known vocabulary. */
export function predictRoleProbabilities(text) {
  if (!text || !text.trim()) return null;
  const counts = new Map();
  for (const t of analyze(text)) if (VOCAB.has(t)) counts.set(t, (counts.get(t) || 0) + 1);
  if (counts.size === 0) return null;

  const x = []; // sparse [index, value]
  let norm = 0;
  for (const [term, c] of counts) {
    const i = VOCAB.get(term);
    const v = (1 + Math.log(c)) * MODEL.idf[i];
    x.push([i, v]);
    norm += v * v;
  }
  norm = Math.sqrt(norm) || 1;

  const logits = MODEL.roles.map((_, r) => {
    let z = MODEL.intercept[r];
    for (const [i, v] of x) z += MODEL.coef[r][i] * (v / norm);
    return z;
  });
  const max = Math.max(...logits);
  const exps = logits.map((z) => Math.exp(z - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return Object.fromEntries(MODEL.roles.map((role, r) => [role, exps[r] / sum]));
}
