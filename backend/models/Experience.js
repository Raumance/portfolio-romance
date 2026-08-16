const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'L\'intitulé est requis'],
    trim: true
  },
  institution: {
    type: String,
    required: [true, 'L\'établissement ou la structure est requis']
  },
  type: {
    type: String,
    required: [true, 'Le type est requis'],
    enum: ['Formation', 'Expérience', 'Projet']
  },
  startDate: {
    type: Date,
    required: [true, 'La date de début est requise']
  },
  endDate: {
    type: Date
    // Optionnel, car une formation/expérience peut être toujours en cours
  },
  description: {
    type: String,
    required: [true, 'La description est requise']
  }
});

module.exports = mongoose.model('Experience', experienceSchema);
