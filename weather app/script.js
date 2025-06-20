// script.js
const apiKey = "909dee51fe87afb926b87a052e265e35"; // Replace with your real OpenWeatherMap API key

document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("Please enter a city name");

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) {
        document.getElementById("weatherResult").innerHTML = `<p>${data.message}</p>`;
        return;
      }

      const weatherHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
        <p>🌡️ ${data.main.temp}°C</p>
      `;
      document.getElementById("weatherResult").innerHTML = weatherHTML;
    })
    .catch(err => {
      console.error(err);
      alert("Failed to fetch weather data");
    });
});
