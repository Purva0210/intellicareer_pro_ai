import React from 'react';
import { 
  FileText, 
  Target, 
  BookOpen, 
  Briefcase, 
  HelpCircle, 
  Video, 
  Mail, 
  CheckSquare, 
  Sparkles,
  ShieldCheck,
  Cpu,
  Palette,
  Moon
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  targetRoleTitle, 
  overallScore, 
  readinessScore,
  themeMode,
  setThemeMode 
}) {
  const tabs = [
    { id: 'resume', label: 'Resume Analyzer', icon: FileText },
    { id: 'matching', label: 'Role & Skill Gap', icon: Target },
    { id: 'courses', label: 'Courses & Projects', icon: BookOpen },
    { id: 'jobs', label: 'Job Opportunities', icon: Briefcase },
    { id: 'quiz', label: 'Placement Quiz', icon: HelpCircle },
    { id: 'interview', label: 'Mock Interview', icon: Video },
    { id: 'outreach', label: 'Cold Email & Referral', icon: Mail },
    { id: 'tracker', label: 'Job Tracker', icon: CheckSquare },
  ];

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand */}
        <div className="navbar-brand" onClick={() => setActiveTab('resume')}>
          <div className="logo-badge">
            <Cpu className="logo-icon" />
          </div>
          <div className="brand-text">
            <span className="brand-title">IntelliCareer <span className="pro-badge">PRO AI</span></span>
            <span className="brand-subtitle">NLP Career & Placement Engine</span>
          </div>
        </div>

        {/* Global Status Badges & Pastel Theme Toggle */}
        <div className="header-badges">
          {/* Theme Toggle Button */}
          <button 
            className="theme-toggle-btn"
            onClick={() => setThemeMode(themeMode === 'pastel' ? 'dark' : 'pastel')}
            title="Switch between Dreamy Pastel Palette and Midnight Theme"
          >
            {themeMode === 'pastel' ? (
              <>
                <Palette className="chip-icon" />
                <span>Dreamy Pastel 🎨</span>
              </>
            ) : (
              <>
                <Moon className="chip-icon" />
                <span>Midnight Cyber 🌙</span>
              </>
            )}
          </button>

          {targetRoleTitle && (
            <div className="status-chip target-chip">
              <Target className="chip-icon" />
              <span>Target: <strong>{targetRoleTitle}</strong></span>
            </div>
          )}

          {overallScore > 0 && (
            <div className={`status-chip score-chip ${overallScore >= 80 ? 'high' : overallScore >= 60 ? 'mid' : 'low'}`}>
              <ShieldCheck className="chip-icon" />
              <span>Resume Score: <strong>{overallScore}/100</strong></span>
            </div>
          )}

          {readinessScore > 0 && (
            <div className="status-chip readiness-chip">
              <Sparkles className="chip-icon" />
              <span>Readiness: <strong>{readinessScore}%</strong></span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="navbar-nav">
        <div className="nav-tabs-wrapper">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`nav-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon className="tab-icon" />
                <span>{tab.label}</span>
                {isActive && <span className="active-indicator" />}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
