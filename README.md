# myApp Projesi

**Sürüm:** 0.0.1

Bu proje, modern React Native uygulamaları geliştirmek için sağlam bir temel sunan, zengin özelliklere sahip bir başlangıç şablonudur. Bildirimler, güvenli veri saklama, OTP (Tek Kullanımlık Şifre) yönetimi ve gelişmiş UI bileşenleri gibi birçok hazır çözüm içerir.

## ✨ Öne Çıkan Özellikler

- **Push Bildirimleri:** Firebase Cloud Messaging (FCM) entegrasyonu ile uygulama açık, kapalı veya arka plandayken bildirim alabilme ve yönetebilme. Bildirimlere tıklandığında istenilen sayfaya yönlendirme (deep-linking).
- **Güvenli Veri Saklama:** Kullanıcı token'ları gibi hassas verileri cihazın güvenli depolama alanı olan Keychain (iOS) ve Keystore (Android) üzerinde saklama. Biyometrik (parmak izi/yüz tanıma) kimlik doğrulama desteği.
- **Otomatik OTP Okuma (Android):** Android cihazlarda SMS ile gelen tek kullanımlık şifreleri otomatik olarak okuyup ilgili alana dolduran yardımcı modül.
- **Gelişmiş Liste Bileşeni:** Kaydırarak yana menü açılabilen (`swipable`), aşağı kaydırdıkça yeni veri yükleyen (`infinite-scroll`) ve sayfayı yenilemek için aşağı çekilebilen (`pull-to-refresh`) gelişmiş `FlatList` bileşeni.
- **Dinamik Tipografi ve Vurgulama:** Uygulama genelinde tutarlı bir görünüm sağlayan, farklı font ve boyutları destekleyen `Typography` bileşeni. Arama sonuçlarında metinleri renklendirerek vurgulayan `Highlight` özelliği.
- **HTML İçerik Gösterimi:** `react-native-render-html` kullanılarak HTML içeriğini native bileşenlere dönüştürerek gösterme yeteneği.
- **Uluslararasılaştırma (i18n):** `i18n-js` ile çoklu dil desteği altyapısı (Türkçe ve İngilizce için hazır).
- **Yardımcı Fonksiyonlar:** Telefon numarası formatlama, isim-soyisim ayırma, metin kısaltma gibi sık kullanılan yardımcı fonksiyonlar.

## 🚀 Teknolojiler ve Kütüphaneler

Bu proje, güncel ve popüler kütüphaneler kullanılarak oluşturulmuştur.

### Ana Teknolojiler

- **React:** 19.1.1
- **React Native:** 0.82.1
- **Node.js:** >=20

### Bağımlılıklar (Dependencies)

| Kategori             | Kütüphane                                   | Sürüm   | Açıklama                                                  |
| -------------------- | ------------------------------------------- | ------- | --------------------------------------------------------- |
| **Navigasyon**       | `@react-navigation/native`                  | ^6.1.17 | Uygulama içi sayfa geçişleri için temel kütüphane.        |
|                      | `@react-navigation/stack`                   | ^6.3.29 | Stack (yığın) navigasyon yapısı.                          |
|                      | `@react-navigation/bottom-tabs`             | ^6.5.20 | Alt sekme menüsü navigasyonu.                             |
| **Bildirimler**      | `@react-native-firebase/app`                | ^20.1.0 | Firebase servislerinin temel entegrasyonu.                |
|                      | `@react-native-firebase/messaging`          | ^20.1.0 | Firebase Cloud Messaging (FCM) ile push bildirimleri.     |
|                      | `@notifee/react-native`                     | ^9.1.8  | Uygulama açıkken bildirimleri ekranda göstermek için.     |
| **Veri Saklama**     | `@react-native-async-storage/async-storage` | ^1.23.1 | Genel amaçlı asenkron veri saklama.                       |
|                      | `react-native-keychain`                     | ^10.0.0 | Hassas veriler için güvenli depolama (Keychain/Keystore). |
| **UI & Arayüz**      | `react-native-gesture-handler`              | ^2.16.2 | Gelişmiş dokunmatik hareketleri yönetimi.                 |
|                      | `react-native-reanimated`                   | ^3.15.0 | Akıcı animasyonlar için kütüphane.                        |
|                      | `react-native-screens`                      | ^3.31.1 | Navigasyon için native ekran optimizasyonu.               |
|                      | `react-native-safe-area-context`            | ^5.5.2  | Ekranın güvenli alanlarını yönetme.                       |
|                      | `react-native-modal`                        | ^13.0.1 | Gelişmiş modal (popup) bileşeni.                          |
|                      | `react-native-svg`                          | ^12.1.1 | SVG formatında vektörel çizimler için.                    |
|                      | `react-native-render-html`                  | ^6.3.4  | HTML içeriğini native bileşenlere dönüştürme.             |
| **Yardımcı Araçlar** | `axios`                                     | ^1.7.2  | HTTP istekleri için modern bir istemci.                   |
|                      | `moment`                                    | ^2.30.1 | Tarih ve saat işlemleri için.                             |
|                      | `i18n-js`                                   | ^4.4.3  | Çoklu dil desteği.                                        |
|                      | `react-native-permissions`                  | ^4.1.5  | Cihaz izinlerini (kamera, bildirim vb.) yönetme.          |
|                      | `react-native-fs`                           | ^2.15.0 | Cihazın dosya sistemine erişim.                           |
|                      | `react-hook-form`                           | ^7.51.5 | Performanslı ve esnek form yönetimi.                      |
| **Cihaz Donanımı**   | `react-native-camera`                       | ^4.2.1  | Kamera erişimi ve yönetimi.                               |
|                      | `react-native-image-crop-picker`            | ^0.41.1 | Resim galerisinden seçim yapma ve kırpma.                 |
|                      | `react-native-document-scanner-plugin`      | ^1.0.1  | Döküman tarama özelliği.                                  |

## 📂 Proje Yapısı

Proje, modüler ve ölçeklenebilir bir yapıda tasarlanmıştır.

```
myApp/
├── android/         # Android projesi
├── ios/             # iOS projesi
├── src/
│   ├── assets/      # Fontlar, resimler vb. statik dosyalar
│   ├── components/  # Tekrar kullanılabilir UI bileşenleri (Button, Typography, vb.)
│   ├── navigation/  # React Navigation konfigürasyonu
│   ├── screens/     # Uygulama ekranları
│   ├── services/    # API servisleri ve istemcileri
│   └── utils/       # Yardımcı fonksiyonlar, sabitler ve konfigürasyonlar (bildirim, depolama vb.)
├── app.json
└── package.json
```

## 🏁 Başlarken

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin.

### Gereksinimler

- Node.js (>= 20)
- Watchman (macOS için)
- React Native CLI (Kurulum için resmi dokümantasyonu takip edin)
- Xcode (iOS için)
- Android Studio (Android için)

### Kurulum

1.  **Projeyi klonlayın:**

    ```bash
    git clone <proje-repo-url>
    cd myApp
    ```

2.  **Bağımlılıkları yükleyin:**

    ```bash
    npm install
    ```

3.  **iOS için Pod'ları yükleyin:**
    ```bash
    npm run pod:install
    ```

### Uygulamayı Çalıştırma

- **Android için:**

  ```bash
  npm run android
  ```

- **iOS için:**
  ```bash
  npm run ios
  ```

## 🛠️ Kullanılabilir Script'ler

- `npm run lint`: Koddaki stil ve format hatalarını kontrol eder.
- `npm run lint:fix`: Bulunan stil hatalarını otomatik olarak düzeltir.
- `npm run prettier`: Kodu Prettier formatına göre düzenler.
- `npm test`: Jest ile yazılmış testleri çalıştırır.
- `npm run clean:android`: Android derleme önbelleğini temizler.
- `npm run clean:ios`: iOS derleme önbelleğini temizler.

---

Bu `README` dosyası, projenin anlaşılmasını ve yeni geliştiricilerin hızlıca adapte olmasını kolaylaştırmak amacıyla hazırlanmıştır.
