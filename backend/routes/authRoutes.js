const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const { loginRules } = require('../middlewares/inputValidators');
const validate = require('../middlewares/validate');

router.post('/login', loginRules, validate, login);

module.exports = router;
