const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    weight: {
      type: Number,
      required: true,
      min: 0,
    },
    symptoms: {
      type: String,
      required: true,
      trim: true,
    },
    days: {
      type: Number,
      required: true,
      min: 0,
    },
    context: {
      type: String,
      trim: true,
    },
    aiResponse: {
      diagnosis: {
        type: String,
        required: true,
      },
      treatment: {
        type: String,
        required: true,
      },
      immediate_actions: {
        type: String,
      },
      medication: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Consultation', consultationSchema);
