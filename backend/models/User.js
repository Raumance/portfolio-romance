const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'L\'e-mail est requis'],
    unique: true, // Empêche la création de doublons
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Veuillez fournir une adresse e-mail valide'
    ]
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est requis'],
    minlength: 6,
    select: false // Sécurité : n'inclut pas le mot de passe par défaut dans les requêtes de recherche
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
