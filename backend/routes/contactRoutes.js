const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const {
  sendMessage,
  getMessages,
  markAsRead,
  deleteMessage
} = require('../controllers/contactController');
const { protect } = require('../middlewares/auth');
const { contactRules } = require('../middlewares/inputValidators');
const validate = require('../middlewares/validate');

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  message: 'Trop de messages envoyés. Réessayez plus tard.'
});

router.route('/')
  .post(contactLimiter, contactRules, validate, sendMessage)
  .get(protect, getMessages);

router.route('/:id/read')
  .patch(protect, markAsRead);

router.route('/:id')
  .delete(protect, deleteMessage);

module.exports = router;
