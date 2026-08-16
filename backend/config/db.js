const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = (process.env.MONGO_URI || '').replace('localhost', '127.0.0.1');
  const conn = await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 15000
  });
  console.log(`MongoDB Connecté : ${conn.connection.host}`);
};

module.exports = connectDB;
