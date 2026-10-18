import json
import os
from nlp_model import ResumeNLPAnalyzer

def run_benchmark():
    print("=" * 60)
    print("  INTELLICAREER PRO ML MODEL EVALUATION & ACCURACY BENCHMARK  ")
    print("=" * 60)
    
    dataset_path = os.path.join(os.path.dirname(__file__), 'dataset', 'resumes_labeled.json')
    if not os.path.exists(dataset_path):
        print("Dataset not found!")
        return

    with open(dataset_path, 'r') as f:
        samples = json.load(f)

    analyzer = ResumeNLPAnalyzer()
    
    total_true_positives = 0
    total_false_positives = 0
    total_false_negatives = 0
    
    for item in samples:
        actual_skills = set(item['skills'])
        predicted_skills = set(analyzer.extract_skills(item['text']))
        
        tp = len(actual_skills.intersection(predicted_skills))
        fp = len(predicted_skills - actual_skills)
        fn = len(actual_skills - predicted_skills)
        
        total_true_positives += tp
        total_false_positives += fp
        total_false_negatives += fn
    
    precision = total_true_positives / max(1, (total_true_positives + total_false_positives))
    recall = total_true_positives / max(1, (total_true_positives + total_false_negatives))
    f1_score = 2 * (precision * recall) / max(1e-6, (precision + recall))
    accuracy = f1_score * 100  # displayed as F1 percentage
    
    print(f"\n[+] Total Labeled Test Samples : {len(samples)}")
    print(f"[+] Total True Positives (TP)   : {total_true_positives}")
    print(f"[+] Total False Positives (FP)  : {total_false_positives}")
    print(f"[+] Total False Negatives (FN)  : {total_false_negatives}")
    print("-" * 60)
    print(f"[*] Skill Extraction Precision : {precision * 100:.2f}%")
    print(f"[*] Skill Extraction Recall    : {recall * 100:.2f}%")
    print(f"[*] Model F1-Score (not accuracy) : {accuracy:.2f}%")
    print("=" * 60)
    print("=" * 60)

if __name__ == '__main__':
    run_benchmark()
