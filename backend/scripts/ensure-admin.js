require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

async function ensureAdmin() {
  const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const password = (process.env.ADMIN_PASSWORD || '').trim();

  if (!process.env.MONGO_URI || !email || !password) {
    console.error('MONGO_URI, ADMIN_EMAIL et ADMIN_PASSWORD doivent être définis dans backend/.env');
    process.exit(1);
  }

  const uri = (process.env.MONGO_URI || '').replace('localhost', '127.0.0.1');
  await mongoose.connect(uri);

  const hashedPassword = await bcrypt.hash(password, 10);
  const existing = await User.findOne({ email }).select('+password');

  if (existing) {
    existing.password = hashedPassword;
    await existing.save();
    console.log(`Compte admin prêt : ${email} (mot de passe synchronisé avec le .env)`);
  } else {
    await User.create({ email, password: hashedPassword });
    console.log(`Compte admin créé : ${email}`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

ensureAdmin().catch((err) => {
  console.error('Impossible de préparer le compte admin :', err.message);
  process.exit(1);
});
