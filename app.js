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
  forecastResult.innerHTML = `<h2>${cityName} için 5 Günlük Hava Durumu</h2>`;

  for (let i = 0; i < list.length; i += 8) {
    const forecast = list[i];
    const date = new Date(forecast.dt * 1000).toLocaleDateString("tr-TR"); //Unix zaman damgasını tarih ve saat nesnesine dönüştürür
    const temp = forecast.main.temp; //sıcaklık
    const description = forecast.weather[0].description; //hava durumu açıklaması
    const icon = forecast.weather[0].icon; //hava durumu ikonu

    forecastResult.innerHTML += `
      <div>
        <p><strong>${date}</strong></p>
        <p>Sıcaklık: ${temp}°C</p>
        <p>Durum: ${description}</p>
        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}">
      </div>
    `;
  }
}

searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    weatherResult.innerHTML = "<p>Lütfen bir şehir adı giriniz</p>";
    return;
  }
  fetchWeatherData(city);
  cityInput.value = "";
});
