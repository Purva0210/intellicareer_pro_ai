import React from 'react';
import { CheckSquare, Sparkles, TrendingUp, Briefcase, Plus, Trash2 } from 'lucide-react';
import { JOB_ROLES } from '../data/rolesData';

export default function ApplicationTracker({ 
  activeApplications, 
  setActiveApplications, 
  qualityAnalysis, 
  readinessScore,
  selectedTargetRole 
}) {
  const currentRole = JOB_ROLES[selectedTargetRole] || JOB_ROLES['data_analyst'];

  const handleStatusChange = (id, newStatus) => {
    setActiveApplications(activeApplications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  const handleDeleteApp = (id) => {
    setActiveApplications(activeApplications.filter(app => app.id !== id));
  };

  return (
    <div className="tab-container animate-fade-in">
      {/* Header Banner */}
      <div className="section-banner glass-card">
        <div className="banner-content">
          <div className="banner-title-group">
            <CheckSquare className="banner-icon" />
            <h2>Job Application & Career Readiness Tracker</h2>
          </div>
          <p className="banner-subtitle">
            Manage your end-to-end job application lifecycle from initial saved leads to interviews and offer acceptance.
          </p>
        </div>
      </div>

      {/* Overall Career Readiness Score Card */}
      <div className="glass-card padding-24 margin-bottom-20 highlight border-accent">
        <div className="gauge-header justify-between">
          <div className="flex-row gap-8 align-center">
            <Sparkles className="gauge-icon text-accent" />
            <h3 className="text-accent">Overall Placement Readiness Index</h3>
          </div>
          <span className="badge-pill accent">Target: {currentRole.title}</span>
        </div>

        <div className="match-big-row margin-top-16">
          <div className="match-percentage-display">
            <span className="percentage-number">{readinessScore}%</span>
            <span className="percentage-label">Readiness Score</span>
          </div>
          <div className="match-verdict-box">
            <span className="verdict-title">
              {readinessScore >= 80 ? '🚀 High Job Readiness - Start Applying!' : '📈 Moderate Readiness - Continue Quizzes & Interviews'}
            </span>
            <p className="verdict-desc">
              Your overall readiness is evaluated across Resume Quality ({qualityAnalysis?.overallScore || 0}/100), Skill Coverage, Assessment Scores, and Interview Practice.
            </p>
          </div>
        </div>
      </div>

      {/* Active Applications Table */}
      <div className="glass-card padding-20">
        <div className="card-header-row justify-between">
          <div className="flex-row gap-8 align-center">
            <Briefcase className="card-header-icon" />
            <h3>Tracked Applications ({activeApplications.length})</h3>
          </div>
        </div>

        {activeApplications.length > 0 ? (
          <div className="table-responsive margin-top-16">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Job Title & Company</th>
                  <th>Date Tracked</th>
                  <th>Profile Match</th>
                  <th>Current Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {activeApplications.map((app) => (
                  <tr key={app.id}>
                    <td>
                      <div className="font-bold">{app.title}</div>
                      <div className="text-muted text-sm">{app.company} • {app.location}</div>
                    </td>
                    <td>{app.dateApplied || 'Today'}</td>
                    <td>
                      <span className="badge-pill success">{app.matchScore}% Match</span>
                    </td>
                    <td>
                      <select 
                        className="select-input select-sm"
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      >
                        <option value="Saved">Saved Lead</option>
                        <option value="Applied">Applied</option>
                        <option value="Assessment Pending">Assessment Pending</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                        <option value="Offer Received">Offer Received 🎉</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td>
                      <button className="icon-control-btn danger" onClick={() => handleDeleteApp(app.id)}>
                        <Trash2 className="mini-icon" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state padding-30 text-center">
            <p className="text-muted">No applications tracked yet. Click "Add to Job Tracker" in the Job Opportunities tab to start tracking!</p>
          </div>
        )}
      </div>
    </div>
  );
}
