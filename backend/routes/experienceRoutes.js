const express = require('express');
const router = express.Router();
const {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience
} = require('../controllers/experienceController');
const { protect } = require('../middlewares/auth');
const { experienceRules } = require('../middlewares/inputValidators');
const validate = require('../middlewares/validate');

router.route('/')
  .get(getExperiences)
  .post(protect, experienceRules, validate, createExperience);

router.route('/:id')
  .put(protect, experienceRules, validate, updateExperience)
  .delete(protect, deleteExperience);

module.exports = router;
