# Hava Durumu Uygulaması

Bu uygulama, kullanıcının girdiği şehir adı veya konumuna göre hava durumu bilgilerini sunan bir hava durumu tahmin uygulamasıdır. OpenWeather API'si kullanılarak 5 günlük hava tahmini verileri elde edilir. Uygulama, şehir adı sorgusu ile hava durumu bilgilerini gösterir ve kullanıcının konumuna göre anlık hava durumu tahminini sağlar.

## Özellikler

- **Konuma göre hava durumu:** Uygulama, kullanıcının mevcut konumunu kullanarak hava durumu bilgisi sunar.
- **5 Günlük hava tahmini:** Kullanıcıya, 5 günlük hava durumu tahmini verileri gösterilir.
- **Hava Durumu Simgeleri ve Açıklamaları:** Hava durumu simgeleri ve açıklamaları görsel olarak sunulur.

## Kullanılan Teknolojiler

- **HTML:** Yapısal elemanları oluşturmak için.
- **CSS:** Uygulamanın görsel stilini oluşturmak için.
- **JavaScript:** API'den veri çekmek ve kullanıcı etkileşimlerini yönetmek için.
- **OpenWeather API:** Hava durumu verilerini almak için.

## Kurulum

**1. Projenin Klonlanması**
Öncelikle projeyi bilgisayarınıza klonlayın:

```bash
git clone https://github.com/davutayd/weather-app.git
```

**2. API Anahtarınızı alın:**
OpenWeather API kullanarak hava durumu verilerini almak için bir API anahtarına ihtiyacınız olacak. [OpenWeather API](https://openweathermap.org/api) sitesinden ücretsiz bir API anahtarı alabilirsiniz.

**3. API Anahtarınızı Ekleyin:**
`app.js` dosyasındaki `apiKey` değişkenine aldığınız API anahtarını ekleyin:

```javascript
const apiKey = "API_KEY";
```

**4. Uygulamayı Çalıştırın:**
Web tarayıcınızda uygulamayı açmak için, projenin bulunduğu dizinde `index.html` dosyasını açabilirsiniz.

## Kullanım

**1. Konumunuza Göre Hava Durumu:** Sayfa yüklendiğinde, kullanıcıdan konum izni istenir. İzin verildiğinde, kullanıcı konumuna göre anlık hava durumu bilgisi gösterilir.
**2. 5 Günlük Hava Tahmini:** Sayfada, kullanıcının konumuna göre 5 günlük hava durumu tahmini görüntülenir.

![Proje Resim](https://imgur.com/a/8ylbMbw)
