# 📸 Cloudinary Kurulum Rehberi

## 1️⃣ Hesap Oluşturma

1. **Cloudinary'ye Git:** https://cloudinary.com/users/register/free
2. **Kayıt Ol:**
   - Email
   - Şifre
   - Cloud Name (örn: krkit-products)
3. **Email Doğrula**

## 2️⃣ Dashboard'dan Bilgileri Al

1. **Dashboard'a Git:** https://console.cloudinary.com/
2. **Product Environment Credentials** bölümünü bul
3. **Şu bilgileri kopyala:**
   ```
   Cloud Name: krkit-products (veya sizin seçtiğiniz)
   API Key: 123456789012345
   API Secret: abcdefghijklmnopqrstuvwxyz
   ```

## 3️⃣ .env Dosyasını Güncelle

`backend/.env` dosyasını aç ve şunları ekle:

```env
CLOUDINARY_CLOUD_NAME=krkit-products
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz
```

## 4️⃣ Test Et

### Backend'i Başlat:
```bash
cd backend
npm run dev
```

### Postman veya cURL ile Test:
```bash
curl -X POST http://localhost:5000/api/upload \
  -H "Content-Type: application/json" \
  -d '{
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
  }'
```

### Başarılı Yanıt:
```json
{
  "success": true,
  "message": "Resim yüklendi",
  "data": {
    "url": "https://res.cloudinary.com/krkit-products/image/upload/v1234/krkit-products/abc123.jpg",
    "public_id": "krkit-products/abc123",
    "width": 800,
    "height": 800,
    "format": "jpg",
    "size": 45678
  }
}
```

## 5️⃣ Ücretsiz Plan Limitleri

✅ **25 GB** depolama
✅ **25 GB** bandwidth/ay
✅ **25,000** transformasyon/ay
✅ **Sınırsız** resim

## 6️⃣ Cloudinary Özellikleri

### Otomatik Optimizasyon:
- Resimler otomatik sıkıştırılır
- WebP formatına çevrilir (tarayıcı destekliyorsa)
- Responsive boyutlar otomatik oluşturulur

### CDN:
- Dünya çapında hızlı erişim
- Otomatik cache

### Transformasyonlar:
```
/w_800,h_800,c_limit/  → Max 800x800
/q_auto:good/          → Otomatik kalite
/f_auto/               → Otomatik format
```

## 7️⃣ Frontend Entegrasyonu

Quasar uygulamanızda:

```javascript
// Resim yükle
const uploadImage = async (file) => {
  const reader = new FileReader();
  reader.onload = async (e) => {
    const base64 = e.target.result;
    
    const response = await axios.post('http://localhost:5000/api/upload', {
      image: base64
    });
    
    // Cloudinary URL'i al
    const imageUrl = response.data.data.url;
    
    // Ürün oluştururken bu URL'i kullan
    await axios.post('http://localhost:5000/api/products', {
      name: 'Ürün Adı',
      price: 99.90,
      image: imageUrl, // Cloudinary URL
      active: true
    });
  };
  reader.readAsDataURL(file);
};
```

## 🎯 Avantajlar

| Özellik | Base64 (MongoDB) | Cloudinary |
|---------|------------------|------------|
| Depolama | MongoDB'de | Cloudinary'de |
| Boyut | ~500 KB/resim | ~100 bytes (URL) |
| Hız | Yavaş | Çok hızlı (CDN) |
| Optimizasyon | Yok | Otomatik |
| Maliyet | MongoDB limiti | 25 GB ücretsiz |

## 🚀 Sonuç

Artık resimler:
1. Cloudinary'ye yüklenir
2. MongoDB'de sadece URL saklanır
3. Çok daha az yer kaplar
4. Çok daha hızlı yüklenir

**1000 ürün için:**
- Base64: ~500 MB ❌
- Cloudinary: ~100 KB ✅
