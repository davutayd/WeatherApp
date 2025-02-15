const apiKey = "e79d1385cc6ee4b683ffc5c30a5ba943";
const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

async function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=tr`;
  // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`; günlük tahmin api

  try {
    const response = await fetch(apiUrl); //fetch fonksiyonu API'ye HTTP isteği gönderir ve sonuçları göndürür
    //fetch fonksiyonu Promise döndürür. Promise, bir işlemin başarılı olup olmadığını belirten bir nesnedir.
    //await anahtar kelimesi, bir Promise'in çözülmesini beklemek için kullanılır.
    if (!response.ok) {
      throw new Error("Şehir bulunamadı!");
    }

    const data = await response.json(); //API'den gelen veriyi JSON formatına dönüştürür
    displayForecast(data);
  } catch (error) { 
    weatherResult.innerHTML = `<p>${error.message}</p>`;
  }
}

//tahmin görütüleme
function displayForecast(data) {
  const cityName = data.city.name;
  const list = data.list;
  forecastResult.innerHTML = ` 
    <div class="forecast-header">
      <h2>${cityName} için 5 Günlük Hava Durumu</h2>
    </div>
    <div class="forecast-container"></div>`;
  const forecastContainer = document.querySelector(".forecast-container");

  for (let i = 0; i < list.length; i += 8) {
    const forecast = list[i];
    const date = new Date(forecast.dt * 1000).toLocaleDateString("tr-TR"); //Unix zaman damgasını tarih ve saat nesnesine dönüştürür
    const temp = Math.round(forecast.main.temp); //sıcaklık
    const description = forecast.weather[0].description; //hava durumu açıklaması
    const icon = forecast.weather[0].icon; //hava durumu ikonu

    forecastContainer.innerHTML += `
      <div class="forecast-item">
        <p><strong>${date}</strong></p>
        <p>${temp}°C</p>
        <p>${description}</p>
        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}">
      </div>
    `;
  }
}

searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim();

  forecastResult.innerHTML = "";
  errorMessage.innerHTML = "";
  if (!city) {
    errorMessage.innerHTML = "<p>Lütfen bir şehir adı giriniz</p>";
    return;
  }
  fetchWeatherData(city);
  cityInput.value = "";
});

window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showWeatherByLocation, showError);
  } else {
    weatherResult.innerHTML = "<p>Konum bilgisi alınamıyor.</p>";
  }
};

// Konum Bilgisine Göre Hava Durumu Getir
async function showWeatherByLocation(position) {
  const lat = position.coords.latitude; // Enlem
  const lon = position.coords.longitude; // Boylam
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=tr`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Konuma göre hava durumu alınamadı!");
    }

    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    weatherResult.innerHTML = `<p>${error.message}</p>`;
  }
}

// Hava Durumu Verilerini Göster
function displayWeatherData(data) {
  const city = data.name;
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description; 
  const icon = data.weather[0].icon; 

  weatherResult.innerHTML = `
    <h2>Konumunuza Göre Hava Durumu</h2>
    <h2>${city} </h2>
    <p>${temp}°C</p>
    <p> ${description}</p>
    <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}">
  `;
}

// Hata Mesajı Göster
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      weatherResult.innerHTML = "<p>Kullanıcı konum izni vermedi.</p>";
      break;
    case error.POSITION_UNAVAILABLE:
      weatherResult.innerHTML = "<p>Konum bilgisi alınamıyor.</p>";
      break;
    case error.TIMEOUT:
      weatherResult.innerHTML = "<p>Konum isteği zaman aşımına uğradı.</p>";
      break;
    default:
      weatherResult.innerHTML = "<p>Bilinmeyen bir hata oluştu.</p>";
  }
}
