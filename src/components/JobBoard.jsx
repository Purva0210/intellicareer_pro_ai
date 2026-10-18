import React, { useState } from 'react';
import { 
  Briefcase, 
  ExternalLink, 
  MapPin, 
  DollarSign, 
  Clock, 
  Sparkles, 
  Search, 
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { RECOMMENDED_JOBS, buildJobSearchUrl } from '../data/jobData';
import { JOB_ROLES } from '../data/rolesData';
import { extractSkillsFromText } from '../services/nlpEngine';

export default function JobBoard({ 
  resumeText,
  selectedTargetRole, 
  setSelectedTargetRole, 
  activeApplications, 
  setActiveApplications 
}) {
  const [searchLocation, setSearchLocation] = useState('India');
  const [targetJobMode, setTargetJobMode] = useState(null);

  const currentRole = JOB_ROLES[selectedTargetRole] || JOB_ROLES['data_analyst'];
  
  // Skill-overlap match between the resume and each job's required skills (calculated, not hard-coded)
  const userSkills = (resumeText ? extractSkillsFromText(resumeText) : []).map(x => x.toLowerCase());
  const scoreJob = (job) => {
    const matched = job.skillsRequired.filter(sk => userSkills.includes(sk.toLowerCase()));
    return {
      ...job,
      matchedSkills: matched,
      matchScore: Math.round((matched.length / job.skillsRequired.length) * 100)
    };
  };

  // Always show at least 5 jobs: target-role jobs first, then closest matches from other roles
  const scoredAll = RECOMMENDED_JOBS.map(scoreJob);
  const roleJobs = scoredAll.filter(j => j.roleId === selectedTargetRole).sort((a, b) => b.matchScore - a.matchScore);
  const otherJobs = scoredAll.filter(j => j.roleId !== selectedTargetRole).sort((a, b) => b.matchScore - a.matchScore);
  const displayJobs = roleJobs.length >= 5 ? roleJobs : [...roleJobs, ...otherJobs.slice(0, 5 - roleJobs.length)];

  const handleSaveJob = (job) => {
    if (activeApplications.some(app => app.id === job.id)) return;
    const newApp = {
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      status: 'Applied',
      dateApplied: new Date().toLocaleDateString(),
      matchScore: job.matchScore
    };
    setActiveApplications([...activeApplications, newApp]);
  };

  return (
    <div className="tab-container animate-fade-in">
      {/* Header Banner */}
      <div className="section-banner glass-card">
        <div className="banner-content">
          <div className="banner-title-group">
            <Briefcase className="banner-icon" />
            <h2>Personalized Job & Internship Opportunities</h2>
          </div>
          <p className="banner-subtitle">
            Explore sample openings ranked by how many required skills your resume already covers. Use the portal buttons to search live openings on LinkedIn, Internshala, Naukri and Indeed.
          </p>
        </div>
      </div>

      {/* Role Filter & Live Search Bar */}
      <div className="glass-card padding-16 margin-bottom-20 flex-row justify-between align-center wrap-flex gap-16">
        <div className="flex-row gap-8 align-center">
          <span className="filter-label">Filter Role:</span>
          <select 
            className="select-input"
            value={selectedTargetRole}
            onChange={(e) => setSelectedTargetRole(e.target.value)}
          >
            {Object.values(JOB_ROLES).map(r => (
              <option key={r.id} value={r.id}>{r.title}</option>
            ))}
          </select>
        </div>

        <div className="flex-row gap-8 align-center">
          <MapPin className="mini-icon text-muted" />
          <input 
            type="text"
            className="text-input"
            placeholder="Location (e.g. India, Remote, Bangalore)"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
        </div>
      </div>

      {/* Target Job Mode Active Banner */}
      {targetJobMode && (
        <div className="alert-card target-mode-alert glass-card padding-20 margin-bottom-20 border-accent">
          <div className="flex-row justify-between align-center">
            <div className="flex-row gap-12 align-center">
              <Sparkles className="alert-icon text-accent" />
              <div>
                <h4 className="text-accent">JOB TARGET MODE ACTIVE</h4>
                <p>Currently focusing complete placement pipeline on: <strong>{targetJobMode.title} at {targetJobMode.company}</strong></p>
              </div>
            </div>
            <button className="secondary-btn btn-sm" onClick={() => setTargetJobMode(null)}>
              Exit Target Mode
            </button>
          </div>
        </div>
      )}

      {/* Job Cards List */}
      <div className="section-heading-row margin-bottom-12">
        <Search className="heading-icon text-accent" />
        <h3>Recommended Opportunities for {currentRole.title}</h3>
      </div>

      <div className="flex-col gap-16 margin-bottom-32">
        {displayJobs.map((job) => {
          const isSaved = activeApplications.some(app => app.id === job.id);
          return (
            <div key={job.id} className="glass-card padding-24 job-card border-left-accent">
              <div className="job-card-header">
                <div>
                  <h3 className="job-title-text">{job.title}</h3>
                  <span className="job-company-text">{job.company}</span>
                </div>
                <div className="match-badge-pill">
                  <span className="match-num">{job.matchScore}%</span>
                  <span className="match-lbl">Skill Match</span>
                </div>
              </div>

              <div className="job-details-row margin-top-12">
                <span className="detail-item"><MapPin className="mini-icon" /> {job.location}</span>
                <span className="detail-item"><DollarSign className="mini-icon" /> {job.salaryRange}</span>
                <span className="detail-item"><Clock className="mini-icon" /> Experience: {job.experience}</span>
                <span className="detail-item badge-pill info">{job.type}</span>
              </div>

              <div className="job-match-skills">
                {job.matchedSkills.length > 0
                  ? `You already have ${job.matchedSkills.length} of ${job.skillsRequired.length} required skills: ${job.matchedSkills.join(', ')}`
                  : 'None of the required skills were detected in your resume yet.'}
              </div>

              <div className="skills-tag-cloud margin-top-12">
                <span className="stack-label">Required Skills:</span>
                <div className="tags-wrapper">
                  {job.skillsRequired.map((s, i) => (
                    <span key={i} className="skill-tag">{s}</span>
                  ))}
                </div>
              </div>

              {/* Application Portal Deep-Links */}
              <div className="portal-links-wrapper margin-top-16">
                <span className="portal-label">Search & Apply on Job Portals:</span>
                <div className="portal-buttons-grid">
                  <a 
                    href={buildJobSearchUrl('linkedin', job.title, searchLocation)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portal-btn linkedin"
                  >
                    LinkedIn Jobs
                    <ExternalLink className="mini-icon" />
                  </a>
                  <a 
                    href={buildJobSearchUrl('internshala', job.title, searchLocation)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portal-btn internshala"
                  >
                    Internshala
                    <ExternalLink className="mini-icon" />
                  </a>
                  <a 
                    href={buildJobSearchUrl('naukri', job.title, searchLocation)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portal-btn naukri"
                  >
                    Naukri.com
                    <ExternalLink className="mini-icon" />
                  </a>
                  <a 
                    href={buildJobSearchUrl('indeed', job.title, searchLocation)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portal-btn indeed"
                  >
                    Indeed
                    <ExternalLink className="mini-icon" />
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="job-card-actions margin-top-16">
                <button 
                  className={`secondary-btn ${isSaved ? 'saved' : ''}`}
                  onClick={() => handleSaveJob(job)}
                  disabled={isSaved}
                >
                  <Bookmark className="btn-icon" />
                  <span>{isSaved ? 'Added to Job Tracker' : 'Add to Job Tracker'}</span>
                </button>

                <button 
                  className="primary-action-btn btn-sm"
                  onClick={() => setTargetJobMode(job)}
                >
                  <Sparkles className="btn-icon" />
                  <span>Prepare Me For This Job</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
