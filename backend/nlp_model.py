import re
import math
from collections import Counter

# Canonical Skill Tokens Mapping for Python NLP Backend
SKILL_PATTERNS = {
    'python': r'\b(python|py)\b',
    'sql': r'\b(sql|mysql|postgresql|postgres|sqlite|t-sql)\b',
    'excel': r'\b(excel|vlookup|pivot tables|spreadsheet)\b',
    'power bi': r'\b(power bi|powerbi|dax|power query)\b',
    'tableau': r'\b(tableau)\b',
    'statistics': r'\b(statistics|statistical analysis|a/b testing)\b',
    'pandas': r'\b(pandas)\b',
    'numpy': r'\b(numpy)\b',
    'react': r'\b(react|react\.js|reactjs)\b',
    'node.js': r'\b(node|node\.js|nodejs)\b',
    'javascript': r'\b(javascript|js|es6)\b',
    'typescript': r'\b(typescript|ts)\b',
    'mongodb': r'\b(mongodb|mongo|mongoose)\b',
    'postgresql': r'\b(postgresql|postgres)\b',
    'express.js': r'\b(express|express\.js)\b',
    'docker': r'\b(docker|containerization)\b',
    'pytorch': r'\b(pytorch|torch)\b',
    'tensorflow': r'\b(tensorflow|tf|keras)\b',
    'scikit-learn': r'\b(scikit-learn|sklearn)\b',
    'machine learning': r'\b(machine learning|ml)\b',
    'deep learning': r'\b(deep learning|dl|neural networks)\b',
    'nlp': r'\b(nlp|natural language processing|transformers|bert)\b',
    'fastapi': r'\b(fastapi)\b',
    'network security': r'\b(network security|firewall|tcp/ip)\b',
    'linux': r'\b(linux|ubuntu|bash)\b',
    'wireshark': r'\b(wireshark|pcap)\b',
    'siem': r'\b(siem|splunk)\b',
    'java': r'\b(java|spring boot)\b',
    'c++': r'\b(c\+\+|cpp)\b',
    'data structures': r'\b(data structures|dsa|linked list|trees|graphs)\b',
    'algorithms': r'\b(algorithms|sorting|dynamic programming)\b'
}

class ResumeNLPAnalyzer:
    def __init__(self):
        pass

    def extract_skills(self, text):
        """Extract canonical skills from text using compiled regex patterns."""
        if not text:
            return []
        text_lower = text.lower()
        extracted = []
        for skill, pattern in SKILL_PATTERNS.items():
            if re.search(pattern, text_lower):
                extracted.append(skill)
        return extracted

    def compute_semantic_similarity(self, text_a, text_b):
        """Pure Python Cosine Similarity on Term Frequencies (0.0 to 1.0)."""
        if not text_a or not text_b:
            return 0.0
        
        words_a = re.findall(r'\w+', text_a.lower())
        words_b = re.findall(r'\w+', text_b.lower())
        
        vec_a = Counter(words_a)
        vec_b = Counter(words_b)
        
        intersection = set(vec_a.keys()).intersection(set(vec_b.keys()))
        dot_product = sum(vec_a[x] * vec_b[x] for x in intersection)
        
        sum_a = sum(vec_a[x]**2 for x in vec_a.keys())
        sum_b = sum(vec_b[x]**2 for x in vec_b.keys())
        magnitude = math.sqrt(sum_a) * math.sqrt(sum_b)
        
        if not magnitude:
            return 0.0
        return dot_product / magnitude

    def evaluate_role_fit(self, resume_text, role_skills, sample_jd):
        """Combined High Accuracy Semantic & Skill Gap Score."""
        semantic_sim = self.compute_semantic_similarity(resume_text, sample_jd)
        extracted_skills = set(self.extract_skills(resume_text))
        
        matched_skills = [s for s in role_skills if s.lower() in extracted_skills]
        missing_skills = [s for s in role_skills if s.lower() not in extracted_skills]
        
        skill_coverage = len(matched_skills) / max(1, len(role_skills))
        fit_score = (semantic_sim * 0.5) + (skill_coverage * 0.5)
        fit_percentage = min(98, max(15, int(fit_score * 135)))
        
        return {
            "fit_percentage": fit_percentage,
            "semantic_similarity": round(semantic_sim * 100, 2),
            "matched_skills": matched_skills,
            "missing_skills": missing_skills,
            "extracted_skills": list(extracted_skills)
        }
