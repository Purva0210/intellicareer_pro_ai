# IntelliCareer Pro AI v3.0 🚀
> **AI-Powered NLP Resume Analyzer, Semantic Job Matcher, Skill-Gap Course Recommender, Placement Quiz & Internshala-Style Mock Interview Platform**

---

## 📌 Project Overview
**IntelliCareer Pro AI** is an end-to-end, career and placement assistance system built for students, job seekers, and recruiters.

IntelliCareer Pro uses an NLP pipeline combining TF-IDF-style term-frequency vectors, cosine similarity and regex entity parsing for skill extraction, ATS compatibility checks, role matching and mock interview answer feedback. These are baseline techniques; accuracy figures should be reported only from your own evaluation results.

---

## 🚀 Quick Setup & Execution Guide

### 1. Run the Web Application (React + Vite)
```bash
# Navigate to project folder
cd intellicareer-ai

# Install node dependencies
npm install

# Start local dev server
npm run dev
```
Open **`http://localhost:3000`** in your browser.

---

### 2. Run the Python Backend & Model Accuracy Benchmark (Academic / Defense)
To run the small baseline evaluation on the sample dataset:

```bash
# Run the standalone accuracy benchmark script
python backend/train_eval.py
```

Results depend on the dataset; the sample set is only 5 resumes, so treat metrics as a smoke test, not a validated accuracy.

To run the REST API server:
```bash
python backend/app.py
```
Server runs at `http://localhost:5000`.

---

## 🌟 Key Features & Capabilities

### 1. PDF & DOCX Resume Extraction & ATS Quality Scorer
- Upload any PDF or DOCX file (or try 1-click sample resumes).
- Extracts Email, Phone, LinkedIn, GitHub, technical skills, action verbs, and numerical metric achievements.
- Generates **Overall Resume Score (0-100)** and **ATS Compatibility Score**.

### 2. Role Matching & Skill Gap Analysis
- Evaluates resume vectors against 6 major tech profiles: **Data Analyst, Full Stack Developer, Machine Learning Engineer, Cybersecurity Analyst, Software Engineer, Data Scientist**.
- Paste any custom Job Description from LinkedIn/Naukri for 1-on-1 semantic vector matching.
- Highlights matched primary skills vs missing priority skill gaps.

### 3. Educational Course & Project Blueprints
- Provides genuine, working links from accredited platforms: **Coursera, edX, Kaggle, freeCodeCamp, MDN Web Docs, Microsoft Learn, PyTorch, TensorFlow, Cisco Networking Academy**.
- Recommends real-world portfolio project blueprints with step-by-step implementation plans and GitHub topic links.

### 4. Job Board & Portal Search Deep-Links
- Job recommendations matched to candidate's strongest skills.
- Includes pre-configured direct application search queries for **LinkedIn Jobs, Internshala, Naukri.com, Indeed, Wellfound, Google Careers**.
- Features **Job Target Mode** to focus your entire interview & quiz preparation on one target company lead.

### 5. Timed Placement & Aptitude Quiz Engine
- Simulates TCS NQT, Accenture, Infosys, and tech company placement tests.
- Quantitative Aptitude, Logical Reasoning, Verbal Ability, and Role Technical Core.
- Timer countdown, question palette (Answered, Flagged, Unvisited), and detailed solution breakdown.

### 6. Internshala-Style Interactive Mock Interview
- Live WebCam stream preview + microphone audio volume visualizer (built with Web Audio API).
- AI response evaluator checks **STAR Method** (Situation, Task, Action, Result), keyword density, and structural clarity.

### 7. Recruiter Cold Email & Referral Outreach Assistant
- Generates customized cold emails, LinkedIn connection requests, and polite application follow-up messages tailored with your extracted technical skills.

### 8. Application Tracker & Career Readiness Score
- Interactive job search Kanban pipeline (Saved -> Applied -> Assessment -> Interview -> Offer).
- Calculates continuous **Career Readiness Index (0-100%)**.

---

## 📦 Zip Creation
To package the entire project into a zip file for sharing:
```bash
npm run zip
```
Generates `intellicareer_pro_ai.zip` in the root directory.

---

## Model, dataset & evaluation (added)

**Pipeline:** skill dictionary (`src/data/skillsData.js`, strict boundary matching, case-sensitive short aliases) →
rule scores (skill coverage + TF cosine) **blended with** a trained TF-IDF + logistic-regression role classifier
(`src/data/roleModel.json`, inference in `src/services/roleModel.js`).

**Dataset:** `backend/dataset/resumes_synthetic_150.json` — 150 *synthetic* labeled resumes (25 per role, 4 layouts A–D,
overlapping skills, decoy text, 30% cross-role tasks). Regenerate with `npm run ml:dataset`.
It is a stand-in: real, consented, anonymised resumes in the same JSON schema should be added before quoting final numbers.

**Commands**
```bash
npm run ml:dataset   # regenerate synthetic dataset
npm run ml:train     # CV + unseen-layout test, export roleModel.json (needs python3 + scikit-learn)
npm run eval         # evaluate the real JS engine (skills, contacts, roles)
```

**Results (synthetic data — optimistic, see caveats)**

| Metric | Original engine | Now |
|---|---|---|
| Skill extraction F1 | 72.6% | 99.7% |
| Phone detection F1 | 49% (missed `+91 98765 43210`) | 100% |
| Role top-1, layout D never seen in training | 88.9% | 100% (rules alone 97.2%, ML alone 97.2%; n=36) |

**Caveats:** the generator and dictionary share aliases, so skill scores are partly circular; every role metric is at a
ceiling, so rules vs ML vs blend cannot be separated statistically (n=36). Treat these as regression tests, not as
real-world accuracy. Real-world numbers need real labeled resumes.
