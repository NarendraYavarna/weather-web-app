document.addEventListener("DOMContentLoaded", () => {
    const locationInput = document.getElementById("locationInput");
    const getWeatherBtn = document.getElementById("getWeatherBtn");
    const weatherData = document.getElementById("weatherData");
    const errorMessage = document.getElementById("errorMessage");
    const unitToggle = document.getElementById("unitToggle");

    getWeatherBtn.addEventListener("click", () => {
        const location = locationInput.value;
        const unit = unitToggle.value;
        const apiKey = "babc2a3d1a4c8289d75986af485eb9d4"; 
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`;

        // Make an AJAX request to the weather API
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.cod === "404") {
                    errorMessage.textContent = "Location not found. Please try again.";
                    weatherData.textContent = "";
                } else {
                    errorMessage.textContent = "";
                    const temperature = data.main.temp;
                    const humidity = data.main.humidity;
                    const windSpeed = data.wind.speed;
                    const weatherDescription = data.weather[0].description;

                    weatherData.innerHTML = `
                        <p>Temperature: ${temperature} &deg;${unit === "metric" ? "C" : "F"}</p>
                        <p>Humidity: ${humidity}%</p>
                        <p>Wind Speed: ${windSpeed} m/s</p>
                        <p>Description: ${weatherDescription}</p>
                    `;
                }
            })
            .catch((error) => {
                errorMessage.textContent = "An error occurred while fetching data. Please try again later.";
                weatherData.textContent = "";
            });
    });
});
