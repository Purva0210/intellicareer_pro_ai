import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import RoleMatching from './components/RoleMatching';
import CourseRecommendations from './components/CourseRecommendations';
import JobBoard from './components/JobBoard';
import PlacementQuiz from './components/PlacementQuiz';
import MockInterview from './components/MockInterview';
import OutreachGenerator from './components/OutreachGenerator';
import ApplicationTracker from './components/ApplicationTracker';
import { JOB_ROLES } from './data/rolesData';
import { SAMPLE_RESUMES } from './data/sampleResumes';
import { evaluateResumeQuality } from './services/nlpEngine';

export default function App() {
  const [activeTab, setActiveTab] = useState('resume');
  const [themeMode, setThemeMode] = useState('pastel'); // 'pastel' by default
  const [resumeText, setResumeText] = useState(SAMPLE_RESUMES.data_analyst.rawText);
  const [qualityAnalysis, setQualityAnalysis] = useState(() => evaluateResumeQuality(SAMPLE_RESUMES.data_analyst.rawText));
  const [selectedTargetRole, setSelectedTargetRole] = useState('data_analyst');
  const [activeApplications, setActiveApplications] = useState([]);

  // Sync body theme class
  useEffect(() => {
    if (themeMode === 'dark') {
      document.body.classList.add('theme-dark');
    } else {
      document.body.classList.remove('theme-dark');
    }
  }, [themeMode]);

  const currentRole = JOB_ROLES[selectedTargetRole] || JOB_ROLES['data_analyst'];

  // Calculate overall Career Readiness Score (0-100)
  const resumeScore = qualityAnalysis?.overallScore || 0;
  const atsScore = qualityAnalysis?.atsScore || 0;
  const readinessScore = Math.round((resumeScore * 0.5) + (atsScore * 0.4) + (activeApplications.length > 0 ? 10 : 0));

  return (
    <div className="app-shell">
      {/* Header Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        targetRoleTitle={currentRole?.title}
        overallScore={resumeScore}
        readinessScore={readinessScore}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
      />

      {/* Main Content Area */}
      <main className="main-content-viewport">
        {activeTab === 'resume' && (
          <ResumeAnalyzer 
            resumeText={resumeText}
            setResumeText={setResumeText}
            qualityAnalysis={qualityAnalysis}
            setQualityAnalysis={setQualityAnalysis}
            selectedTargetRole={selectedTargetRole}
            setSelectedTargetRole={setSelectedTargetRole}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'matching' && (
          <RoleMatching 
            resumeText={resumeText}
            selectedTargetRole={selectedTargetRole}
            setSelectedTargetRole={setSelectedTargetRole}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'courses' && (
          <CourseRecommendations 
            resumeText={resumeText}
            selectedTargetRole={selectedTargetRole}
          />
        )}

        {activeTab === 'jobs' && (
          <JobBoard 
            resumeText={resumeText}
            selectedTargetRole={selectedTargetRole}
            setSelectedTargetRole={setSelectedTargetRole}
            activeApplications={activeApplications}
            setActiveApplications={setActiveApplications}
          />
        )}

        {activeTab === 'quiz' && (
          <PlacementQuiz 
            selectedTargetRole={selectedTargetRole}
          />
        )}

        {activeTab === 'interview' && (
          <MockInterview 
            resumeText={resumeText}
            selectedTargetRole={selectedTargetRole}
          />
        )}

        {activeTab === 'outreach' && (
          <OutreachGenerator 
            resumeText={resumeText}
            selectedTargetRole={selectedTargetRole}
          />
        )}

        {activeTab === 'tracker' && (
          <ApplicationTracker 
            activeApplications={activeApplications}
            setActiveApplications={setActiveApplications}
            qualityAnalysis={qualityAnalysis}
            readinessScore={readinessScore}
            selectedTargetRole={selectedTargetRole}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-container">
          <p>© 2026 IntelliCareer Pro AI — NLP Resume Analyzer, Semantic Job Matcher & Placement Assistant.</p>
          <div className="footer-links">
          </div>
        </div>
      </footer>
    </div>
  );
}
