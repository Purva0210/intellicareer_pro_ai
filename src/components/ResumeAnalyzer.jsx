import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Award, 
  Sparkles, 
  User, 
  Mail, 
  Phone, 
  Linkedin, 
  Github,
  Zap,
  ArrowRight
} from 'lucide-react';
import { parseResumeFile } from '../services/pdfParser';
import { evaluateResumeQuality, classifyTopRoles } from '../services/nlpEngine';
import { SAMPLE_RESUMES } from '../data/sampleResumes';
import { JOB_ROLES } from '../data/rolesData';

export default function ResumeAnalyzer({ 
  resumeText, 
  setResumeText, 
  qualityAnalysis, 
  setQualityAnalysis, 
  selectedTargetRole, 
  setSelectedTargetRole,
  setActiveTab
}) {
  const [isParsing, setIsParsing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [parseError, setParseError] = useState(null);

  const handleFileUpload = async (file) => {
    if (!file) return;
    setIsParsing(true);
    setParseError(null);
    try {
      const text = await parseResumeFile(file);
      if (!text || text.trim().length < 20) {
        throw new Error('No readable text found in this file. It may be a scanned/image-based PDF. Please upload a text-based PDF, DOCX, or TXT.');
      }
      setResumeText(text);
      const analysis = evaluateResumeQuality(text);
      setQualityAnalysis(analysis);
      
      const roleClassification = classifyTopRoles(text);
      if (roleClassification?.bestMatchRole?.roleId) {
        setSelectedTargetRole(roleClassification.bestMatchRole.roleId);
      }
    } catch (err) {
      setParseError(err.message || 'Failed to parse file');
    } finally {
      setIsParsing(false);
    }
  };

  const onFileInputChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) handleFileUpload(file);
    e.target.value = ''; // allow re-selecting the same file
  };

  const loadSampleResume = (sampleKey) => {
    const sample = SAMPLE_RESUMES[sampleKey];
    if (!sample) return;
    setResumeText(sample.rawText);
    const analysis = evaluateResumeQuality(sample.rawText);
    setQualityAnalysis(analysis);
    setSelectedTargetRole(sample.targetRole);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const bestRoles = resumeText && resumeText.trim() ? classifyTopRoles(resumeText) : null;

  return (
    <div className="tab-container animate-fade-in">
      {/* Header Banner */}
      <div className="section-banner glass-card">
        <div className="banner-content">
          <div className="banner-title-group">
            <Sparkles className="banner-icon" />
            <h2>AI Resume Analyzer & Quality Scorer</h2>
          </div>
          <p className="banner-subtitle">
            Upload your resume in PDF or DOCX format. Our NLP engine extracts skills, metrics, ATS compatibility, and automatically recommends your top career role.
          </p>
        </div>
        {/* Sample Resume Quick Load */}
        <div className="sample-loader-group">
          <span className="sample-label">Or try a sample resume:</span>
          <div className="sample-buttons">
            <button className="sample-btn" onClick={() => loadSampleResume('data_analyst')}>
              📊 Data Analyst
            </button>
            <button className="sample-btn" onClick={() => loadSampleResume('fullstack_dev')}>
              💻 Full Stack Dev
            </button>
            <button className="sample-btn" onClick={() => loadSampleResume('ml_engineer')}>
              🤖 ML Engineer
            </button>
          </div>
        </div>
      </div>

      <div className="grid-2-col">
        {/* Left Column: File Upload & Raw Text */}
        <div className="col-box flex-col gap-16">
          {/* Upload Dropzone */}
          <div 
            className={`dropzone glass-card ${dragOver ? 'drag-over' : ''} ${isParsing ? 'parsing' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              id="resume-file-input" 
              accept=".pdf,.docx,.doc,.txt"
              onChange={onFileInputChange}
              className="hidden-file-input"
            />
            <label htmlFor="resume-file-input" className="dropzone-label">
              <div className="upload-icon-wrapper">
                <Upload className="upload-icon" />
              </div>
              <div className="upload-text">
                <span className="upload-primary-text">
                  {isParsing ? 'Analyzing Document with NLP...' : 'Click to Upload Resume or Drag & Drop'}
                </span>
                <span className="upload-secondary-text">Supports PDF, DOCX, and TXT files (up to 10MB)</span>
              </div>
            </label>
          </div>

          {parseError && (
            <div className="alert-card error-alert">
              <AlertTriangle className="alert-icon" />
              <span>{parseError}</span>
            </div>
          )}

          {/* Target Role Selector Card */}
          {bestRoles?.bestMatchRole && (
            <div className="glass-card padding-20">
              <div className="card-header-row">
                <Zap className="card-header-icon text-accent" />
                <h3>Target Career Role Selection</h3>
              </div>
              <p className="card-desc">
                AI Auto-Detected Best Role Match: <strong className="text-primary">{bestRoles.bestMatchRole.roleTitle}</strong> ({bestRoles.bestMatchRole.fitPercentage}% Fit)
              </p>
              <div className="role-selector-grid">
                {Object.values(JOB_ROLES).map((role) => {
                  const isSelected = selectedTargetRole === role.id;
                  return (
                    <button
                      key={role.id}
                      className={`role-select-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedTargetRole(role.id)}
                    >
                      <span className="role-card-title">{role.title}</span>
                      <span className="role-card-category">{role.category}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Raw Resume Text Preview */}
          {resumeText && (
            <div className="glass-card padding-20">
              <div className="card-header-row justify-between">
                <div className="flex-row gap-8">
                  <FileText className="card-header-icon" />
                  <h3>Extracted Resume Text</h3>
                </div>
                <span className="badge-pill info">{qualityAnalysis?.wordCount || 0} Words</span>
              </div>
              <textarea 
                className="resume-text-area"
                value={resumeText}
                onChange={(e) => {
                  setResumeText(e.target.value);
                  const newEval = evaluateResumeQuality(e.target.value);
                  setQualityAnalysis(newEval);
                }}
                rows={10}
              />
            </div>
          )}
        </div>

        {/* Right Column: Score Breakdown & Analytics */}
        <div className="col-box flex-col gap-16">
          {qualityAnalysis ? (
            <>
              {/* Score Gauges Row */}
              <div className="grid-2-col gap-16">
                {/* Overall Score */}
                <div className="glass-card padding-20 score-gauge-card highlight">
                  <div className="gauge-header">
                    <Award className="gauge-icon" />
                    <span>Overall Resume Score</span>
                  </div>
                  <div className="score-number-display">
                    <span className="huge-score">{qualityAnalysis.overallScore}</span>
                    <span className="score-denom">/100</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill accent-grad"
                      style={{ width: `${qualityAnalysis.overallScore}%` }}
                    />
                  </div>
                </div>

                {/* ATS Score */}
                <div className="glass-card padding-20 score-gauge-card">
                  <div className="gauge-header">
                    <TrendingUp className="gauge-icon" />
                    <span>ATS Compatibility</span>
                  </div>
                  <div className="score-number-display">
                    <span className="huge-score text-primary">{qualityAnalysis.atsScore}</span>
                    <span className="score-denom">%</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill primary-grad"
                      style={{ width: `${qualityAnalysis.atsScore}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="glass-card padding-20">
                <h3 className="card-title">Detailed Score Breakdown</h3>
                <div className="breakdown-grid">
                  <div className="breakdown-item">
                    <div className="breakdown-label">
                      <span>Document Structure</span>
                      <strong>{qualityAnalysis.breakdown.structure}/25</strong>
                    </div>
                    <div className="progress-bar-bg mini">
                      <div className="progress-bar-fill" style={{ width: `${(qualityAnalysis.breakdown.structure/25)*100}%` }} />
                    </div>
                  </div>
                  <div className="breakdown-item">
                    <div className="breakdown-label">
                      <span>Measurable Impact & Metrics</span>
                      <strong>{qualityAnalysis.breakdown.impact}/25</strong>
                    </div>
                    <div className="progress-bar-bg mini">
                      <div className="progress-bar-fill" style={{ width: `${(qualityAnalysis.breakdown.impact/25)*100}%` }} />
                    </div>
                  </div>
                  <div className="breakdown-item">
                    <div className="breakdown-label">
                      <span>Action Verbs Density</span>
                      <strong>{qualityAnalysis.breakdown.verbs}/20</strong>
                    </div>
                    <div className="progress-bar-bg mini">
                      <div className="progress-bar-fill" style={{ width: `${(qualityAnalysis.breakdown.verbs/20)*100}%` }} />
                    </div>
                  </div>
                  <div className="breakdown-item">
                    <div className="breakdown-label">
                      <span>Contact Information</span>
                      <strong>{qualityAnalysis.breakdown.contact}/10</strong>
                    </div>
                    <div className="progress-bar-bg mini">
                      <div className="progress-bar-fill" style={{ width: `${(qualityAnalysis.breakdown.contact/10)*100}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Extracted Metadata */}
              <div className="glass-card padding-20">
                <h3 className="card-title">Extracted Profile Metadata</h3>
                <div className="contact-metadata-row">
                  <div className="meta-chip">
                    <Mail className="meta-icon" />
                    <span>{qualityAnalysis.contact?.email || 'Email Not Detected'}</span>
                  </div>
                  <div className="meta-chip">
                    <Phone className="meta-icon" />
                    <span>{qualityAnalysis.contact?.phone || 'Phone Not Detected'}</span>
                  </div>
                  <div className="meta-chip">
                    <Linkedin className="meta-icon" />
                    <span>{qualityAnalysis.contact?.linkedin || 'LinkedIn Missing'}</span>
                  </div>
                  <div className="meta-chip">
                    <Github className="meta-icon" />
                    <span>{qualityAnalysis.contact?.github || 'GitHub Missing'}</span>
                  </div>
                </div>

                <div className="skills-tag-cloud">
                  <h4>Detected Technical Skills ({(qualityAnalysis.detectedSkills?.length || 0)}):</h4>
                  <div className="tags-wrapper">
                    {(qualityAnalysis.detectedSkills?.length || 0) > 0 ? (
                      (qualityAnalysis.detectedSkills || []).map((skill, i) => (
                        <span key={i} className="skill-tag">{skill}</span>
                      ))
                    ) : (
                      <span className="text-muted">No explicit skills detected yet.</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actionable Improvement Suggestions */}
              {qualityAnalysis.suggestions?.length > 0 && (
                <div className="glass-card padding-20 border-accent">
                  <h3 className="card-title text-accent">Recommended Action Items for 90+ Score</h3>
                  <ul className="suggestions-list">
                    {qualityAnalysis.suggestions.map((sug, i) => (
                      <li key={i} className="suggestion-item">
                        <CheckCircle2 className="sug-icon" />
                        <span>{sug}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="primary-action-btn margin-top-16" onClick={() => setActiveTab('matching')}>
                    <span>Proceed to Role & Skill Gap Analysis</span>
                    <ArrowRight className="btn-arrow" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="glass-card padding-40 text-center flex-col center-content empty-state">
              <FileText className="empty-icon" />
              <h3>No Resume Loaded Yet</h3>
              <p>Upload your resume or click one of the sample buttons on the left to view instant NLP quality scores and skill metrics.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
