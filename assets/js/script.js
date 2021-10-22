var weatherContainer= document.getElementById("weather-container");


var campgrounds = function () {
    var api = "https://uofa21cors.herokuapp.com/https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=9WCGsbfRuKJ59gX4nTOcctunYzc9NzsK85Skbj5G"

    fetch(api)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
};





//start of weather dashboard
var weatherFiveDayForecast = function (latitude, longitude) {
 var weatherApi= "https://api.openweathermap.org/data/2.5/onecall?&lat=37.0902&lon=-95.7129&exclude=minutely,hourly&appid=5c71643f7754882962dd3859f2f84f94&units=imperial"

    fetch(weatherApi)
    .then(function (response){
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        for (var i = 0; i < 5; i++) {
            var dateInfo = document.createElement("div")
        var dateItem = new Date(data.daily[i].dt * 1000).toLocaleDateString("en-US");
        dateInfo.textContent = dateItem;
        dateInfo.classList.add("date");
        document.getElementById(`date${i + 1}`).appendChild(dateInfo);
        console.log(dateItem);

        var currentWeatherIconUrl = `https://openweathermap.org/img/w/${data.current.weather[0].icon}.png`
        console.log(currentWeatherIconUrl);
        var weatherIcon = document.createElement("img")
        weatherIcon.setAttribute("src", currentWeatherIconUrl);
        weatherIcon.classList.add("icon");
        document.getElementById(`day${i + 1}`).appendChild(weatherIcon);

        // create current weather
        var currentTemp = data.daily[i].temp.max;
        // console.log(currentTemp);
        var temp = document.createElement("p")
        temp.textContent = "Tempature:" + " " + currentTemp + " " + "°F";
        temp.classList.add("infoContent");
        document.getElementById(`day${i + 1}`).appendChild(temp);

        var currentHumidity = data.current.humidity;
        // console.log(currentHumidity);
        var humidity = document.createElement("p")
        humidity.textContent = "Humidity:" + " " + currentHumidity + " " + "%";
        humidity.classList.add("infoContent");
        document.getElementById(`day${i + 1}`).appendChild(humidity);
      

        var currentWindSpeed = data.daily[i].wind_speed;
        // console.log(currentWindSpeed);
        var wind = document.createElement("p")
        wind.textContent = "Wind Speed:" + " " + currentWindSpeed + " " + "MPH";
        wind.classList.add("infoContent");
        document.getElementById(`day${i + 1}`).appendChild(wind);

        var currentUvi = data.daily[i].uvi;
        // console.log(currentUvi);
        var uvi = document.createElement("p");
        uvi.classList.add("infoContent");
        uvi.textContent = "UV Index:" + " " + currentUvi;
        // if (currentUvi < 3) {
        //     uvi.classList.add("$green");
        // } else if (currentUvi < 7) {
        //     uvi.classList.add("$yellow");
        // } else {
        //     uvi.classList.add("$red");
        // }
        document.getElementById(`day${i + 1}`).appendChild(uvi);
    };
    })
};


weatherFiveDayForecast();

campgrounds();
