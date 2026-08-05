# 🚀 T3 Yetkinlik Radarı & TEKNOFEST Bursiyer Portalı (MVP)

[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.3-646CFF.svg)](https://vitejs.dev/)
[![KVKK Compliant](https://img.shields.io/badge/KVKK-Compliant-success.svg)](#-siber-güvenlik-ve-kvkk-uyumu)

> **T3 Vakfı (Türkiye Teknoloji Takımı)** ve **TEKNOFEST (Milli Teknoloji Hamlesi)** vizyonuyla geliştirilmiş; doğal dil işleme, Cosine Similarity tabanlı vektör eşleştirme ve KVKK uyumlu gizlilik standartlarına sahip açık kaynak aday-proje eşleştirme platformu.

---

## 📸 Ekran Görüntüleri ve Arayüz Düzeni

| 🎯 Koordinatör Radarı & Vektör Eşleştirme | 📊 Analiz Grafiği & Matrisi |
|---|---|
| Yapay Zekâ doğal dil sorgusu ile anlık bursiyer eşleştirmesi. | 5 Boyutlu yetkinlik radarı matrisi ve S/A/B/C derece sıralaması. |

---

## 🌟 Öne Çıkan Özellikler

### 🎯 1. Koordinatör Yetkinlik Radarı
- **🤖 LLM Vektör Araması**: Claude API mimarisini simüle eden **Cosine Similarity** vektör arama algoritması.
- **⚡ Anlık Sorgu Örnekleri**: *"Veri analitiği yapabilen ve takım kaptanlığı yapmış biri"*, *"İHA/GKS otonom sistem tasarlamış React geliştiricisi"* vb.
- **🎛️ 3 Farklı Görünüm Modu**:
  - **🎴 Kart Görünümü**: Detaylı aday kartları ve AI eşleşme gerekçeleri.
  - **📊 Analiz Grafiği**: Uyum yüzdeleri, derecelendirmeler (🥇 S-Seviye, 🥈 A-Seviye, 🥉 B-Seviye) ve 5 boyutlu yetkinlik matrisi.
  - **📋 Liste Görünümü**: Kurumsal, yüksek yoğunluklu tablo görünümü.

### 🎓 2. Bursiyer Portalı
- **🔑 Kimlik Doğrulama**: Bursiyer giriş ve kayıt modülü.
- **📊 Kişisel Özeti & Rozetler**: Bursiyer rozetleri (🏆 Teknofest Derecesi, ⚡ React Master...) ve Yapay Zekâ profil sağlığı puanı.
- **📄 CV Yükleme Simulatorü**: Yüklenen CV metninden yetkinlik ayıklama ve radarda puan artışı simülasyonu.
- **💬 Topluluk Sohbet Odaları**: Bursiyerlerin kendi aralarında takımlaşabileceği canlı sohbet kanalları (`#teknofest-takim-arayanlar`, `#genel-sohbet`, `#yazilim-ve-ai`).

---

## 🔐 Siber Güvenlik ve KVKK Uyumu

 projenin veritabanı ve arayüz mimarisinde **KVKK (Kişisel Verilerin Korunması Kanunu)** ilkeleri esas alınmıştır:

- **📱 Telefon Maskeleme**: Adayların kişisel telefon numaraları ekranda `+90 532 *** 45 91` şeklinde otomatik olarak maskelenir.
- **🛡️ Veri İzolasyonu**: Firestore veritabanı şemasında hassas kişisel veriler (`private_info`) alt koleksiyonlarında izole edilmektedir.

---

## 🛠️ Teknoloji Yığını

- **Frontend**: React 18 (Hooks, Context/State)
- **Styling**: Tailwind CSS (Modern Kurumsal Dashboard Arayüzü)
- **Build Tool**: Vite 5
- **Icons & Branding**: Custom T3 Vakfı & TEKNOFEST SVG Vektör Logoları

---

## 📂 Proje Dizin Yapısı

```
t3-yetkinlik-radari/
├── public/                  # Statik Varlıklar
├── src/
│   ├── assets/              # Marka Logoları ve Görseller
│   ├── components/          # Modüler UI Bileşenleri
│   │   ├── CoordinatorRadar/# Koordinatör Radarı Modülleri
│   │   ├── BursiyerPortal/  # Bursiyer Portalı Modülleri
│   │   ├── AuthModal.jsx    # Giriş / Kayıt Modal
│   │   ├── Navbar.jsx       # Üst Header Navigasyonu
│   │   └── Footer.jsx       # Alt Bilgi Barı
│   ├── data/                # Mock Veri Setleri (Candidates & Chat)
│   ├── utils/               # AI Engine & Formatlayıcılar
│   ├── App.jsx              # Ana Uygulama Kabuğu
│   ├── index.css            # Tailwind & Global Tasarım Tokenları
│   └── main.jsx             # React Giriş Noktası
├── .gitignore
├── LICENSE                  # MIT Lisansı
├── README.md                # Proje Dokümantasyonu
├── package.json
└── vite.config.js
```

---

## 🚀 Hızlı Başlangıç & Kurulum

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları takip edin:

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/kullanici-adi/t3-yetkinlik-radari.git
cd t3-yetkinlik-radari
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Geliştirici Sunucusunu Başlatın
```bash
npm run dev
```

Uygulama otomatik olarak `http://localhost:3000` adresinde açılacaktır.

---

## 🤝 Katkıda Bulunma (Contributing)

Açık kaynak topluluk katkılarına açığız! Katkıda bulunmak için:

1. Bu depoyu Fork'layın (`fork`).
2. Yeni bir Özellik Dalı oluşturun (`git checkout -b ozellik/HarikaOzellik`).
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Harika özellik eklendi'`).
4. Dalınıza push edin (`git push origin ozellik/HarikaOzellik`).
5. Bir **Pull Request (PR)** açın.

---

## 📜 Lisans

Bu proje **MIT Lisansı** ile lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına göz atabilirsiniz.

---

<div center>
  <sub>T3 Vakfı Geliştirici Topluluğu & TEKNOFEST Gençliği Tarafından Sevgiyle Geliştirildi ❤️</sub>
</div>
