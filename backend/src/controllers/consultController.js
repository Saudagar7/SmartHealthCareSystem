const Consultation = require('../models/Consultation');
const asyncHandler = require('../middlewares/asyncHandler');
const { generateConsultationPlan } = require('../services/geminiService');

const toNumber = (value, label) => {
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    const error = new Error(`${label} must be a valid number`);
    error.statusCode = 400;
    throw error;
  }
  return parsed;
};

const createConsultation = asyncHandler(async (req, res) => {
  const age = toNumber(req.body.age, 'Age');
  const weight = toNumber(req.body.weight, 'Weight');
  const days = toNumber(req.body.days, 'Number of days');
  const symptoms = String(req.body.symptoms || '').trim();
  const context = req.body.context ? String(req.body.context).trim() : undefined;

  if (!symptoms) {
    return res.status(400).json({ error: 'Symptoms are required' });
  }

  const aiResponse = await generateConsultationPlan({
    age,
    weight,
    days,
    symptoms,
    context,
  });

  const consultation = await Consultation.create({
    user: req.user._id,
    age,
    weight,
    days,
    symptoms,
    context,
    aiResponse,
  });

  res.status(201).json({
    consultationId: consultation._id,
    ...aiResponse,
  });
});

const getConsultations = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.max(1, Math.min(50, Number(req.query.limit) || 10));
  const skip = (page - 1) * limit;

  const [consultations, total] = await Promise.all([
    Consultation.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Consultation.countDocuments({ user: req.user._id }),
  ]);

  res.json({
    page,
    limit,
    total,
    pages: Math.max(1, Math.ceil(total / limit)),
    consultations: consultations.map((item) => ({
      id: item._id,
      age: item.age,
      weight: item.weight,
      days: item.days,
      symptoms: item.symptoms,
      context: item.context,
      aiResponse: item.aiResponse,
      createdAt: item.createdAt,
    })),
  });
});

module.exports = {
  createConsultation,
  getConsultations,
};
