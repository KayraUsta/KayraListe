const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`✅ MongoDB bağlandı: ${conn.connection.host}`);
    console.log(`📦 Veritabanı: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB bağlantı hatası: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
