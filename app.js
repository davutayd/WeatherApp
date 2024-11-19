const apiKey = "e79d1385cc6ee4b683ffc5c30a5ba943";
const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    weatherResultREsult.innerHTML = "<p>Lütfen bir şehir adı giriniz </p>";
    return;
  }
  fetchWeatherData(city);
  cityInput = "";
});

async function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Şehir bulunamadı!");
    }

    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    weatherResult.innerHTML = "<p>${error.message} </p>";
  }
}

function displayWeatherData(data) {
  const { name, main, weather } = data;
  const temperature = main.temp;
  const description = weather[0].description;
  const icon = weather[0].icon;

  weatherResult.innerHTML = `
        <h2>${name}</h2>
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
        <p>${description}</p>
        <p>Sıcaklık: ${temperature}°C</p>
    `;
}
