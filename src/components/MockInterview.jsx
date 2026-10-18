import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Play, 
  Square, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw,
  Volume2
} from 'lucide-react';
import { INTERVIEW_QUESTIONS } from '../data/interviewData';
import { evaluateInterviewAnswer, extractSkillsFromText } from '../services/nlpEngine';
import { JOB_ROLES } from '../data/rolesData';

export default function MockInterview({ resumeText, selectedTargetRole }) {
  const [cameraActive, setCameraActive] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswerText, setUserAnswerText] = useState('');
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  const videoRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const mediaStreamRef = useRef(null);

  const currentRole = JOB_ROLES[selectedTargetRole] || JOB_ROLES['data_analyst'];
  
  // Combine questions: HR + Role Technical + Dynamic Resume Questions
  const roleQuestions = INTERVIEW_QUESTIONS[selectedTargetRole] || INTERVIEW_QUESTIONS['data_analyst'];
  const hrQuestions = INTERVIEW_QUESTIONS['hr'];
  
  // Dynamically generate resume questions if skills detected
  const userSkills = resumeText ? extractSkillsFromText(resumeText) : [];
  const dynamicResumeQuestion = {
    id: "dyn_res_1",
    category: "Resume Specific",
    question: userSkills.length > 0 
      ? `I see you have hands-on experience with ${userSkills.slice(0, 3).join(', ')}. Could you walk me through your technical architecture and personal contribution in a key project using these tools?`
      : `Walk me through the technical architecture of your most impactful project listed on your resume.`,
    expectedKeywords: userSkills.slice(0, 4).concat(["architecture", "project", "result", "contribution"])
  };

  const allInterviewQuestions = [dynamicResumeQuestion, ...roleQuestions, ...hrQuestions];
  const currentQ = allInterviewQuestions[currentQuestionIdx] || allInterviewQuestions[0];

  // Enable / Disable Camera & Microphone Stream
  const toggleMediaPermissions = async () => {
    if (cameraActive || micActive) {
      // Stop tracks
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
      setCameraActive(false);
      setMicActive(false);
      setAudioLevel(0);
    } else {
      try {
        let stream;
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
            audio: true
          });
        } catch (e) {
          // Fall back to video only if microphone is unavailable/denied
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
        }
        mediaStreamRef.current = stream;
        setCameraActive(true);
        setMicActive(stream.getAudioTracks().length > 0);
        if (stream.getAudioTracks().length === 0) return;

        // Web Audio API visualizer
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioContext();
        const source = audioContextRef.current.createMediaStreamSource(stream);
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;
        source.connect(analyserRef.current);

        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        const updateAudioMeter = () => {
          if (!analyserRef.current) return;
          analyserRef.current.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const average = sum / dataArray.length;
          setAudioLevel(Math.min(100, Math.round(average * 1.5)));
          if (stream.active) requestAnimationFrame(updateAudioMeter);
        };
        updateAudioMeter();
      } catch (err) {
        alert('Could not access the camera. Please allow camera permission in the browser address bar and close other apps (Zoom/Teams/Camera) that may be using it. You can still type your answer.');
      }
    }
  };

  // Attach the stream AFTER the <video> element is rendered (fixes the black screen)
  useEffect(() => {
    const video = videoRef.current;
    if (cameraActive && video && mediaStreamRef.current) {
      video.srcObject = mediaStreamRef.current;
      const playPromise = video.play();
      if (playPromise && playPromise.catch) playPromise.catch(() => {});
    }
  }, [cameraActive]);

  // Cleanup media on unmount
  useEffect(() => {
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleEvaluateAnswer = () => {
    if (!userAnswerText.trim()) return;
    const result = evaluateInterviewAnswer(currentQ, userAnswerText);
    setEvaluationResult(result);
  };

  const nextQuestion = () => {
    setEvaluationResult(null);
    setUserAnswerText('');
    setCurrentQuestionIdx(prev => (prev + 1) % allInterviewQuestions.length);
  };

  return (
    <div className="tab-container animate-fade-in">
      {/* Header Banner */}
      <div className="section-banner glass-card">
        <div className="banner-content">
          <div className="banner-title-group">
            <Video className="banner-icon" />
            <h2>Interactive Audio/Video AI Mock Interview Simulator</h2>
          </div>
          <p className="banner-subtitle">
            Experience Internshala-style live audio/video interview practice. Evaluates technical accuracy, STAR method structure (Situation, Task, Action, Result), and key domain terminology.
          </p>
        </div>
      </div>

      <div className="grid-2-col gap-16">
        {/* Left Column: Video Feed & Question Prompt */}
        <div className="col-box flex-col gap-16">
          {/* Camera Stream Viewport */}
          <div className="glass-card padding-16 camera-viewport-card">
            <div className="camera-screen">
              {cameraActive ? (
                <video ref={videoRef} autoPlay playsInline muted className="live-video-feed" />
              ) : (
                <div className="camera-placeholder flex-col center-content">
                  <VideoOff className="placeholder-icon" />
                  <span>Camera Stream Paused</span>
                  <button className="primary-action-btn btn-sm margin-top-12" onClick={toggleMediaPermissions}>
                    <Video className="btn-icon" />
                    <span>Enable WebCam & Mic</span>
                  </button>
                </div>
              )}

              {/* Live Audio Visualizer Overlay Bar */}
              {micActive && (
                <div className="audio-meter-overlay">
                  <Volume2 className="meter-icon" />
                  <div className="meter-bar-bg">
                    <div className="meter-bar-fill" style={{ width: `${audioLevel}%` }} />
                  </div>
                </div>
              )}
            </div>

            {/* Media Controls */}
            <div className="media-controls-bar margin-top-12 justify-between align-center">
              <div className="flex-row gap-8">
                <button 
                  className={`icon-control-btn ${cameraActive ? 'active' : ''}`}
                  onClick={toggleMediaPermissions}
                >
                  {cameraActive ? <Video className="btn-icon" /> : <VideoOff className="btn-icon" />}
                </button>
                <button 
                  className={`icon-control-btn ${micActive ? 'active' : ''}`}
                  onClick={toggleMediaPermissions}
                >
                  {micActive ? <Mic className="btn-icon" /> : <MicOff className="btn-icon" />}
                </button>
              </div>
              <span className="badge-pill info">Question {currentQuestionIdx + 1} of {allInterviewQuestions.length}</span>
            </div>
          </div>

          {/* Current Interview Question Prompt */}
          <div className="glass-card padding-20 border-accent">
            <div className="card-header-row justify-between">
              <span className="badge-pill accent">{currentQ.category}</span>
              <span className="text-muted">Target: {currentRole.title}</span>
            </div>
            <h3 className="interview-q-text margin-top-12">"{currentQ.question}"</h3>
          </div>
        </div>

        {/* Right Column: Answer Input & Real-Time AI Evaluation */}
        <div className="col-box flex-col gap-16">
          <div className="glass-card padding-20">
            <h3 className="card-title">Your Interview Answer Response</h3>
            <p className="card-desc">Type your answer below (or speak into microphone):</p>

            <textarea 
              className="resume-text-area margin-top-12"
              placeholder="e.g. In my recent final year project, I faced high latency issues when querying PostgreSQL. I added indexed columns..."
              value={userAnswerText}
              onChange={(e) => setUserAnswerText(e.target.value)}
              rows={7}
            />

            <div className="flex-row justify-between align-center margin-top-16">
              <button 
                className="secondary-btn"
                onClick={() => setUserAnswerText(currentQ.sampleAnswer || '')}
              >
                <span>Load Model STAR Answer</span>
              </button>

              <button 
                className="primary-action-btn btn-sm"
                onClick={handleEvaluateAnswer}
                disabled={!userAnswerText.trim()}
              >
                <Sparkles className="btn-icon" />
                <span>Evaluate Answer with AI</span>
              </button>
            </div>
          </div>

          {/* Evaluation Result Feedback Card */}
          {evaluationResult && (
            <div className="glass-card padding-24 evaluation-result-card animate-fade-in border-primary">
              <div className="gauge-header justify-between">
                <div className="flex-row gap-8 align-center">
                  <Award className="gauge-icon text-accent" />
                  <span className="font-bold text-accent">{evaluationResult.ratingLabel}</span>
                </div>
                <div className="eval-score-pill">
                  <span className="score-num">{evaluationResult.score}</span>
                  <span className="score-den">/100</span>
                </div>
              </div>

              {/* STAR Method Verification Checklist */}
              <div className="star-checklist-row margin-top-16">
                <span className="star-label">STAR Method Matrix:</span>
                <div className="star-badges">
                  <span className={`star-chip ${evaluationResult.starEvaluation.situation ? 'pass' : 'fail'}`}>
                    Situation {evaluationResult.starEvaluation.situation ? '✓' : '✗'}
                  </span>
                  <span className={`star-chip ${evaluationResult.starEvaluation.task ? 'pass' : 'fail'}`}>
                    Task {evaluationResult.starEvaluation.task ? '✓' : '✗'}
                  </span>
                  <span className={`star-chip ${evaluationResult.starEvaluation.action ? 'pass' : 'fail'}`}>
                    Action {evaluationResult.starEvaluation.action ? '✓' : '✗'}
                  </span>
                  <span className={`star-chip ${evaluationResult.starEvaluation.result ? 'pass' : 'fail'}`}>
                    Result {evaluationResult.starEvaluation.result ? '✓' : '✗'}
                  </span>
                </div>
              </div>

              {/* Strengths */}
              {evaluationResult.strengths.length > 0 && (
                <div className="eval-section margin-top-12">
                  <h4 className="text-success font-medium">Key Strengths:</h4>
                  <ul className="eval-list">
                    {evaluationResult.strengths.map((str, i) => (
                      <li key={i}><CheckCircle2 className="mini-icon text-success" /> {str}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Improvement Tips */}
              {evaluationResult.improvements.length > 0 && (
                <div className="eval-section margin-top-12">
                  <h4 className="text-accent font-medium">Areas to Improve:</h4>
                  <ul className="eval-list">
                    {evaluationResult.improvements.map((imp, i) => (
                      <li key={i}><AlertCircle className="mini-icon text-accent" /> {imp}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button className="primary-action-btn width-full margin-top-20" onClick={nextQuestion}>
                <span>Next Interview Question</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
