const Message = require('../models/Message');
const sendEmail = require('../utils/sendEmail');

exports.sendMessage = async (req, res, next) => {
  try {
    if (req.body.website) {
      return res.status(201).json({ success: true, message: 'Message envoyé avec succès' });
    }

    const { name, email, subject, message } = req.body;
    const saved = await Message.create({ name, email, subject, message });

    let emailSent = false;
    try {
      await sendEmail({ name, email, subject, message });
      emailSent = true;
    } catch (mailError) {
      console.error('E-mail de contact non envoyé :', mailError.message || mailError);
    }

    res.status(201).json({
      success: true,
      emailSent,
      message: emailSent
        ? 'Message envoyé avec succès'
        : 'Message enregistré. L’e-mail de notification n’a pas pu partir.',
      data: saved
    });
  } catch (error) {
    next(error);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

exports.markAsRead = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ message: 'Message non trouvé' });
    }
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

exports.deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message non trouvé' });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};
