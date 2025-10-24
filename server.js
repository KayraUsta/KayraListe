const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Environment variables
dotenv.config();

// Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
const corsOptions = {
  origin: [
    'http://localhost:9000',  // Development
    'https://kayra-liste-front.vercel.app',  // Production (güncel Vercel URL)
    'https://umut-frontend.vercel.app'  // Eski URL (yedek)
  ],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' })); // Base64 resimler için
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/upload', require('./routes/upload'));

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'KRKIT Product Management API',
    version: '1.0.0',
    status: 'running'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Sunucu hatası',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portunda çalışıyor`);
  console.log(`📍 http://localhost:${PORT}`);
});
