import { JOB_ROLES } from '../data/rolesData';
import { SKILL_MATCHERS } from '../data/skillsData';
import { predictRoleProbabilities, ROLE_MODEL_BLEND_WEIGHT } from './roleModel';

// Common stop words list
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'if', 'because', 'as', 'what', 'which', 'this', 'that', 'these',
  'those', 'then', 'just', 'so', 'than', 'such', 'both', 'through', 'about', 'for', 'is', 'of', 'while',
  'during', 'to', 'from', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once',
  'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most',
  'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'can',
  'will', 'just', 'should', 'now', 'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'you', 'your', 'with', 'by'
]);

// Strong resume action verbs
const ACTION_VERBS = [
  'developed', 'engineered', 'architected', 'implemented', 'designed', 'built', 'created',
  'optimized', 'automated', 'spearheaded', 'reduced', 'increased', 'improved', 'scaled',
  'analyzed', 'queried', 'migrated', 'refactored', 'deployed', 'trained', 'formulated',
  'visualized', 'benchmarked', 'lead', 'collaborated', 'integrated', 'modeled', 'extracted'
];

/**
 * Tokenize and normalize text into clean n-grams (1, 2, 3 words)
 */
export function extractNGrams(text) {
  if (!text) return [];
  const cleanText = text.toLowerCase().replace(/[^a-z0-9#+.\s-]/g, ' ');
  const words = cleanText.split(/\s+/).filter(w => w.length > 1 && !STOP_WORDS.has(w));
  
  const nGrams = [];
  // Unigrams
  words.forEach(w => nGrams.push(w));
  // Bigrams
  for (let i = 0; i < words.length - 1; i++) {
    nGrams.push(`${words[i]} ${words[i+1]}`);
  }
  // Trigrams
  for (let i = 0; i < words.length - 2; i++) {
    nGrams.push(`${words[i]} ${words[i+1]} ${words[i+2]}`);
  }
  return nGrams;
}

/**
 * Compute Term Frequency vector for text
 */
function buildTermFrequencyVector(text) {
  const nGrams = extractNGrams(text);
  const tf = {};
  const total = nGrams.length || 1;
  
  nGrams.forEach(term => {
    tf[term] = (tf[term] || 0) + 1;
  });
  
  // Normalize
  Object.keys(tf).forEach(term => {
    tf[term] = tf[term] / total;
  });
  
  return tf;
}

/**
 * Calculate TF-IDF Cosine Similarity between two text documents (0.0 to 1.0)
 */
export function calculateCosineSimilarity(textA, textB) {
  const tfA = buildTermFrequencyVector(textA);
  const tfB = buildTermFrequencyVector(textB);
  
  const allTerms = new Set([...Object.keys(tfA), ...Object.keys(tfB)]);
  
  let dotProduct = 0;
  let magA = 0;
  let magB = 0;
  
  allTerms.forEach(term => {
    const valA = tfA[term] || 0;
    const valB = tfB[term] || 0;
    dotProduct += valA * valB;
    magA += valA * valA;
    magB += valB * valB;
  });
  
  if (magA === 0 || magB === 0) return 0;
  return dotProduct / (Math.sqrt(magA) * Math.sqrt(magB));
}

/**
 * Extract canonical skills from text using synonym mapping
 */
export function extractSkillsFromText(text) {
  if (!text) return [];
  const detected = [];
  for (const [skill, matchers] of SKILL_MATCHERS) {
    if (matchers.some((re) => re.test(text))) detected.push(skill);
  }
  return detected;
}

/**
 * Extract contact information from resume
 */
export function extractContactInformation(text) {
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  // Candidate digit runs (supports +91 98765 43210, +91-98765-43210, (022) 1234 5678 ...), 10-13 digits, not a year range
  const phoneMatch = (text.match(/\+?\d[\d\s().-]{8,18}\d/g) || [])
    .map((c) => c.trim())
    .find((c) => {
      const digits = c.replace(/\D/g, '').length;
      return digits >= 10 && digits <= 13 && !/^(19|20)\d{2}\s*[-–]\s*(19|20)\d{2}/.test(c);
    });
  const linkedinMatch = text.match(/(?:linkedin\.com\/in\/|linkedin:\s*)([a-zA-Z0-9_-]+)/i);
  const githubMatch = text.match(/(?:github\.com\/|github:\s*)([a-zA-Z0-9_-]+)/i);
  
  return {
    email: emailMatch ? emailMatch[0] : null,
    phone: phoneMatch || null,
    linkedin: linkedinMatch ? `linkedin.com/in/${linkedinMatch[1]}` : null,
    github: githubMatch ? `github.com/${githubMatch[1]}` : null
  };
}

/**
 * Extract measurable metrics / numerical results (e.g. 35%, 100k, $50,000)
 */
export function extractMeasurableAchievements(text) {
  const metricRegex = /(?:\b\d+(?:\.\d+)?%\b|\b\d+(?:,\d{3})+\b|\$\d+|\b\d+\+\s*(?:users|clients|records|projects|latency|speed|kpis|gb|tb|ms|hours|days|weeks|months))/gi;
  const matches = text.match(metricRegex) || [];
  
  // Extract surrounding sentences containing metrics
  const sentences = text.split(/(?<=[.!?])\s+/);
  const impactSentences = sentences.filter(s => { metricRegex.lastIndex = 0; return metricRegex.test(s); }).slice(0, 5);
  
  return {
    metricCount: matches.length,
    rawMetrics: Array.from(new Set(matches)),
    impactSentences
  };
}

/**
 * Detect detected action verbs in resume
 */
export function detectActionVerbs(text) {
  const lowerText = text.toLowerCase();
  const foundVerbs = ACTION_VERBS.filter(verb => {
    const regex = new RegExp(`\\b${verb}\\b`, 'i');
    return regex.test(lowerText);
  });
  return foundVerbs;
}

/**
 * Detect resume structural sections
 */
export function detectSections(text) {
  const lowerText = text.toLowerCase();
  return {
    education: /\b(education|academic|degree|b\.tech|b\.e|bsc|mtech|msc|gpa|cgpa)\b/i.test(lowerText),
    skills: /\b(skills|technical skills|technologies|tools|competencies|proficiencies)\b/i.test(lowerText),
    experience: /\b(experience|work experience|employment|internship|internships|projects|academic projects)\b/i.test(lowerText),
    certifications: /\b(certifications|courses|certificates|credentials|training)\b/i.test(lowerText),
    contact: extractContactInformation(text).email !== null
  };
}

/**
 * Compute Overall Quality & ATS Score breakdown
 */
export function evaluateResumeQuality(text) {
  if (!text || text.trim().length === 0) {
    return {
      overallScore: 0,
      atsScore: 0,
      breakdown: { structure: 0, contact: 0, impact: 0, verbs: 0, formatting: 0, skillDensity: 0 },
      sections: { education: false, skills: false, experience: false, certifications: false, contact: false },
      contact: { email: null, phone: null, linkedin: null, github: null },
      achievements: { metricCount: 0, rawMetrics: [], impactSentences: [] },
      actionVerbs: [],
      detectedSkills: [],
      wordCount: 0,
      suggestions: ['Please upload a valid resume text document.']
    };
  }
  
  const sections = detectSections(text);
  const contact = extractContactInformation(text);
  const achievements = extractMeasurableAchievements(text);
  const actionVerbs = detectActionVerbs(text);
  const detectedSkills = extractSkillsFromText(text);
  
  const words = text.split(/\s+/).length;
  
  // 1. Structure Score (25 pts max)
  let structurePts = 0;
  if (sections.education) structurePts += 6;
  if (sections.skills) structurePts += 6;
  if (sections.experience) structurePts += 8;
  if (sections.certifications) structurePts += 5;
  
  // 2. Contact Score (10 pts max)
  let contactPts = 0;
  if (contact.email) contactPts += 4;
  if (contact.phone) contactPts += 3;
  if (contact.linkedin) contactPts += 2;
  if (contact.github) contactPts += 1;
  
  // 3. Impact & Results Score (25 pts max)
  let impactPts = Math.min(25, achievements.metricCount * 5);
  
  // 4. Action Verbs Score (20 pts max)
  let verbsPts = Math.min(20, actionVerbs.length * 4);
  
  // 5. Formatting & Length Score (10 pts max)
  let formattingPts = 10;
  if (words < 150) formattingPts = 4;
  else if (words > 1000) formattingPts = 6;
  
  // 6. Skill Density Score (10 pts max)
  let skillDensityPts = Math.min(10, detectedSkills.length * 1.5);
  
  const overallScore = Math.min(100, Math.round(structurePts + contactPts + impactPts + verbsPts + formattingPts + skillDensityPts));
  const atsScore = Math.min(100, Math.round(overallScore * 0.92 + (detectedSkills.length > 5 ? 8 : 0)));
  
  // Build actionable improvement suggestions
  const suggestions = [];
  if (!contact.linkedin) suggestions.push('Add your professional LinkedIn profile URL in the contact header.');
  if (!contact.github) suggestions.push('Include your GitHub repository link to showcase code projects.');
  if (achievements.metricCount < 3) suggestions.push('Incorporate quantifiable metrics (e.g. "% improvement", "reduced execution time by X%", "handled Y users").');
  if (actionVerbs.length < 5) suggestions.push('Begin bullet points with strong action verbs like "Spearheaded", "Architected", "Engineered", "Optimized".');
  if (!sections.certifications) suggestions.push('Add a dedicated Certifications or Online Learning section to highlight external coursework.');
  if (detectedSkills.length < 6) suggestions.push('Explicitly group your technical skills (Languages, Frameworks, Databases, Developer Tools).');
  
  return {
    overallScore,
    atsScore,
    breakdown: {
      structure: Math.round(structurePts),
      contact: Math.round(contactPts),
      impact: Math.round(impactPts),
      verbs: Math.round(verbsPts),
      formatting: Math.round(formattingPts),
      skillDensity: Math.round(skillDensityPts)
    },
    sections,
    contact,
    achievements,
    actionVerbs,
    detectedSkills,
    wordCount: words,
    suggestions
  };
}

/**
 * Perform keyword and word-frequency similarity matching between Resume and a Target Job Role / Custom JD
 */
export function analyzeRoleMatch(resumeText, roleId, customJdText = null) {
  const targetRole = JOB_ROLES[roleId] || JOB_ROLES['data_analyst'];
  const jdText = customJdText || targetRole.sampleJobDescription;
  
  // 1. Vector Cosine Semantic Similarity
  const semanticSimilarity = calculateCosineSimilarity(resumeText, jdText);
  
  // 2. Canonical Skill Extraction Matrix
  const resumeSkills = new Set(extractSkillsFromText(resumeText));
  const targetPrimarySkills = targetRole.primarySkills;
  const targetSecondarySkills = targetRole.secondarySkills;
  
  const matchedPrimary = targetPrimarySkills.filter(s => resumeSkills.has(s.toLowerCase()));
  const matchedSecondary = targetSecondarySkills.filter(s => resumeSkills.has(s.toLowerCase()));
  
  const missingPrimary = targetPrimarySkills.filter(s => !resumeSkills.has(s.toLowerCase()));
  const missingSecondary = targetSecondarySkills.filter(s => !resumeSkills.has(s.toLowerCase()));
  
  const primaryMatchRatio = matchedPrimary.length / (targetPrimarySkills.length || 1);
  const secondaryMatchRatio = matchedSecondary.length / (targetSecondarySkills.length || 1);
  
  // Combined High Accuracy Semantic & Skill Weight Formula
  // 50% Vector Semantic Similarity + 35% Primary Skill Coverage + 15% Secondary Skill Coverage
  const rawFitScore = (semanticSimilarity * 50) + (primaryMatchRatio * 35) + (secondaryMatchRatio * 15);
  // Scale up slightly for well-matching resumes while capping at 98%
  const roleFitPercentage = Math.min(98, Math.max(15, Math.round(rawFitScore * 1.35)));
  
  return {
    roleId: targetRole.id,
    roleTitle: targetRole.title,
    roleFitPercentage,
    semanticSimilarity: Math.round(semanticSimilarity * 100),
    matchedPrimary,
    matchedSecondary,
    missingPrimary,
    missingSecondary,
    allDetectedResumeSkills: Array.from(resumeSkills)
  };
}

/**
 * Automatically Classify & Recommend top job roles for uploaded resume
 */
export function classifyTopRoles(resumeText) {
  // Blend of (a) a trained TF-IDF + logistic-regression classifier and (b) rule-based
  // skill-coverage / cosine similarity. Falls back to rules alone if the model has no signal.
  const mlProbs = predictRoleProbabilities(resumeText);
  const w = mlProbs ? ROLE_MODEL_BLEND_WEIGHT : 0;

  const roleScores = Object.keys(JOB_ROLES).map(roleId => {
    const analysis = analyzeRoleMatch(resumeText, roleId);
    const ruleFit = analysis.roleFitPercentage / 100;
    const ml = mlProbs && mlProbs[roleId] !== undefined ? mlProbs[roleId] : ruleFit;
    const blended = w * ml + (1 - w) * ruleFit;
    return {
      roleId,
      roleTitle: JOB_ROLES[roleId].title,
      fitPercentage: Math.min(98, Math.max(5, Math.round(blended * 100))),
      blendedScore: blended,
      mlProbability: mlProbs ? Math.round(ml * 100) : null,
      ruleFitPercentage: analysis.roleFitPercentage,
      semanticSimilarity: analysis.semanticSimilarity,
      matchedCount: analysis.matchedPrimary.length + analysis.matchedSecondary.length,
      missingPrimary: analysis.missingPrimary
    };
  });

  roleScores.sort((a, b) => b.blendedScore - a.blendedScore);

  return {
    bestMatchRole: roleScores[0],
    allRolesRanking: roleScores
  };
}

/**
 * Evaluate Interactive Mock Interview Answer with STAR method validation & keyword scoring
 */
export function evaluateInterviewAnswer(questionObj, userAnswerText) {
  if (!userAnswerText || userAnswerText.trim().length < 10) {
    return {
      score: 15,
      feedback: "Answer is too brief. Please provide a detailed response with technical specifics and context.",
      starEvaluation: { situation: false, task: false, action: false, result: false },
      missingKeywords: questionObj.expectedKeywords || [],
      strengths: [],
      improvements: ["Expand your answer to explain your approach step-by-step."]
    };
  }

  const lowerAnswer = userAnswerText.toLowerCase();
  const words = userAnswerText.split(/\s+/).length;
  
  // 1. Keyword check
  const expectedKeywords = questionObj.expectedKeywords || [];
  const matchedKeywords = expectedKeywords.filter(kw => lowerAnswer.includes(kw.toLowerCase()));
  const missingKeywords = expectedKeywords.filter(kw => !lowerAnswer.includes(kw.toLowerCase()));
  const keywordScore = expectedKeywords.length ? (matchedKeywords.length / expectedKeywords.length) * 40 : 30;
  
  // 2. STAR Method Checks (for HR/Behavioral questions)
  const starCheck = {
    situation: /\b(when|during|in my|project|at|while|team|company|faced)\b/i.test(lowerAnswer),
    task: /\b(responsible|task|deadline|goal|needed to|objective|challenge|required)\b/i.test(lowerAnswer),
    action: /\b(i|we|developed|implemented|used|created|built|designed|analyzed|solved|wrote|added)\b/i.test(lowerAnswer),
    result: /\b(result|outcome|improved|reduced|achieved|boosted|increased|success|metric|%)\b/i.test(lowerAnswer)
  };
  
  const starScore = (starCheck.situation ? 10 : 0) + (starCheck.task ? 10 : 0) + (starCheck.action ? 15 : 0) + (starCheck.result ? 15 : 0);
  
  // 3. Length & Detail Score
  let detailScore = 10;
  if (words >= 40 && words <= 180) detailScore = 10;
  else if (words > 180) detailScore = 8;
  else detailScore = 5;
  
  const totalScore = Math.min(98, Math.round(keywordScore + starScore + detailScore));
  
  // Build strengths & improvements
  const strengths = [];
  const improvements = [];
  
  if (matchedKeywords.length > 0) strengths.push(`Mentioned relevant technical terminology: ${matchedKeywords.join(', ')}`);
  if (starCheck.action) strengths.push('Clearly described personal technical actions and steps taken.');
  if (starCheck.result) strengths.push('Included outcomes and results of your intervention.');
  
  if (!starCheck.result) improvements.push('Add a specific measurable outcome (e.g. "This reduced latency by 30% or improved team accuracy").');
  if (missingKeywords.length > 0) improvements.push(`Incorporate key domain concepts: ${missingKeywords.slice(0, 3).join(', ')}.`);
  if (words < 30) improvements.push('Elaborate further to make your answer more thorough and professional.');
  
  let ratingLabel = "Needs Work";
  if (totalScore >= 85) ratingLabel = "Excellent Answer";
  else if (totalScore >= 70) ratingLabel = "Good Answer";
  else if (totalScore >= 50) ratingLabel = "Satisfactory";
  
  return {
    score: totalScore,
    ratingLabel,
    starEvaluation: starCheck,
    matchedKeywords,
    missingKeywords,
    strengths,
    improvements
  };
}
