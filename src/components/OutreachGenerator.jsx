import React, { useState } from 'react';
import { Mail, Copy, Check, Sparkles, Send, UserCheck, MessageSquare } from 'lucide-react';
import { JOB_ROLES } from '../data/rolesData';
import { extractSkillsFromText } from '../services/nlpEngine';

export default function OutreachGenerator({ resumeText, selectedTargetRole }) {
  const [outreachType, setOutreachType] = useState('cold_email');
  const [targetCompany, setTargetCompany] = useState('Google');
  const [recipientName, setRecipientName] = useState('Hiring Manager');
  const [copied, setCopied] = useState(false);

  const currentRole = JOB_ROLES[selectedTargetRole] || JOB_ROLES['data_analyst'];
  const userSkills = resumeText ? extractSkillsFromText(resumeText) : ['Python', 'SQL', 'Data Analysis'];

  // Email Templates Generator
  const generateMessage = () => {
    const skillsList = userSkills.slice(0, 4).join(', ');

    if (outreachType === 'cold_email') {
      return `Subject: Application Inquiry: ${currentRole.title} Opportunity - ${recipientName}

Dear ${recipientName},

I hope this email finds you well.

I am writing to express my strong interest in ${currentRole.title} positions at ${targetCompany}. With a background in Computer Science and hands-on technical proficiency in ${skillsList}, I have built scalable projects focusing on system optimization and data analytics.

I have attached my resume for your review and would welcome the opportunity to discuss how my technical skills can contribute to the engineering team at ${targetCompany}.

Thank you for your time and consideration.

Best regards,
Candidate`;
    } else if (outreachType === 'referral') {
      return `Hi ${recipientName},

Hope you are doing great! 

I noticed your work at ${targetCompany} and admire the technical innovations your team is driving. I am currently applying for the ${currentRole.title} position at ${targetCompany}. Given my experience in ${skillsList}, I believe I would be a great fit for the role.

If you are open to it, I would be extremely grateful for a referral or any quick advice regarding the hiring process.

Thank you so much for your time!

Best,
Candidate`;
    } else {
      return `Subject: Follow-up on ${currentRole.title} Application - ${targetCompany}

Dear ${recipientName},

I hope you are having a great week.

I am following up on my application submitted for the ${currentRole.title} role at ${targetCompany}. I remain very enthusiastic about the opportunity to join your team and leverage my skills in ${skillsList}.

Please let me know if any additional information or documentation is needed on my end.

Best regards,
Candidate`;
    }
  };

  const generatedText = generateMessage();

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="tab-container animate-fade-in">
      {/* Header Banner */}
      <div className="section-banner glass-card">
        <div className="banner-content">
          <div className="banner-title-group">
            <Mail className="banner-icon" />
            <h2>Recruiter Cold Email & Referral Assistant</h2>
          </div>
          <p className="banner-subtitle">
            Generate tailored cold emails, LinkedIn connection requests, and polite follow-up messages automatically customized with your extracted technical skills.
          </p>
        </div>
      </div>

      <div className="grid-2-col gap-16">
        {/* Left Column: Form Controls */}
        <div className="col-box flex-col gap-16">
          <div className="glass-card padding-20">
            <h3 className="card-title">Outreach Parameters</h3>
            
            <div className="margin-top-12">
              <label className="input-label">Message Purpose:</label>
              <div className="role-buttons-flex">
                <button 
                  className={`role-tab-btn ${outreachType === 'cold_email' ? 'active' : ''}`}
                  onClick={() => setOutreachType('cold_email')}
                >
                  📧 Recruiter Cold Email
                </button>
                <button 
                  className={`role-tab-btn ${outreachType === 'referral' ? 'active' : ''}`}
                  onClick={() => setOutreachType('referral')}
                >
                  🤝 LinkedIn Referral Request
                </button>
                <button 
                  className={`role-tab-btn ${outreachType === 'followup' ? 'active' : ''}`}
                  onClick={() => setOutreachType('followup')}
                >
                  📩 Application Follow-Up
                </button>
              </div>
            </div>

            <div className="margin-top-16">
              <label className="input-label">Target Company Name:</label>
              <input 
                type="text" 
                className="text-input width-full"
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
              />
            </div>

            <div className="margin-top-16">
              <label className="input-label">Recipient Name / Title:</label>
              <input 
                type="text" 
                className="text-input width-full"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Generated Message Preview */}
        <div className="col-box flex-col gap-16">
          <div className="glass-card padding-20 border-accent">
            <div className="card-header-row justify-between">
              <div className="flex-row gap-8 align-center">
                <Sparkles className="card-header-icon text-accent" />
                <h3>Generated Personalized Message</h3>
              </div>
              <button className="secondary-btn btn-sm" onClick={handleCopy}>
                {copied ? <Check className="btn-icon text-success" /> : <Copy className="btn-icon" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
              </button>
            </div>

            <textarea 
              className="resume-text-area margin-top-16"
              value={generatedText}
              readOnly
              rows={14}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
