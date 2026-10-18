import React, { useState } from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  Award, 
  Clock, 
  Sparkles, 
  FolderGit2, 
  Star,
  CheckCircle2
} from 'lucide-react';
import { VERIFIED_COURSES, RECOMMENDED_PROJECTS } from '../data/courseData';
import { JOB_ROLES } from '../data/rolesData';
import { extractSkillsFromText } from '../services/nlpEngine';

export default function CourseRecommendations({ resumeText, selectedTargetRole }) {
  const [selectedFilterSkill, setSelectedFilterSkill] = useState('All');
  
  const currentRole = JOB_ROLES[selectedTargetRole] || JOB_ROLES['data_analyst'];
  const userSkills = resumeText ? extractSkillsFromText(resumeText) : [];
  
  // Find missing skills for target role
  const missingSkills = currentRole.primarySkills.filter(
    s => !userSkills.includes(s.toLowerCase())
  );

  // Filter courses based on user's target role skills and selected skill filter
  const relevantCourses = VERIFIED_COURSES.filter(course => {
    if (selectedFilterSkill !== 'All') {
      return course.skill.toLowerCase() === selectedFilterSkill.toLowerCase();
    }
    // Prioritize courses matching candidate's missing skills or target role primary skills
    return currentRole.primarySkills.some(ps => ps.toLowerCase() === course.skill.toLowerCase());
  });

  const relevantProjects = RECOMMENDED_PROJECTS.filter(
    p => p.roleId === selectedTargetRole
  );

  return (
    <div className="tab-container animate-fade-in">
      {/* Header Banner */}
      <div className="section-banner glass-card">
        <div className="banner-content">
          <div className="banner-title-group">
            <BookOpen className="banner-icon" />
            <h2>Course & Hands-On Project Recommendations</h2>
          </div>
          <p className="banner-subtitle">
            Courses link to official pages of providers (Coursera, edX, Kaggle, freeCodeCamp, MDN, Microsoft Learn, PyTorch, Cisco). Tailored to bridge your detected skill gaps.
          </p>
        </div>
      </div>

      {/* Skill Gap Alert Banner */}
      {missingSkills.length > 0 && (
        <div className="alert-card gap-alert glass-card padding-16 margin-bottom-20 border-accent">
          <Sparkles className="alert-icon text-accent" />
          <div>
            <strong>Recommended Priority Learning Path for {currentRole.title}:</strong>
            <span className="gap-skills-inline">
              You are missing: {missingSkills.map((s, i) => (
                <span key={i} className="skill-tag danger inline-tag">{s}</span>
              ))}
            </span>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="filter-bar glass-card padding-12 margin-bottom-20">
        <span className="filter-label">Filter by Skill <small className="filter-legend"><span className="filter-dot have"></span>You have it <span className="filter-dot gap"></span>Skill gap</small></span>
        <div className="filter-buttons-scroll">
          <button 
            className={`filter-btn ${selectedFilterSkill === 'All' ? 'active' : ''}`}
            onClick={() => setSelectedFilterSkill('All')}
          >
            All Role Courses ({relevantCourses.length})
          </button>
          {currentRole.primarySkills.map(skill => (
            <button 
              key={skill}
              className={`filter-btn ${selectedFilterSkill === skill ? 'active' : ''}`}
              onClick={() => setSelectedFilterSkill(skill)}
            >
              <span className={`filter-dot ${missingSkills.includes(skill) ? 'gap' : 'have'}`}></span>
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="section-heading-row margin-bottom-12">
        <Award className="heading-icon text-accent" />
        <h3>Accredited Educational Courses & Tutorials ({relevantCourses.length})</h3>
      </div>

      <div className="grid-3-col gap-16 margin-bottom-32">
        {relevantCourses.map((course) => {
          const isMissing = missingSkills.includes(course.skill);
          return (
            <div key={course.id} className={`glass-card padding-20 course-card ${isMissing ? 'priority-card' : ''}`}>
              <div className="course-card-top">
                <span className={`badge-pill ${isMissing ? 'danger' : 'success'}`}>
                  {isMissing ? '⚠️ Priority Skill Gap' : '✓ Skills Match'}
                </span>
                <span className="course-provider-tag">{course.provider}</span>
              </div>

              <h4 className="course-title">{course.title}</h4>
              <p className="course-desc">{course.description}</p>

              <div className="course-meta-row">
                <span className="meta-item"><Clock className="mini-icon" /> {course.duration}</span>
                <span className="meta-item"><Award className="mini-icon" /> {course.level}</span>
                <span className="meta-item text-accent"><Star className="mini-icon" /> {course.rating} / 5.0</span>
              </div>

              <div className="course-card-bottom margin-top-16">
                <span className="cost-tag">{course.cost}</span>
                <a 
                  href={course.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="open-course-btn"
                >
                  <span>Go to Official Course</span>
                  <ExternalLink className="btn-icon" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommended Hands-on Projects */}
      {relevantProjects.length > 0 && (
        <>
          <div className="section-heading-row margin-bottom-12">
            <FolderGit2 className="heading-icon text-primary" />
            <h3>Recommended Portfolio Projects for {currentRole.title}</h3>
          </div>

          <div className="grid-2-col gap-16">
            {relevantProjects.map((project) => (
              <div key={project.id} className="glass-card padding-24 project-card border-primary">
                <div className="project-header">
                  <h4 className="project-title">{project.title}</h4>
                  <span className="badge-pill info">{project.difficulty}</span>
                </div>

                <p className="project-obj"><strong>Objective:</strong> {project.objective}</p>

                <div className="tech-stack-row margin-top-12">
                  <span className="stack-label">Technologies:</span>
                  <div className="tags-wrapper">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="skill-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="project-steps margin-top-12">
                  <span className="steps-label">Implementation Blueprint:</span>
                  <ol className="steps-list">
                    {project.steps.map((step, idx) => (
                      <li key={idx}>
                        <CheckCircle2 className="step-check-icon" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="margin-top-16 align-right">
                  <a 
                    href={project.githubTemplateUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="secondary-btn"
                  >
                    <span>Explore GitHub Topic & Templates</span>
                    <ExternalLink className="btn-icon" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
