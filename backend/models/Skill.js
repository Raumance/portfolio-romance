const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom de la compétence est requis'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'La catégorie est requise'],
    enum: ['Frontend', 'Backend', 'Bases de données', 'Mobile', 'Outils'] // Restreint aux valeurs de ton CDC
  },
  level: {
    type: Number,
    required: [true, 'Le niveau est requis'],
    min: 0,
    max: 100
  },
  icon: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Skill', skillSchema);
