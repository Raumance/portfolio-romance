const { body } = require('express-validator');

exports.loginRules = [
  body('email').trim().isEmail().withMessage('Adresse e-mail invalide').toLowerCase(),
  body('password').isString().isLength({ min: 6 }).withMessage('Le mot de passe est requis')
];

exports.contactRules = [
  body('name').trim().isLength({ min: 2, max: 80 }).withMessage('Le nom doit contenir entre 2 et 80 caractères'),
  body('email').trim().isEmail().withMessage('Adresse e-mail invalide').normalizeEmail(),
  body('subject').trim().isLength({ min: 3, max: 120 }).withMessage('Le sujet doit contenir entre 3 et 120 caractères'),
  body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Le message doit contenir entre 10 et 2000 caractères')
];

exports.projectRules = [
  body('title').trim().notEmpty().withMessage('Le titre est requis'),
  body('shortDescription').trim().notEmpty().withMessage('Le résumé est requis'),
  body('description').trim().notEmpty().withMessage('La description est requise'),
  body('technologies').isArray({ min: 1 }).withMessage('Au moins une technologie est requise'),
  body('category').trim().notEmpty().withMessage('La catégorie est requise'),
  body('image').trim().notEmpty().withMessage("L'image est requise"),
  body('imageFit').optional().isIn(['cover', 'contain']),
  body('imageZoom').optional().isInt({ min: 50, max: 160 }),
  body('screenshots').optional().isArray(),
  body('apkUrl').optional().isString(),
  body('featured').optional().isBoolean()
];

exports.skillRules = [
  body('name').trim().notEmpty().withMessage('Le nom est requis'),
  body('category').isIn(['Frontend', 'Backend', 'Bases de données', 'Mobile', 'Outils']).withMessage('Catégorie invalide'),
  body('level').isInt({ min: 0, max: 100 }).withMessage('Le niveau doit être compris entre 0 et 100'),
  body('icon').optional().isString()
];

exports.experienceRules = [
  body('title').trim().notEmpty().withMessage("L'intitulé est requis"),
  body('institution').trim().notEmpty().withMessage("L'établissement est requis"),
  body('type').isIn(['Formation', 'Expérience', 'Projet']).withMessage('Type invalide'),
  body('startDate').notEmpty().withMessage('La date de début est requise'),
  body('description').trim().notEmpty().withMessage('La description est requise')
];

exports.profileRules = [
  body('headline').optional().trim().isLength({ max: 180 }),
  body('introduction').optional().trim().isLength({ max: 600 }),
  body('bio').optional().trim().isLength({ max: 4000 }),
  body('softSkills').optional().isArray(),
  body('interests').optional().isArray(),
  body('cvUrl').optional().isString()
];
