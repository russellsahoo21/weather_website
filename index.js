async function getWeather(city) {
    const apiKey = '5618118d4ace4a95b7e142244251001';  
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  
    try {
        const response = await fetch(url);  
        if (!response.ok) {  
            throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log(data);
  
        // Get weather info elements
        const weatherInfo = document.querySelector(".weather-info");
        const heading = document.getElementById("ans");
        
        // Weather icon mapping
        const iconMap = {
          'Sunny': '☀️',
          'Clear': '🌙',
          'Partly cloudy': '⛅',
          'Cloudy': '☁️',
          'Overcast': '☁️',
          'Mist': '🌫️',
          'Fog': '🌫️',
          'Light rain': '🌧️',
          'Moderate rain': '🌧️',
          'Heavy rain': '⛈️',
          'Light snow': '❄️',
          'Moderate snow': '❄️',
          'Heavy snow': '☃️',
          'Thunderstorm': '⚡'
        };
  
        // Get weather icon
        const condition = data.current.condition.text;
        const weatherIcon = iconMap[condition] || '🌈';
        
        // Update HTML with weather data
        weatherInfo.innerHTML = `
          <div class="weather-main" style="display: flex; flex-direction: column; align-items: center;">
          <div>
            <div class="weather-icon" style="font-size: 4rem;">${weatherIcon}</div>
            <div class="weather-temp">${data.current.temp_c}°C</div>
          </div>
          <div>
            <div class="weather-city">${city}</div>
          </div>
          <div class="weather-details">
          </div>
          <div>
        `;
  
    } catch (error) {
        console.error('Error fetching weather data:', error);
        const heading = document.getElementById("ans");
        heading.textContent = 'Error fetching weather data. Please try again.';
    }
  }
  
  // Add event listener to the button
  document.getElementById("submitButton").addEventListener("click", () => {
    const cit = document.getElementById("ans2").value.trim();
    if (cit) {
        getWeather(cit);
    } else {
        const heading = document.getElementById("ans");
        heading.textContent = 'Please enter a city name.';
    }
  });
  
  // Add event listener for Enter key
  document.getElementById("ans2").addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        const cit = document.getElementById("ans2").value.trim();
        if (cit) {
            getWeather(cit);
        }
    }
  });