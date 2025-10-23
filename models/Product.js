const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Ürün adı gerekli'],
    trim: true,
    maxlength: [200, 'Ürün adı 200 karakterden uzun olamaz']
  },
  price: {
    type: Number,
    required: [true, 'Fiyat gerekli'],
    min: [0, 'Fiyat 0\'dan küçük olamaz']
  },
  image: {
    type: String,
    required: [true, 'Ürün görseli gerekli']
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // createdAt, updatedAt otomatik ekler
});

// Index oluştur (performans için)
productSchema.index({ name: 'text' }); // Arama için
productSchema.index({ active: 1 }); // Filtreleme için

module.exports = mongoose.model('Product', productSchema);
