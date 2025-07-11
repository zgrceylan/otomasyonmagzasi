# GitHub'a Proje Yükleme Rehberi

Bu rehber, Otomasyon Mağazası projesini GitHub'a yüklemek için gerekli adımları içerir.

## Ön Koşullar

1. GitHub hesabınızın olması
2. Git'in bilgisayarınızda kurulu olması
3. GitHub'da yeni bir repository oluşturmuş olmanız

## Adım Adım Kurulum

### 1. Git Repository'sini Başlatın

```bash
git init
```

### 2. Dosyaları Git'e Ekleyin

```bash
git add .
```

### 3. İlk Commit'i Yapın

```bash
git commit -m "İlk commit: Otomasyon Mağazası projesi eklendi"
```

### 4. GitHub Repository'sini Remote Olarak Ekleyin

```bash
# REPOSITORY_URL'yi kendi GitHub repository URL'niz ile değiştirin
git remote add origin https://github.com/KULLANICI_ADI/REPOSITORY_ADI.git
```

### 5. Ana Branch'i Ayarlayın

```bash
git branch -M main
```

### 6. Projeyi GitHub'a Push Edin

```bash
git push -u origin main
```

## Örnek Komut Dizisi

Aşağıdaki komutları sırasıyla çalıştırarak projenizi GitHub'a yükleyebilirsiniz:

```bash
# 1. Git repository'sini başlat
git init

# 2. Tüm dosyaları ekle
git add .

# 3. İlk commit
git commit -m "İlk commit: Otomasyon Mağazası projesi eklendi"

# 4. GitHub repository'sini ekle (URL'yi değiştirin)
git remote add origin https://github.com/KULLANICI_ADI/otomasyon-magazasi.git

# 5. Ana branch'i ayarla
git branch -M main

# 6. GitHub'a push et
git push -u origin main
```

## Gelecekteki Güncellemeler İçin

Projenizde değişiklik yaptıktan sonra aşağıdaki komutları kullanarak güncellemeleri GitHub'a gönderebilirsiniz:

```bash
# Değişiklikleri ekle
git add .

# Commit yap
git commit -m "Açıklayıcı commit mesajı"

# GitHub'a gönder
git push
```

## Önemli Notlar

1. `.env` dosyası `.gitignore` içinde olduğu için GitHub'a yüklenmeyecek
2. `node_modules` klasörü de yüklenmeyecek
3. Supabase bilgilerinizi GitHub'da paylaşmayın
4. Repository'yi private yapmanızı öneririz

## Sorun Giderme

### Eğer "remote origin already exists" hatası alırsanız:

```bash
git remote remove origin
git remote add origin https://github.com/KULLANICI_ADI/REPOSITORY_ADI.git
```

### Eğer push sırasında authentication hatası alırsanız:

1. GitHub Personal Access Token oluşturun
2. Şifre yerine token'ı kullanın
3. Veya SSH key kullanın

## GitHub Actions (Opsiyonel)

Otomatik deployment için GitHub Actions kullanabilirsiniz. `.github/workflows` klasörü oluşturup CI/CD pipeline'ları ekleyebilirsiniz.