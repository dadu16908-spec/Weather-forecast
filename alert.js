const apiKey = "9dfe52a23cb18fd5dd56453c28fe2710";
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
   
