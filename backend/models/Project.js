const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre du projet est requis'],
    trim: true
  },
  shortDescription: {
    type: String,
    required: [true, 'Une description courte est requise']
  },
  description: {
    type: String,
    required: [true, 'La description complète est requise']
  },
  technologies: {
    type: [String],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  imageFit: {
    type: String,
    enum: ['cover', 'contain'],
    default: 'contain'
  },
  imageZoom: {
    type: Number,
    min: 50,
    max: 160,
    default: 100
  },
  screenshots: {
    type: [String],
    default: []
  },
  githubUrl: {
    type: String
  },
  demoUrl: {
    type: String
  },
  apkUrl: {
    type: String
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Ajoute automatiquement createdAt et updatedAt
});

module.exports = mongoose.model('Project', projectSchema);
