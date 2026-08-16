const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const { upload } = require('../middlewares/upload');

router.post('/', protect, (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'Aucun fichier reçu' });
    }

    const base = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`;
    res.status(201).json({
      url: `${base}/uploads/${req.file.filename}`,
      originalName: req.file.originalname
    });
  });
});

module.exports = router;
