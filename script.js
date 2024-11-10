document.getElementById("getWeather").addEventListener("click", function() {
    const city = document.getElementById("cityInput").value;
    if(city == "") {
        document.getElementById("weatherResult").innerHTML = "Please enter a city name";
        return;
    }
        
    const apiKey = "2c11e0fedd057445e87df76c9cdcb2b0"; //API KEY OF OPEANWEATHERMAP
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(weatherUrl)
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

        
            fetchCityImage(cityName);
        })
        .catch(error => {
            document.getElementById("weatherResult").innerHTML = `<p>${error.message}</p>`;
        });
});


function fetchCityImage(city) {
    const unsplashApiKey = "7anJR0qf1mk30cnIprceBXC1azCkU0IthI1S71Tz-b8"; //API KEY OF Unsplash
    const unsplashUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(city)}&client_id=${unsplashApiKey}&per_page=1`;

    fetch(unsplashUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);  

            if (data.results && data.results.length > 0) {
                const imageUrl = data.results[0].urls.regular;
                document.getElementById("cityImage").innerHTML = `<img src="${imageUrl}" alt="Image of ${city}" />`;
            } else {
                document.getElementById("cityImage").innerHTML = `<p>No image found for this city.</p>`;
            }
        })
        .catch(error => {
            document.getElementById("cityImage").innerHTML = `<p>Could not fetch image: ${error.message}</p>`;
        });
}
