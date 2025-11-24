const { GoogleGenerativeAI } = require('@google/generative-ai');

let cachedModel;

const getModel = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set');
  }

  if (!cachedModel) {
    const genAI = new GoogleGenerativeAI(apiKey);
    cachedModel = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-2.5-flash' });
  }

  return cachedModel;
};

const sanitizeResponseText = (text = '') => text.replace(/```(?:json)?|```/gi, '').trim();

const highlightText = (text) => {
  if (!text) return text;
  if (text.includes('{') && text.includes('}')) {
    return text;
  }

  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (!sentences.length) {
    return `{${text.trim()}}`;
  }

  sentences[0] = `{${sentences[0].trim()}}`;
  return sentences.join(' ');
};

const normalizePlan = (plan = {}) => {
  const diagnosis = plan.diagnosis || plan.assessment || 'No diagnosis provided';
  const treatment = plan.treatment || plan.plan || 'No treatment guidance provided';
  const immediate = plan.immediate_actions || plan.immediateActions || null;
  const medication = plan.medication || plan.medications || null;

  return {
    diagnosis: highlightText(diagnosis),
    treatment: highlightText(treatment),
    immediate_actions: immediate ? highlightText(immediate) : null,
    medication: medication ? highlightText(medication) : null,
  };
};

const buildPrompt = ({ age, weight, symptoms, days, context }) => `You are a licensed tele-health clinician. Based on the following patient information, provide a thoughtful, empathetic response in plain JSON with keys diagnosis, treatment, immediate_actions, medication. Do not wrap the JSON in markdown or code fences. For every field, wrap the most critical words or sentence in braces like {seek medical help immediately}. Avoid disclaimer spam but remind the user to seek professional care if symptoms worsen.

Patient Profile:
- Age: ${age}
- Weight (kg): ${weight}
- Primary symptoms: ${symptoms}
- Symptoms duration (days): ${days}
- Extra context: ${context || 'None provided'}
`;

const generateConsultationPlan = async (payload) => {
  const model = getModel();
  const prompt = buildPrompt(payload);
  const result = await model.generateContent(prompt);
  const text = result.response?.text();

  if (!text) {
    throw new Error('Gemini returned an empty response');
  }

  const sanitized = sanitizeResponseText(text);
  let parsed;
  try {
    parsed = JSON.parse(sanitized);
  } catch (error) {
    throw new Error('Unable to parse Gemini response');
  }

  return normalizePlan(parsed);
};

module.exports = {
  generateConsultationPlan,
};
