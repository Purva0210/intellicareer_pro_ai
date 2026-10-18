import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from nlp_model import ResumeNLPAnalyzer

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend cross-origin requests

analyzer = ResumeNLPAnalyzer()

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "online",
        "service": "IntelliCareer Pro Python NLP Engine",
        "version": "3.0.0",
    })

@app.route('/api/analyze-resume', methods=['POST'])
def analyze_resume():
    data = request.json or {}
    text = data.get('text', '')
    if not text:
        return jsonify({"error": "No resume text provided"}), 400
        
    extracted_skills = analyzer.extract_skills(text)
    return jsonify({
        "status": "success",
        "extracted_skills": extracted_skills,
        "word_count": len(text.split())
    })

@app.route('/api/match-job', methods=['POST'])
def match_job():
    data = request.json or {}
    resume_text = data.get('resume_text', '')
    role_skills = data.get('role_skills', [])
    sample_jd = data.get('sample_jd', '')
    
    result = analyzer.evaluate_role_fit(resume_text, role_skills, sample_jd)
    return jsonify({
        "status": "success",
        "result": result
    })

if __name__ == '__main__':
    print("Starting IntelliCareer Pro Python Flask API server on http://localhost:5000 ...")
    app.run(host='0.0.0.0', port=5000, debug=True)
