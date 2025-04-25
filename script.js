const apiKey = 'd3a29e59ebb1b0d6c22c9dfa4abfbb38'; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById('city').value;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    displayWeather(data);
}

function displayWeather(data) {
    const weatherDiv = document.getElementById('weather');
    if (data.cod === 200) {
        const temperature = data.main.temp;
        let imageUrl = '';

        if (temperature <= 15) {
            imageUrl = 'cool.jpg';
        } else if (temperature >= 30) {
            imageUrl = 'hot.jpg';
        } else {
            imageUrl = 'normal.jpg';
        }

        document.body.style.backgroundImage = `url('${imageUrl}')`;

        weatherDiv.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } else {
        weatherDiv.innerHTML = `<p>${data.message}</p>`;
    }
}
