# Otomasyon Mağazası - n8n SaaS Otomasyon Platformu

Kullanıcıların Instagram, WhatsApp ve e-posta hesaplarını abonelik planları veya tekil bot satın alımları yoluyla güçlü otomasyon iş akışlarına bağlamalarını sağlayan kapsamlı n8n tabanlı SaaS otomasyon platformu.

## Özellikler

### Temel Fonksiyonlar
- **Kullanıcı Kimlik Doğrulama**: Supabase Auth ile güvenli kayıt/giriş
- **Abonelik Planları**: Çoklu katmanlı dinamik paket sistemi
- **Bot Mağazası**: Planlar dışında tekil bot satın alımları
- **Admin Paneli**: Tam platform yönetim arayüzü
- **Ödeme Entegrasyonu**: İyzico ile sorunsuz ödeme işleme
- **Deneme Sistemi**: Yeni kullanıcılar için 7 günlük ücretsiz deneme

### Platform Yetenekleri
- **Çoklu Platform Entegrasyonu**: Instagram, WhatsApp, E-posta otomasyonu
- **n8n İş Akışları**: Güçlü otomasyon motoru
- **Gerçek Zamanlı Analitik**: Bot performans izleme
- **Güvenli OAuth**: Şifrelenmiş token yönetimi
- **Duyarlı Tasarım**: Mobil optimize arayüz

## Teknoloji Yığını

- **Ön Yüz**: React 18, TypeScript, Tailwind CSS
- **Arka Yüz**: Supabase (Auth, Veritabanı, API)
- **Animasyonlar**: Framer Motion
- **İkonlar**: Lucide React
- **Yönlendirme**: React Router v6
- **Otomasyon**: n8n iş akışları
- **Ödemeler**: İyzico entegrasyonu

## Başlangıç

### Ön Koşullar
- Node.js 18+ 
- npm or yarn
- Supabase hesabı

### Kurulum

1. Depoyu klonlayın:
```bash
git clone <repository-url>
cd n8n-saas-platform
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Ortam değişkenlerini ayarlayın:
```bash
cp .env.example .env
```

4. Supabase kimlik bilgilerinizi `.env` dosyasına ekleyin:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

## Veritabanı Şeması

Platform aşağıdaki ana tablolarla Supabase kullanır:

- `plans` - Özellikler ve fiyatlandırma ile abonelik planları
- `bots` - Mevcut otomasyon botları ve iş akışları
- `users` - Kullanıcı hesapları ve kimlik doğrulama
- `user_plans` - Kullanıcı abonelik ilişkileri
- `user_bots` - Tekil bot satın alımları ve erişim
- `payments` - Ödeme geçmişi ve işlemler
- `bot_logs` - Yürütme günlükleri ve analitik

## Proje Yapısı

```
src/
├── components/
│   ├── Auth/          # Kimlik doğrulama bileşenleri
│   ├── Dashboard/     # Kullanıcı panosu
│   ├── Landing/       # Ana sayfa
│   ├── Layout/        # Düzen bileşenleri
│   └── Plans/         # Abonelik planları
├── contexts/          # React bağlamları
├── lib/              # Yardımcı kütüphaneler
└── types/            # TypeScript türleri
```

## Özellik Yol Haritası

### Faz 1 (Mevcut)
- ✅ Kullanıcı kimlik doğrulama sistemi
- ✅ Fiyatlandırmalı ana sayfa
- ✅ Analitikli pano
- ✅ Abonelik planı seçimi
- ✅ Duyarlı tasarım

### Faz 2 (Yakında)
- 🔄 Bot mağazası
- 🔄 Ödeme entegrasyonu
- 🔄 Admin paneli
- 🔄 Bot yönetim arayüzü
- 🔄 OAuth entegrasyonları

### Faz 3 (Gelecek)
- 📋 n8n iş akışı entegrasyonu
- 📋 Gelişmiş analitik
- 📋 Çoklu dil desteği
- 📋 Mobil uygulama
- 📋 Kurumsal özellikler

## Katkıda Bulunma

1. Depoyu fork edin
2. Özellik dalı oluşturun
3. Değişikliklerinizi commit edin
4. Dala push edin
5. Pull Request oluşturun

## Lisans

Bu proje MIT Lisansı altında lisanslanmıştır.

## Destek

Destek için support@otomasyonmagazasi.com adresine e-posta gönderin veya Slack topluluğumuza katılın.