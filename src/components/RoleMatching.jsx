import React, { useState } from 'react';
import { 
  Target, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Cpu, 
  Briefcase,
  Layers
} from 'lucide-react';
import { analyzeRoleMatch, classifyTopRoles } from '../services/nlpEngine';
import { JOB_ROLES } from '../data/rolesData';

export default function RoleMatching({ 
  resumeText, 
  selectedTargetRole, 
  setSelectedTargetRole, 
  setActiveTab 
}) {
  const [customJdText, setCustomJdText] = useState('');
  const [useCustomJd, setUseCustomJd] = useState(false);

  const currentRole = JOB_ROLES[selectedTargetRole] || JOB_ROLES['data_analyst'];
  const matchResult = resumeText ? analyzeRoleMatch(resumeText, selectedTargetRole, useCustomJd ? customJdText : null) : null;
  const roleClassifications = resumeText ? classifyTopRoles(resumeText) : null;

  return (
    <div className="tab-container animate-fade-in">
      {/* Header Banner */}
      <div className="section-banner glass-card">
        <div className="banner-content">
          <div className="banner-title-group">
            <Target className="banner-icon" />
            <h2>Semantic Role & Skill Gap Analyzer</h2>
          </div>
          <p className="banner-subtitle">
            Uses high-accuracy TF-IDF N-gram vector embedding and Cosine Similarity to evaluate your resume against your target role or custom Job Description.
          </p>
        </div>
        <div className="target-badge-header">
          <span className="label">Target Role:</span>
          <span className="value">{currentRole.title}</span>
        </div>
      </div>

      <div className="grid-2-col">
        {/* Left Column: Target Role Setup & Custom JD */}
        <div className="col-box flex-col gap-16">
          {/* Target Role Selector */}
          <div className="glass-card padding-20">
            <h3 className="card-title">Select Target Role to Match Against</h3>
            <div className="role-buttons-flex">
              {Object.values(JOB_ROLES).map((role) => (
                <button
                  key={role.id}
                  className={`role-tab-btn ${selectedTargetRole === role.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedTargetRole(role.id);
                    setUseCustomJd(false);
                  }}
                >
                  {role.title}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Job Description Input */}
          <div className="glass-card padding-20">
            <div className="card-header-row justify-between">
              <div className="flex-row gap-8">
                <Briefcase className="card-header-icon" />
                <h3>Custom Job Description (Paste from LinkedIn/Naukri)</h3>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={useCustomJd} 
                  onChange={(e) => setUseCustomJd(e.target.checked)} 
                />
                <span className="slider round"></span>
                <span className="toggle-label">{useCustomJd ? 'Custom JD Active' : 'Standard Role Requirements'}</span>
              </label>
            </div>
            
            {useCustomJd ? (
              <textarea 
                className="resume-text-area margin-top-12"
                placeholder="Paste job description requirements here..."
                value={customJdText}
                onChange={(e) => setCustomJdText(e.target.value)}
                rows={6}
              />
            ) : (
              <div className="sample-jd-box margin-top-12">
                <span className="jd-label">Standard Industry Job Description:</span>
                <p className="jd-text">{currentRole.sampleJobDescription}</p>
              </div>
            )}
          </div>

          {/* Role Suitability Matrix across all profiles */}
          {roleClassifications && (
            <div className="glass-card padding-20">
              <div className="card-header-row">
                <Layers className="card-header-icon" />
                <h3>Profile Suitability Across All Roles</h3>
              </div>
              <div className="role-matrix-list margin-top-12">
                {roleClassifications.allRolesRanking.map((item) => (
                  <div 
                    key={item.roleId} 
                    className={`matrix-item ${selectedTargetRole === item.roleId ? 'current' : ''}`}
                    onClick={() => setSelectedTargetRole(item.roleId)}
                  >
                    <div className="matrix-info">
                      <span className="matrix-title">{item.roleTitle}</span>
                      <span className="matrix-sub">{item.matchedCount} Skills Matched</span>
                    </div>
                    <div className="matrix-score-pill">
                      <span className="score-val">{item.fitPercentage}% Fit</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Match Results & Skill Gap Breakdown */}
        <div className="col-box flex-col gap-16">
          {matchResult ? (
            <>
              {/* Match Score Gauge */}
              <div className="glass-card padding-24 match-score-card highlight">
                <div className="gauge-header justify-between">
                  <div className="flex-row gap-8">
                    <Cpu className="gauge-icon" />
                    <span>Semantic Role Fit Match</span>
                  </div>
                  <span className="badge-pill accent">Vector Cosine Similarity: {matchResult.semanticSimilarity}%</span>
                </div>

                <div className="match-big-row">
                  <div className="match-percentage-display">
                    <span className="percentage-number">{matchResult.roleFitPercentage}%</span>
                    <span className="percentage-label">Match Alignment</span>
                  </div>
                  <div className="match-verdict-box">
                    <span className="verdict-title">
                      {matchResult.roleFitPercentage >= 80 ? '🎯 Strong Match - Ready to Apply!' :
                       matchResult.roleFitPercentage >= 60 ? '⚡ Moderate Fit - Skill Gaps Detected' :
                       '⚠️ Low Fit - Course Upgrade Recommended'}
                    </span>
                    <p className="verdict-desc">
                      Your profile matches {matchResult.matchedPrimary.length} of {currentRole.primarySkills.length} primary required skills for {currentRole.title}.
                    </p>
                  </div>
                </div>

                <div className="progress-bar-bg margin-top-16">
                  <div 
                    className="progress-bar-fill accent-grad"
                    style={{ width: `${matchResult.roleFitPercentage}%` }}
                  />
                </div>
              </div>

              {/* Skill Gap Cards */}
              <div className="grid-2-col gap-16">
                {/* Matched Skills */}
                <div className="glass-card padding-20 border-success">
                  <div className="card-header-row text-success">
                    <CheckCircle2 className="card-header-icon" />
                    <h3>Matched Skills ({matchResult.matchedPrimary.length + matchResult.matchedSecondary.length})</h3>
                  </div>
                  <div className="tags-wrapper margin-top-12">
                    {matchResult.matchedPrimary.concat(matchResult.matchedSecondary).map((skill, i) => (
                      <span key={i} className="skill-tag success">{skill}</span>
                    ))}
                    {matchResult.matchedPrimary.length === 0 && matchResult.matchedSecondary.length === 0 && (
                      <span className="text-muted">No matching technical skills found yet.</span>
                    )}
                  </div>
                </div>

                {/* Missing Priority Skill Gaps */}
                <div className="glass-card padding-20 border-danger">
                  <div className="card-header-row text-danger">
                    <XCircle className="card-header-icon" />
                    <h3>Priority Missing Skills ({matchResult.missingPrimary.length})</h3>
                  </div>
                  <div className="tags-wrapper margin-top-12">
                    {matchResult.missingPrimary.map((skill, i) => (
                      <span key={i} className="skill-tag danger">{skill}</span>
                    ))}
                    {matchResult.missingPrimary.length === 0 && (
                      <span className="text-success font-medium">All primary required skills satisfied! 🎉</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actionable Learning Path Recommendation */}
              <div className="glass-card padding-24 border-primary">
                <div className="card-header-row">
                  <BookOpen className="card-header-icon text-primary" />
                  <h3>Bridge Your Skill Gap with Genuine Courses</h3>
                </div>
                <p className="card-desc">
                  We have mapped your missing skills ({matchResult.missingPrimary.join(', ') || 'Advanced topics'}) to verified learning platforms like Coursera, edX, Kaggle, freeCodeCamp, MDN, and Microsoft Learn.
                </p>
                
                <button 
                  className="primary-action-btn margin-top-16"
                  onClick={() => setActiveTab('courses')}
                >
                  <Sparkles className="btn-icon" />
                  <span>View Recommended Courses</span>
                  <ArrowRight className="btn-arrow" />
                </button>
              </div>
            </>
          ) : (
            <div className="glass-card padding-40 text-center flex-col center-content empty-state">
              <Target className="empty-icon" />
              <h3>No Resume Loaded</h3>
              <p>Please upload or select a resume in the Resume Analyzer tab first to calculate semantic role fit.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
