const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  headline: { type: String, default: '' },
  introduction: { type: String, default: '' },
  bio: { type: String, default: '' },
  softSkills: { type: [String], default: [] },
  interests: { type: [String], default: [] },
  cvUrl: { type: String, default: 'assets/cv-romance-nguema.pdf' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);
