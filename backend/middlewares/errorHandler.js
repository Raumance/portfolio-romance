const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Erreur spécifique Mongoose : ID invalide (CastError)
  if (err.name === 'CastError') {
    message = 'Ressource non trouvée (ID invalide)';
    statusCode = 404;
  }

  // Erreur spécifique Mongoose : Doublon (clé unique dupliquée)
  if (err.code === 11000) {
    message = 'Un enregistrement existe déjà avec cette valeur';
    statusCode = 400;
  }

  // Erreur spécifique Mongoose : Validation échouée
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map(val => val.message).join(', ');
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack // Masque la stack trace en production
  });
};

module.exports = errorHandler;
