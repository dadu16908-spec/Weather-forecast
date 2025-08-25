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


document.getElementById('alertForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const city = document.getElementById('alertInput').value.trim();
  const alertBox = document.getElementById('alertResult');
  if (!city) {
    alertBox.innerText = "Please enter a city name.";
    return;
}
  fetch(`https://api.openweathermap.org/data/2.5/weather?q={city}  appid={884a62625df9b03ab62852f989d8658d}`)
    .then(res => {
      if (!res.ok) throw new Error('City not found');
      return res.json();
    })
    .then(data => {
      if (data.alerts && data.alerts.length > 0) {
        alertBox.innerText = data.alerts[0].description;
      } else {
        alertBox.innerText = "No weather alerts for this location.";
      }
    })
    .catch(err => {
      alertBox.innerText = 'Error: ' + err.message;
       });
  });
   
    
const form = document.getElementById('search-form') ;
const cityInput = document.getElementById('city-input');
const forecastContainer = document.getElementById('forecast-container');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    fetch7DayForecast(city);
  }
});
async function fetch7DayForecast(city) {
  try {
    // Get city coordinates from current weather API
    const geoRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=city   appid={884a62625df9b03ab62852f989d8658d}`);
    if (!geoRes.ok) throw new Error("City not found") ;
    const geoData = await geoRes.json();
    const { lat, lon } = geoData.coord;
    // Fetch 7-day forecast using One Call API
    const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=lat   lon={lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=apiKey`);
    if (!forecastRes.ok) throw new Error("Failed to get forecast");
    const forecastData = await forecastRes.json();
    displayForecast(forecastData.daily, city);
  }
     catch(error){
    forecastContainer.innerHTML = `<p style="color: #f00; text-align:center;">{error.message}</p>`;
     }
}

function displayForecast(days, city) {
forecastContainer.innerHTML = `<h2 style="text-align:center; margin-bottom: 25px;">7-Day Forecast for city</h2>`;
  let html = "";
  // Only show next 7 days (including today)
  for (let i = 0; i < 7; i++){
    const day = days[i];
    const date = new Date (day.dt * 1000) ;
    const options ={ weekday: 'short', month: 'short', day: 'numeric'} ;
    const dayName = date.toLocaleDateString(undefined, options);
    const icon = day.weather[0].icon;
    const description = day.weather[0].description;
    const tempMin = Math.round(day.temp.min);
    const tempMax = Math.round(day.temp.max);
    html += `
      <div class="forecast-day">
        <h3>{dayName}</h3>
        <img class="forecast-icon" src="https://openweathermap.org/img/wn/icon@2x.png" alt="{description}" />
        <div class="temp">Max: tempMax°C</div>
        <div class="temp">Min:{tempMin}°C</div>
      </div>
    `;
  }
} 

  forecastContainer.innerHTML += html;

