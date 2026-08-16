const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom de l\'expéditeur est requis'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'L\'e-mail est requis'],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Veuillez fournir une adresse e-mail valide'
    ]
  },
  subject: {
    type: String,
    required: [true, 'Le sujet du message est requis']
  },
  message: {
    type: String,
    required: [true, 'Le contenu du message est requis']
  },
  read: {
    type: Boolean,
    default: false // Par défaut, un nouveau message est "non lu"
  }
}, {
  timestamps: true // Gère automatiquement le champ createdAt demandé dans le CDC
});

module.exports = mongoose.model('Message', messageSchema);
