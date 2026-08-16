const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = (process.env.MONGO_URI || '').replace('localhost', '127.0.0.1');
  let attempt = 0;

  for (;;) {
    try {
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 15000
      });
      console.log(`MongoDB Connecté : ${conn.connection.host}`);
      return;
    } catch (error) {
      attempt += 1;
      const waitMs = Math.min(30000, 3000 * attempt);
      console.error(`Erreur de connexion MongoDB (essai ${attempt}) : ${error.message}`);
      console.error('Vérifie Atlas → Network Access → 0.0.0.0/0, puis attends le prochain essai.');
      await new Promise((resolve) => setTimeout(resolve, waitMs));
    }
  }
};

module.exports = connectDB;
