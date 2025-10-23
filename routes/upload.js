const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');

// @route   POST /api/upload
// @desc    Resim yükle (Base64 veya dosya)
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: 'Resim gerekli'
      });
    }

    // Cloudinary'ye yükle
    const result = await cloudinary.uploader.upload(image, {
      folder: 'krkit-products', // Cloudinary'de klasör
      resource_type: 'auto',
      transformation: [
        { width: 800, height: 800, crop: 'limit' }, // Max boyut
        { quality: 'auto:good' }, // Otomatik kalite
        { fetch_format: 'auto' } // Otomatik format (WebP vs)
      ]
    });

    res.json({
      success: true,
      message: 'Resim yüklendi',
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        size: result.bytes
      }
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Resim yüklenemedi',
      error: error.message
    });
  }
});

// @route   DELETE /api/upload/:publicId
// @desc    Resim sil
// @access  Public (Gerçek uygulamada Admin olmalı)
router.delete('/:publicId', async (req, res) => {
  try {
    const publicId = req.params.publicId.replace(/-/g, '/'); // URL'den geri çevir
    
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === 'ok') {
      res.json({
        success: true,
        message: 'Resim silindi'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Resim bulunamadı'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Resim silinemedi',
      error: error.message
    });
  }
});

module.exports = router;
