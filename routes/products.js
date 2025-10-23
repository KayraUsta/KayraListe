const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// @route   GET /api/products
// @desc    Tüm ürünleri getir
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { active, search } = req.query;
    let query = {};

    // Aktif/Pasif filtresi
    if (active !== undefined) {
      query.active = active === 'true';
    }

    // Arama
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Ürünler getirilemedi',
      error: error.message 
    });
  }
});

// @route   GET /api/products/active
// @desc    Sadece aktif ürünleri getir
// @access  Public
router.get('/active', async (req, res) => {
  try {
    const products = await Product.find({ active: true }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Aktif ürünler getirilemedi',
      error: error.message 
    });
  }
});

// @route   GET /api/products/:id
// @desc    Tek ürün getir
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Ürün bulunamadı' 
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Ürün getirilemedi',
      error: error.message 
    });
  }
});

// @route   POST /api/products
// @desc    Yeni ürün ekle
// @access  Public (Gerçek uygulamada Admin olmalı)
router.post('/', async (req, res) => {
  try {
    const { name, price, image, active } = req.body;

    // Validasyon
    if (!name || !price || !image) {
      return res.status(400).json({ 
        success: false, 
        message: 'Ürün adı, fiyat ve görsel gerekli' 
      });
    }

    const product = await Product.create({
      name,
      price,
      image,
      active: active !== undefined ? active : true
    });

    res.status(201).json({
      success: true,
      message: 'Ürün başarıyla eklendi',
      data: product
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Ürün eklenemedi',
      error: error.message 
    });
  }
});

// @route   PUT /api/products/:id
// @desc    Ürün güncelle
// @access  Public (Gerçek uygulamada Admin olmalı)
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Ürün bulunamadı' 
      });
    }

    res.json({
      success: true,
      message: 'Ürün güncellendi',
      data: product
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Ürün güncellenemedi',
      error: error.message 
    });
  }
});

// @route   PATCH /api/products/:id/toggle
// @desc    Ürün aktif/pasif durumunu değiştir
// @access  Public (Gerçek uygulamada Admin olmalı)
router.patch('/:id/toggle', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Ürün bulunamadı' 
      });
    }

    product.active = !product.active;
    await product.save();

    res.json({
      success: true,
      message: `Ürün ${product.active ? 'aktif' : 'pasif'} yapıldı`,
      data: product
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Durum değiştirilemedi',
      error: error.message 
    });
  }
});

// @route   DELETE /api/products/:id
// @desc    Ürün sil
// @access  Public (Gerçek uygulamada Admin olmalı)
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Ürün bulunamadı' 
      });
    }

    res.json({
      success: true,
      message: 'Ürün silindi',
      data: product
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Ürün silinemedi',
      error: error.message 
    });
  }
});

module.exports = router;
