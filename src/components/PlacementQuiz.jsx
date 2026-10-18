import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft, 
  Award, 
  RotateCcw,
  Bookmark
} from 'lucide-react';
import { QUIZ_SECTIONS, QUESTION_BANK } from '../data/quizData';
import { JOB_ROLES } from '../data/rolesData';

export default function PlacementQuiz({ selectedTargetRole }) {
  const [activeSection, setActiveSection] = useState('aptitude');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(900); // 15 mins

  const currentRole = JOB_ROLES[selectedTargetRole] || JOB_ROLES['data_analyst'];

  // Select technical question key based on target role
  const techKey = `technical_${selectedTargetRole}` in QUESTION_BANK 
    ? `technical_${selectedTargetRole}` 
    : 'technical_data_analyst';

  // Questions for current section
  const sectionQuestions = activeSection === 'technical' 
    ? (QUESTION_BANK[techKey] || QUESTION_BANK['technical_data_analyst'])
    : (QUESTION_BANK[activeSection] || []);

  const currentQ = sectionQuestions[currentQuestionIdx] || sectionQuestions[0];

  // Timer countdown
  useEffect(() => {
    if (isSubmitted || timeLeftSeconds <= 0) return;
    const timer = setInterval(() => {
      setTimeLeftSeconds(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted, timeLeftSeconds]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optIndex) => {
    if (isSubmitted) return;
    const qKey = `${activeSection}_${currentQ.id}`;
    setUserAnswers({ ...userAnswers, [qKey]: optIndex });
  };

  const toggleMarkForReview = () => {
    const qKey = `${activeSection}_${currentQ.id}`;
    setMarkedForReview({ ...markedForReview, [qKey]: !markedForReview[qKey] });
  };

  // Calculate score
  const calculateFinalScore = () => {
    let correct = 0;
    let total = 0;

    QUIZ_SECTIONS.forEach(sec => {
      const qList = sec.id === 'technical' ? (QUESTION_BANK[techKey] || []) : (QUESTION_BANK[sec.id] || []);
      qList.forEach(q => {
        total++;
        const qKey = `${sec.id}_${q.id}`;
        if (userAnswers[qKey] === q.correctIndex) {
          correct++;
        }
      });
    });

    return { correct, total, percentage: total > 0 ? Math.round((correct / total) * 100) : 0 };
  };

  const scoreData = isSubmitted ? calculateFinalScore() : null;

  const restartQuiz = () => {
    setUserAnswers({});
    setMarkedForReview({});
    setIsSubmitted(false);
    setTimeLeftSeconds(900);
    setCurrentQuestionIdx(0);
  };

  return (
    <div className="tab-container animate-fade-in">
      {/* Header Banner */}
      <div className="section-banner glass-card">
        <div className="banner-content">
          <div className="banner-title-group">
            <HelpCircle className="banner-icon" />
            <h2>Adaptive Placement & Aptitude Quiz Engine</h2>
          </div>
          <p className="banner-subtitle">
            Simulates actual placement assessment test platforms (TCS NQT, Accenture, Infosys, Tech Tests) with timed navigation, question palettes, and topic-wise proficiency analysis.
          </p>
        </div>
        <div className="timer-badge-header">
          <Clock className="timer-icon" />
          <span className="timer-text">{formatTime(timeLeftSeconds)}</span>
        </div>
      </div>

      {!isSubmitted ? (
        <div className="grid-3-col gap-16">
          {/* Main Question Panel (2 columns wide) */}
          <div className="col-span-2 glass-card padding-24 flex-col justify-between min-h-450">
            <div>
              {/* Section Tabs */}
              <div className="section-nav-tabs margin-bottom-20">
                {QUIZ_SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    className={`sec-tab-btn ${activeSection === sec.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveSection(sec.id);
                      setCurrentQuestionIdx(0);
                    }}
                  >
                    <span>{sec.name}</span>
                  </button>
                ))}
              </div>

              {/* Question Header */}
              {currentQ ? (
                <>
                  <div className="question-header-row justify-between align-center">
                    <span className="question-num-tag">
                      Question {currentQuestionIdx + 1} of {sectionQuestions.length}
                    </span>
                    <button 
                      className={`flag-btn ${markedForReview[`${activeSection}_${currentQ.id}`] ? 'flagged' : ''}`}
                      onClick={toggleMarkForReview}
                    >
                      <Bookmark className="mini-icon" />
                      <span>{markedForReview[`${activeSection}_${currentQ.id}`] ? 'Marked for Review' : 'Mark for Review'}</span>
                    </button>
                  </div>

                  <h3 className="question-text-prompt margin-top-12">{currentQ.question}</h3>

                  {/* Options List */}
                  <div className="options-list-grid margin-top-20">
                    {currentQ.options.map((optText, optIdx) => {
                      const qKey = `${activeSection}_${currentQ.id}`;
                      const isSelected = userAnswers[qKey] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          className={`option-card-btn ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleSelectOption(optIdx)}
                        >
                          <span className="opt-letter">{String.fromCharCode(65 + optIdx)}</span>
                          <span className="opt-text">{optText}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <p className="text-muted">No questions available in this section.</p>
              )}
            </div>

            {/* Question Navigation Controls */}
            <div className="quiz-controls-row margin-top-24 justify-between align-center">
              <button
                className="secondary-btn"
                disabled={currentQuestionIdx === 0}
                onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
              >
                <ChevronLeft className="btn-icon" />
                <span>Previous</span>
              </button>

              <button
                className="primary-action-btn btn-sm"
                onClick={() => {
                  if (currentQuestionIdx < sectionQuestions.length - 1) {
                    setCurrentQuestionIdx(prev => prev + 1);
                  } else {
                    // Next section or submit
                    const secIdx = QUIZ_SECTIONS.findIndex(s => s.id === activeSection);
                    if (secIdx < QUIZ_SECTIONS.length - 1) {
                      setActiveSection(QUIZ_SECTIONS[secIdx + 1].id);
                      setCurrentQuestionIdx(0);
                    } else {
                      setIsSubmitted(true);
                    }
                  }
                }}
              >
                <span>{currentQuestionIdx < sectionQuestions.length - 1 ? 'Next Question' : 'Finish Section / Submit'}</span>
                <ChevronRight className="btn-icon" />
              </button>
            </div>
          </div>

          {/* Right Column: Question Palette & Submit Card */}
          <div className="col-box flex-col gap-16">
            <div className="glass-card padding-20">
              <h3 className="card-title">Question Palette</h3>
              <div className="palette-grid margin-top-12">
                {sectionQuestions.map((q, idx) => {
                  const qKey = `${activeSection}_${q.id}`;
                  const isAnswered = userAnswers[qKey] !== undefined;
                  const isFlagged = markedForReview[qKey];
                  const isCurrent = currentQuestionIdx === idx;
                  return (
                    <button
                      key={q.id}
                      className={`palette-num-btn ${isCurrent ? 'current' : ''} ${isFlagged ? 'flagged' : isAnswered ? 'answered' : ''}`}
                      onClick={() => setCurrentQuestionIdx(idx)}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="palette-legend margin-top-16">
                <div className="legend-item"><span className="dot answered"></span> Answered</div>
                <div className="legend-item"><span className="dot flagged"></span> Marked</div>
                <div className="legend-item"><span className="dot unvisited"></span> Unvisited</div>
              </div>

              <button 
                className="primary-action-btn width-full margin-top-24"
                onClick={() => setIsSubmitted(true)}
              >
                <CheckCircle2 className="btn-icon" />
                <span>Submit Assessment</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Results Breakdown Dashboard */
        <div className="glass-card padding-32 text-center animate-fade-in">
          <Award className="huge-score-icon text-accent margin-bottom-12" />
          <h2>Assessment Completed!</h2>
          <p className="banner-subtitle">Here is your detailed performance report for {currentRole.title}</p>

          <div className="score-summary-row margin-top-24 justify-center gap-32">
            <div className="score-card-box">
              <span className="big-num text-primary">{scoreData.correct} / {scoreData.total}</span>
              <span className="lbl">Correct Answers</span>
            </div>
            <div className="score-card-box">
              <span className="big-num text-accent">{scoreData.percentage}%</span>
              <span className="lbl">Accuracy Rating</span>
            </div>
          </div>

          <div className="margin-top-32 flex-row justify-center gap-16">
            <button className="primary-action-btn" onClick={restartQuiz}>
              <RotateCcw className="btn-icon" />
              <span>Retake Assessment</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
