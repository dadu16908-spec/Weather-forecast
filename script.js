const apiKey = "884a62625df9b03ab62852f989d8658d";
document.getElementById('searchForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const city = document.getElementById('cityInput').value.trim();
  if (city === '') {
    alert('Please enter a city name');
    return
  };
  fetch(`https://api.openweathermap.org/data/2.5/weather?q={city} appid={884a62625df9b03ab62852f989d8658d}&units=metric`) 
    .then(response => {
      if (!response.ok) throw new Error('City not found');
      return response.json();
    })
    .then(data => {
      document.getElementById('weatherResult').innerHTML = `
        <h2>Weather in data.name</h2>
        <p>Temperature:{data.main.temp} °C</p>
        <p>Condition: data.weather[0].description</p>
      `;
    })
    .catch(error =>{
      document.getElementById('weatherResult').innerHTML = `<p>{error.message}</p>`
    });
  });

