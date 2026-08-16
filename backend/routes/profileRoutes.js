const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const { protect } = require('../middlewares/auth');
const { profileRules } = require('../middlewares/inputValidators');
const validate = require('../middlewares/validate');

router.route('/')
  .get(getProfile)
  .put(protect, profileRules, validate, updateProfile);

module.exports = router;
