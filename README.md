# KRKIT Product Management Backend API

Modern ürün yönetim sistemi için Node.js + Express + MongoDB backend API.

## 🚀 Kurulum

### 1. Bağımlılıkları Yükle
```bash
npm install
```

### 2. MongoDB Kurulumu

**Seçenek A: Yerel MongoDB**
```bash
# MongoDB'yi indir ve kur: https://www.mongodb.com/try/download/community
# Varsayılan olarak localhost:27017'de çalışır
```

**Seçenek B: MongoDB Atlas (Cloud - Ücretsiz)**
1. https://www.mongodb.com/cloud/atlas/register adresinden kayıt ol
2. Ücretsiz cluster oluştur
3. Database Access'ten kullanıcı oluştur
4. Network Access'ten IP ekle (0.0.0.0/0 - tüm IP'ler)
5. Connection string'i kopyala

### 3. Environment Variables
```bash
# .env.example dosyasını .env olarak kopyala
cp .env.example .env

# .env dosyasını düzenle:
MONGODB_URI=mongodb://localhost:27017/krkit-products
PORT=5000
```

### 4. Sunucuyu Başlat
```bash
# Development (otomatik yenileme)
npm run dev

# Production
npm start
```

## 📡 API Endpoints

### Ürünler

#### Tüm Ürünleri Getir
```
GET /api/products
Query: ?active=true&search=tişört
```

#### Sadece Aktif Ürünler
```
GET /api/products/active
```

#### Tek Ürün
```
GET /api/products/:id
```

#### Yeni Ürün Ekle
```
POST /api/products
Body: {
  "name": "Ürün Adı",
  "price": 299.90,
  "image": "base64_veya_url",
  "active": true
}
```

#### Ürün Güncelle
```
PUT /api/products/:id
Body: {
  "name": "Yeni Ad",
  "price": 399.90
}
```

#### Aktif/Pasif Toggle
```
PATCH /api/products/:id/toggle
```

#### Ürün Sil
```
DELETE /api/products/:id
```

## 🧪 Test

### Postman veya cURL ile test:
```bash
# Tüm ürünleri getir
curl http://localhost:5000/api/products

# Yeni ürün ekle
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Ürün",
    "price": 99.90,
    "image": "https://example.com/image.jpg",
    "active": true
  }'
```

## 📦 Teknolojiler

- **Express.js** - Web framework
- **MongoDB** - NoSQL veritabanı
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **Multer** - Dosya yükleme (isteğe bağlı)
- **Cloudinary** - Resim hosting (isteğe bağlı)

## 🔒 Güvenlik Notları

⚠️ **Önemli:** Bu API şu anda authentication içermiyor. Production'da:
- JWT authentication ekleyin
- Admin middleware ekleyin
- Rate limiting ekleyin
- Input validation güçlendirin
- HTTPS kullanın

## 📝 Lisans

ISC
