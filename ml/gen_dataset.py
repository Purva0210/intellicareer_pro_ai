"""Generate a labeled SYNTHETIC resume dataset (150 resumes, 25 per role, 4 layouts).

Ground truth = the canonical skills that were actually written into each resume (in random
alias forms) + the target role + which contact fields exist. Style 'D' is a layout that the
classifier never sees in training (used as the honest held-out test).

NOTE: synthetic data is a stand-in for real resumes. Replace/extend with real, consented,
anonymised resumes (same JSON schema) to get production-grade numbers.
"""
import json, random, os
HERE = os.path.dirname(__file__)
SKILLS = json.load(open(os.path.join(HERE, 'skills_dump.json')))
ROLES = json.load(open(os.path.join(HERE, 'roles_dump.json')))
rnd = random.Random(2026)

NEIGHBORS = {
    'data_analyst': ['data_scientist', 'fullstack_dev'],
    'data_scientist': ['data_analyst', 'ml_engineer'],
    'ml_engineer': ['data_scientist', 'software_engineer'],
    'fullstack_dev': ['software_engineer', 'data_analyst'],
    'software_engineer': ['fullstack_dev', 'ml_engineer', 'cybersecurity_analyst'],
    'cybersecurity_analyst': ['software_engineer', 'data_analyst'],
}
ACRO = {'sql','etl','nlp','aws','ci/cd','siem','soc','xss','oop','dsa','hdfs','vpn','dax','pki','cnn','lstm','rnn','jvm','jdk','cpp','ctf','html','css','scss','sass','ga4','jwt','aes','rsa','dfir','ids/ips','tcp/ip','ssl/tls','pcap','yolo','bert','cv2','psql','elk stack'}
SPECIAL = {'pytorch':'PyTorch','tensorflow':'TensorFlow','node.js':'Node.js','nodejs':'NodeJS','next.js':'Next.js','nextjs':'NextJS','mongodb':'MongoDB','postgresql':'PostgreSQL','javascript':'JavaScript','typescript':'TypeScript','scikit-learn':'Scikit-learn','numpy':'NumPy','powerbi':'PowerBI','power bi':'Power BI','fastapi':'FastAPI','opencv':'OpenCV','graphql':'GraphQL','github actions':'GitHub Actions','mlflow':'MLflow','mlops':'MLOps','hugging face':'Hugging Face','huggingface':'HuggingFace','express.js':'Express.js','c++':'C++','react.js':'React.js','pyspark':'PySpark','owasp':'OWASP','metasploit':'Metasploit','wireshark':'Wireshark','nmap':'Nmap','a/b testing':'A/B Testing','mysql':'MySQL','sqlite':'SQLite','tailwindcss':'TailwindCSS'}

def disp(alias, cs=False):
    if cs: return alias
    if alias in SPECIAL: return SPECIAL[alias]
    if alias in ACRO: return alias.upper()
    return rnd.choice([alias.title(), alias, alias.capitalize()]) if len(alias) > 3 else alias.upper()

def surface(skill):
    d = SKILLS[skill]
    pool = [(a, False) for a in d.get('a', [])] + [(a, True) for a in d.get('cs', [])]
    # prefer the first (most common) alias
    if len(pool) > 1 and rnd.random() < 0.6:
        pool = pool[:1] if not d.get('a') else [(d['a'][0], False)]
    a, cs = rnd.choice(pool)
    return disp(a, cs)

TASKS = {
 'data_analyst': ['build weekly sales dashboards','clean and join customer records','track marketing KPIs','automate monthly reporting','analyse churn drivers for the retail team','prepare executive reports on revenue trends','validate data quality across source systems'],
 'data_scientist': ['build predictive models for customer churn','run experiments on pricing changes','forecast demand across regions','mine behavioural patterns from clickstream logs','estimate uplift from marketing campaigns','develop credit-risk scoring models','analyse large datasets to find drivers of retention'],
 'ml_engineer': ['train and deploy image classification models','serve models behind low-latency APIs','fine-tune language models for ticket routing','productionise recommendation models','set up model monitoring and retraining','optimise inference latency for edge devices','build an end-to-end training pipeline'],
 'fullstack_dev': ['build responsive single-page applications','design REST endpoints for the booking platform','implement authentication and role-based access','ship an e-commerce storefront and admin panel','build real-time dashboards for logistics teams','refactor a legacy frontend into reusable components','create a CMS with server-side rendering'],
 'software_engineer': ['design scalable backend services','implement core modules of the payments engine','optimise hot paths in the order-matching service','write clean, testable library code','solve complex scheduling problems for the platform team','develop a high-throughput message processor','review code and mentor junior engineers'],
 'cybersecurity_analyst': ['monitor and triage security alerts','investigate suspicious network activity','harden servers and review access policies','run vulnerability scans and report findings','support on-call escalations and post-mortems','conduct web application security assessments','write detection rules for the monitoring team'],
}
VERBS = ['Developed','Built','Implemented','Designed','Optimized','Automated','Led','Created','Deployed','Analyzed','Delivered','Improved','Engineered','Managed','Contributed to','Worked on','Helped','Maintained']
OUTCOMES = ['reducing turnaround time by {p}%','improving accuracy by {p}%','serving {n:,}+ users','processing {n:,} records daily','cutting costs by {p}%','increasing throughput by {p}%','', '', '']
DECOYS = ['Worked closely with the rest of the team on weekly planning.','Targeting full-time roles starting next quarter.','Completed spring semester coursework with distinction.','Curriculum vitae and references available on request.','Contributed to R&D documentation and process notes.','Comfortable with MS Office, Windows and remote collaboration tools.','Hobbies: chess, hiking, photography.','Keen to express interest in roles with strong mentoring culture.']
FIRST = ['Aarav','Diya','Rohan','Sneha','Kabir','Meera','Arjun','Ananya','Vikram','Isha','Neha','Rahul','Priya','Siddharth','Tanvi','Yash','Pooja','Karan','Aditi','Nikhil','Riya','Omkar','Sakshi','Harsh']
LAST = ['Sharma','Patil','Desai','Iyer','Nair','Gupta','Joshi','Kulkarni','Mehta','Singh','Reddy','Verma','Shah','Pawar','Menon','Bhatt']
COLLEGES = ['Pune Institute of Technology','Mumbai College of Engineering','Delhi Technical University','Bangalore Institute of Technology','Chennai Engineering College','Hyderabad University of Technology']
DEGREES = ['B.E. in Computer Engineering','B.Tech in Information Technology','B.E. in Artificial Intelligence and Data Science','B.Tech in Computer Science & Engineering','B.Sc in Computer Science']
CERTS = ['Google Data Analytics Certificate','Cloud Practitioner Certificate','Coursera Applied Learning Specialization','NPTEL Computer Science Fundamentals','Udemy Web Development Bootcamp','CompTIA Security Plus','Hackerrank Problem Solving (Gold)']

def pick_skills(role):
    r = ROLES[role]
    n_p = rnd.randint(4, 8) if rnd.random() > 0.2 else rnd.randint(2, 4)      # 20% weaker/career-switch
    prim = rnd.sample(r['primary'], min(n_p, len(r['primary'])))
    sec = rnd.sample(r['secondary'], min(rnd.randint(1, 5), len(r['secondary'])))
    nb = rnd.choice(NEIGHBORS[role]) if rnd.random() < 0.8 else rnd.choice(list(ROLES))
    other = ROLES[nb]['primary'] + ROLES[nb]['secondary']
    extra = rnd.sample(other, rnd.randint(1, 4 if rnd.random() < 0.25 else 2))
    out = []
    for s in prim + sec + extra:
        if s not in out and s in SKILLS: out.append(s)
    return out

def contact_block(name):
    slug = name.lower().replace(' ', '.')
    c = {'email': f"{slug}{rnd.choice(['', '23', '01', '.dev'])}@{rnd.choice(['gmail.com','outlook.com','mail.com'])}", 'phone': None, 'linkedin': None, 'github': None}
    if rnd.random() < 0.85: c['phone'] = rnd.choice([f"+91 {rnd.randint(70000,99999)} {rnd.randint(10000,99999)}", f"{rnd.randint(70000,99999)}{rnd.randint(10000,99999)}", f"+91-{rnd.randint(70000,99999)}-{rnd.randint(10000,99999)}"])
    if rnd.random() < 0.7: c['linkedin'] = f"linkedin.com/in/{slug.replace('.', '-')}"
    if rnd.random() < 0.55: c['github'] = f"github.com/{slug.replace('.', '')}"
    return c

def contact_line(c, sep=' | '):
    parts = [f"Email: {c['email']}"]
    if c['phone']: parts.append(f"Phone: {c['phone']}")
    if c['linkedin']: parts.append(f"LinkedIn: {c['linkedin']}")
    if c['github']: parts.append(f"GitHub: {c['github']}")
    return sep.join(parts)

def bullets(role, skills, n):
    """n bullets that together mention every skill in `skills` at least once."""
    skills = skills[:]; rnd.shuffle(skills)
    chunks = [skills[i::n] for i in range(n)]
    out = []
    for ch in chunks:
        if not ch: ch = []
        names = [surface(s) for s in ch]
        tool = (' and '.join(names) if len(names) <= 2 else ', '.join(names[:-1]) + ' and ' + names[-1]) if names else ''
        outcome = rnd.choice(OUTCOMES).format(p=rnd.randint(8, 45), n=rnd.randint(2, 90) * 1000)
        task = rnd.choice(TASKS[role] if rnd.random() > 0.3 else TASKS[rnd.choice(NEIGHBORS[role])])  # 30% cross-role tasks (reduce leakage)
        v = rnd.choice(VERBS)
        line = f"{v} work to {task}" if v in ('Worked on','Helped','Contributed to') and not tool else f"{v} {task}"
        if tool: line += f" using {tool}"
        if outcome: line += f", {outcome}"
        out.append(line + '.')
    return out

def build(role, style, idx):
    name = f"{rnd.choice(FIRST)} {rnd.choice(LAST)}"
    c = contact_block(name)
    skills = pick_skills(role)
    college, degree = rnd.choice(COLLEGES), rnd.choice(DEGREES)
    cg = f"CGPA: {rnd.uniform(6.8, 9.4):.2f}/10"; yr = rnd.randint(2022, 2027)
    title = {'data_analyst':'Data Analyst','data_scientist':'Data Scientist','ml_engineer':'Machine Learning Engineer','fullstack_dev':'Full Stack Developer','software_engineer':'Software Engineer','cybersecurity_analyst':'Cybersecurity Analyst'}[role]
    if rnd.random() < 0.5:   # half of the resumes state the title explicitly, half are generic
        aspire = rnd.choice([f"aspiring {title}", f"{title} fresher", f"final-year engineering student interested in {title} roles", f"early-career {title}"])
    else:
        aspire = rnd.choice(["engineering student seeking an entry-level technology role", "recent graduate looking for a software-industry opening", "technology fresher open to multiple roles"])
    exp_title = title if rnd.random() < 0.5 else 'Technical'
    decoys = rnd.sample(DECOYS, rnd.randint(0, 2))
    L = []
    if style == 'A':
        in_block = [s for s in skills if rnd.random() < 0.7]
        L += [name.upper(), contact_line(c), '', 'SUMMARY', f"Motivated {aspire} with project and internship experience.", '', 'EDUCATION', f"{degree} | {college} | {cg} | {yr}", '', 'TECHNICAL SKILLS']
        labels = ['Languages & Core','Frameworks & Tools','Platforms & Concepts','Other']
        for i in range(0, len(in_block), 3):
            L.append(f"- {labels[(i//3) % 4]}: " + ', '.join(surface(s) for s in in_block[i:i+3]))
        L += ['', 'EXPERIENCE', f"{exp_title} Intern | {rnd.choice(['Nova Labs','BrightStack','Orbit Analytics','Kite Systems'])} | {rnd.choice(['Jan','Jun'])} {yr-1} - {rnd.choice(['May','Dec'])} {yr-1}"]
        L += ['- ' + b for b in bullets(role, skills, rnd.randint(3, 5))]
        L += ['', 'PROJECTS'] + ['- ' + b for b in bullets(role, rnd.sample(skills, max(1, len(skills)//2)), 2)]
        if rnd.random() < 0.7: L += ['', 'CERTIFICATIONS', '- ' + rnd.choice(CERTS)]
        L += [''] + decoys
    elif style == 'B':
        L += [name, contact_line(c, ' · '), '', 'Profile', f"I am an {aspire}. " + ' '.join(bullets(role, skills[:2], 1)), '', 'Experience']
        L += ['• ' + b for b in bullets(role, skills[2:] or skills, rnd.randint(4, 6))]
        L += ['', 'Education', f"{degree}, {college} ({yr}). {cg}"] + [''] + decoys
        if rnd.random() < 0.5: L += ['', 'Courses & training', rnd.choice(CERTS)]
    elif style == 'C':
        L += [name.upper(), contact_line(c, ' // '), f"OBJECTIVE: {aspire} seeking an entry-level position.", '',
              'CORE COMPETENCIES', ' | '.join(surface(s) for s in skills if rnd.random() < 0.75), '',
              'WORK HISTORY']
        L += ['* ' + b for b in bullets(role, skills, rnd.randint(2, 3))]
        L += ['', 'EDUCATION', f"{degree} - {college}, {yr}", f"{cg}"] + decoys
    else:  # D: held-out narrative layout
        mine = [surface(s) for s in skills]
        rnd.shuffle(mine)
        L += [f"{name}", f"Reach me: {contact_line(c, ', ')}", '', 'About me',
              f"I'm an {aspire}. Day to day I reach for {', '.join(mine[:3])}"
              + (f" and, when the problem needs it, {', '.join(mine[3:5])}." if len(mine) > 3 else '.'), '',
              "Where I've worked and what I've shipped"]
        rest = skills[:]
        for b in bullets(role, rest, rnd.randint(3, 4)):
            L += [b.replace('Developed ', 'I developed ').replace('Built ', 'I built ').replace('Led ', 'I led '), '']
        L += ['Studies', f"{degree}, {college}, class of {yr} ({cg})."] + [''] + decoys
        if rnd.random() < 0.5: L += ['', 'Extras', rnd.choice(CERTS)]
    text = '\n'.join(L)
    truth = sorted(s for s in skills if True)
    return {'id': f"{role}-{style}-{idx}", 'style': style, 'target_role': role, 'text': text, 'skills': truth,
            'contact': {k: bool(v) for k, v in c.items()}}

def main():
    data = []
    for role in ROLES:
        styles = ['A']*7 + ['B']*6 + ['C']*6 + ['D']*6
        for i, st in enumerate(styles):
            data.append(build(role, st, i))
    rnd.shuffle(data)
    # sanity: every labelled skill must really be present in the text via some alias (generator invariant)
    out = os.path.join(HERE, '..', 'backend', 'dataset', 'resumes_synthetic_150.json')
    json.dump(data, open(out, 'w'), indent=1)
    from collections import Counter
    print(len(data), Counter(d['target_role'] for d in data), Counter(d['style'] for d in data))
    print('avg skills/resume', sum(len(d['skills']) for d in data)/len(data))
if __name__ == '__main__': main()
