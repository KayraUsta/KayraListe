// Test ürünü eklemek için basit script
const axios = require('axios');

const testProduct = {
  name: 'Test Ürün - Modern Tişört',
  price: 299.90,
  image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
  active: true
};

axios.post('http://localhost:5000/api/products', testProduct)
  .then(response => {
    console.log('✅ Test ürünü eklendi:');
    console.log(response.data);
  })
  .catch(error => {
    console.error('❌ Hata:', error.response?.data || error.message);
  });
