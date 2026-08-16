const express = require('express');
const router = express.Router();
const {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill
} = require('../controllers/skillController');
const { protect } = require('../middlewares/auth');
const { skillRules } = require('../middlewares/inputValidators');
const validate = require('../middlewares/validate');

router.route('/')
  .get(getSkills)
  .post(protect, skillRules, validate, createSkill);

router.route('/:id')
  .put(protect, skillRules, validate, updateSkill)
  .delete(protect, deleteSkill);

module.exports = router;
