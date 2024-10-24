document.getElementById("getWeather").addEventListener("click", function() {
    const city = document.getElementById("cityInput").value;
    if(city==""){
        document.getElementById("weatherResult").innerHTML = "Invalid Input";
        return;
    }
        
    const apiKey ="2c11e0fedd057445e87df76c9cdcb2b0"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const cityName = data.name;

            document.getElementById("weatherResult").innerHTML = `
                <h2>Weather in ${cityName}</h2>
                <p>Temperature: ${temperature} °C</p>
                <p>Description: ${weatherDescription}</p>
            `;
        })
        .catch(error => {
            document.getElementById("weatherResult").innerHTML = `<p>${error.message}</p>`;
        });
});
