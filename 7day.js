const apiKey = "87945bd9d22ad53ac6a7f6ea507cfcb6";
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
    const geoRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=city   appid={87945bd9d22ad53ac6a7f6ea507cfcb6});
    if (!geoRes.ok) throw new Error("City not found") ;
    const geoData = await geoRes.json();
    const { lat, lon } = geoData.coord;
    // Fetch 7-day forecast using One Call API
    const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=lat   lon={lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=appikey`);
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
