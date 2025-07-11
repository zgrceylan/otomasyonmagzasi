# GitHub'a Manuel Proje Yükleme

## Yöntem 1: Zip İndirip Git ile Yükle

1. **Projeyi İndir**: Bu Bolt projesini zip olarak indirin
2. **Zip'i Açın**: Bilgisayarınızda uygun bir klasöre açın
3. **Terminal/CMD Açın**: Proje klasöründe terminal açın
4. **Git Komutlarını Çalıştırın**:

```bash
# Git repository'sini başlat
git init

# Tüm dosyaları ekle
git add .

# İlk commit
git commit -m "İlk commit: Otomasyon Mağazası projesi eklendi"

# GitHub repository'sini ekle
git remote add origin https://github.com/zgrceylan/otomasyonmagzasi.git

# Ana branch'i ayarla
git branch -M main

# GitHub'a push et
git push -u origin main
```

## Yöntem 2: GitHub Web Arayüzü

1. https://github.com/zgrceylan/otomasyonmagzasi adresine gidin
2. "uploading an existing file" veya "Add file" > "Upload files" seçin
3. Tüm proje dosyalarını sürükle-bırak ile yükleyin
4. Commit mesajı yazın: "İlk commit: Otomasyon Mağazası projesi eklendi"
5. "Commit changes" butonuna tıklayın

## Yöntem 3: GitHub Desktop

1. GitHub Desktop uygulamasını indirin
2. "Clone a repository from the Internet" seçin
3. Repository URL'sini girin: https://github.com/zgrceylan/otomasyonmagzasi.git
4. Proje dosyalarını klonlanan klasöre kopyalayın
5. GitHub Desktop'ta değişiklikleri commit edin
6. "Push origin" butonuna tıklayın

## 📁 Yüklenecek Dosyalar Listesi

Aşağıdaki dosyaların tümünü yüklediğinizden emin olun:

### Ana Dosyalar
- `package.json`
- `package-lock.json`
- `index.html`
- `vite.config.ts`
- `tailwind.config.js`
- `postcss.config.js`
- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.node.json`
- `eslint.config.js`
- `README.md`
- `.env.example`

### Kaynak Kod Klasörü (src/)
- `src/main.tsx`
- `src/App.tsx`
- `src/index.css`
- `src/vite-env.d.ts`

### Bileşenler (src/components/)
- `src/components/Auth/LoginForm.tsx`
- `src/components/Auth/SignupForm.tsx`
- `src/components/Dashboard/Dashboard.tsx`
- `src/components/Landing/LandingPage.tsx`
- `src/components/Layout/Layout.tsx`
- `src/components/Layout/Header.tsx`
- `src/components/Layout/Sidebar.tsx`
- `src/components/Plans/PlansPage.tsx`
- `src/components/Plans/PlanCard.tsx`
- `src/components/Admin/AdminLayout.tsx`
- `src/components/Admin/PlanManagement.tsx`
- `src/components/Admin/BotManagement.tsx`

### Diğer Klasörler
- `src/contexts/AuthContext.tsx`
- `src/hooks/useAdmin.ts`
- `src/lib/supabase.ts`
- `src/types/database.ts`

### Supabase Migration'ları
- `supabase/migrations/20250710170220_shrill_meadow.sql`
- `supabase/migrations/20250710170300_holy_mode.sql`

## ⚠️ Önemli Notlar

1. **`.env` dosyasını yüklemeyin** - Bu dosya hassas bilgiler içerir
2. **`node_modules` klasörünü yüklemeyin** - Bu klasör çok büyük ve gerekli değil
3. **`.gitignore` dosyasını ekleyin** - Bu dosya hangi dosyaların yüklenmeyeceğini belirtir

## 🔒 Güvenlik

- Supabase anahtarlarınızı GitHub'da paylaşmayın
- Repository'yi private yapmanızı öneririz
- `.env.example` dosyasını yükleyin ama `.env` dosyasını yüklemeyin

## ✅ Başarı Kontrolü

Yükleme tamamlandıktan sonra:
1. GitHub repository sayfanızı yenileyin
2. Tüm dosyaların listelendiğini kontrol edin
3. README.md dosyasının düzgün görüntülendiğini kontrol edin
4. Commit geçmişinin oluştuğunu kontrol edin