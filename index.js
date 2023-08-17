const apiKey = 'bc2694e9b8413e8734c308612536b66a';
const weatherDataElm = document.querySelector('.weather-data');
const cityInputElm = document.querySelector('.city-input');
const containerElm = document.querySelector('.container');
// console.log(weatherDataElm);
const formElm = document.querySelector('form');

formElm.addEventListener('submit', (event) => {
  event.preventDefault();
  const cityName = cityInputElm.value;
  console.log(cityName);
  getWeatherData(cityName);
});

async function getWeatherData(cityName) {
  try {
    const responce = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    );
    if (!responce.ok) throw new Error('Network response was not ok.');
    const data = await responce.json();
    console.log(data);

    const city = data.name;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}°C`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed}m/s`,
    ];

    weatherDataElm.querySelector('.city-name').textContent = city;
    weatherDataElm.querySelector('.icon').innerHTML = `<img
    src="https://openweathermap.org/img/wn/${icon}@2x.png"
    alt="Weather icon"
    />`;

    weatherDataElm.querySelector(
      '.temperature'
    ).textContent = `${temperature}°C`;
    weatherDataElm.querySelector('.description').textContent = description;
    weatherDataElm.querySelector('.details').innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join('');
  } catch (error) {
    weatherDataElm.querySelector('.city-name').textContent = '';
    weatherDataElm.querySelector('.icon').innerHTML = '';

    weatherDataElm.querySelector('.temperature').textContent = '';
    weatherDataElm.querySelector('.description').textContent =
      'Error: Please enter correct city name.';
    weatherDataElm.querySelector('.details').innerHTML = '';
  }
}
