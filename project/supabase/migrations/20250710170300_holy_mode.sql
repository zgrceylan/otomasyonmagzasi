/*
  # İlk Veri Ekleme

  1. Botlar
    - Data Collector
    - CRM Bot
    - Meeting Summarizer
    - Instagram DM
    - Support Bot
    - Lead Generator
    - Email Responder
    - WhatsApp Bot
    - Google Maps Data Collector & Mailer

  2. Planlar
    - Starter (₺5.000/ay)
    - Growth (₺12.000/ay)
    - Enterprise (₺25.000/ay)

  3. Plan-Bot İlişkileri
*/

-- Botları ekle
INSERT INTO bots (name, description, category, is_active) VALUES
('Data Collector', 'Çeşitli kaynaklardan veri toplama ve analiz etme botu', 'Veri İşleme', true),
('CRM Bot', 'Müşteri ilişkileri yönetimi ve takip botu', 'CRM', true),
('Meeting Summarizer', 'Toplantı kayıtlarını özetleme ve raporlama botu', 'Üretkenlik', true),
('Instagram DM', 'Instagram direkt mesaj otomasyonu botu', 'Sosyal Medya', true),
('Support Bot', 'Müşteri destek ve canlı chat botu', 'Müşteri Hizmetleri', true),
('Lead Generator', 'Potansiyel müşteri bulma ve nitelendirme botu', 'Satış', true),
('Email Responder', 'Otomatik e-posta yanıtlama ve takip botu', 'E-posta', true),
('WhatsApp Bot', 'WhatsApp mesajlaşma otomasyonu botu', 'Mesajlaşma', true),
('Google Maps Data Collector & Mailer', 'Google Maps veri toplama ve e-posta gönderme botu', 'Veri İşleme', true);

-- Planları ekle
INSERT INTO plans (name, description, price, features, sort_order, is_active) VALUES
(
  'Starter',
  'Küçük işletmeler ve bireysel kullanıcılar için ideal başlangıç paketi',
  5000.00,
  '["Temel analitik", "E-posta desteği", "Aylık 1.000 işlem", "2 entegrasyon"]'::jsonb,
  1,
  true
),
(
  'Growth',
  'Büyüyen işletmeler için gelişmiş özellikler ve daha fazla kapasite',
  12000.00,
  '["Gelişmiş analitik", "Öncelikli destek", "Aylık 10.000 işlem", "5 entegrasyon", "Özel raporlar"]'::jsonb,
  2,
  true
),
(
  'Enterprise',
  'Büyük organizasyonlar için sınırsız kapasite ve premium özellikler',
  25000.00,
  '["Premium analitik", "7/24 destek", "Sınırsız işlem", "Sınırsız entegrasyon", "Özel raporlar", "API erişimi", "Özel entegrasyonlar"]'::jsonb,
  3,
  true
);

-- Plan-Bot ilişkilerini ekle
WITH plan_data AS (
  SELECT id, name FROM plans
),
bot_data AS (
  SELECT id, name FROM bots
)
INSERT INTO plan_bots (plan_id, bot_id)
SELECT 
  p.id,
  b.id
FROM plan_data p
CROSS JOIN bot_data b
WHERE 
  -- Starter planı: Data Collector, CRM Bot
  (p.name = 'Starter' AND b.name IN ('Data Collector', 'CRM Bot'))
  OR
  -- Growth planı: Starter + Meeting Summarizer, Instagram DM, Support Bot
  (p.name = 'Growth' AND b.name IN ('Data Collector', 'CRM Bot', 'Meeting Summarizer', 'Instagram DM', 'Support Bot'))
  OR
  -- Enterprise planı: Growth + Lead Generator, Email Responder, WhatsApp Bot, Google Maps Data Collector & Mailer
  (p.name = 'Enterprise' AND b.name IN ('Data Collector', 'CRM Bot', 'Meeting Summarizer', 'Instagram DM', 'Support Bot', 'Lead Generator', 'Email Responder', 'WhatsApp Bot', 'Google Maps Data Collector & Mailer'));