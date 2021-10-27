var weatherContainer = document.getElementById("weather-container");
var searchBtn = document.getElementById("search-btn");
var locationWeatherInput = document.getElementById("search-input");
var savedWeatherSearches = document.getElementById("savedWeatherSearches");
var deleteEl = document.getElementById("deleteSearches");
var forecastLocationSearch = document.getElementById("location-name");
var campgroundEl = document.getElementById("campgrounds");



var campgrounds = function (location) {
    var campGroundsApi = "https://uofa21cors.herokuapp.com/https://developer.nps.gov/api/v1/parks?limit=50&q=" + location + "&api_key=wJ0ECezrJisOCmFcOdhw4VEfEMk78O1ZRb0gPC6w"

    fetch(campGroundsApi)
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(json => {
            console.log("campground", json);

            campgroundEl.innerHTML="";
            
            for (let i = 0; i < json.data.length; i++) {
                console.log(json.data[i].fullName);
                var parentCampground= document.createElement("div");
                parentCampground.classList.add("cell", "large-4");
                
                var campgroundName = document.createElement("p");
                campgroundName.textContent = json.data[i].fullName;
                campgroundName.classList.add("campText");
                parentCampground.appendChild(campgroundName);
                
                var natParkAdd = document.createElement("p");
                var campGroundAdd = json.data[i].addresses[0];
                natParkAdd.textContent = campGroundAdd.line1 + " " + campGroundAdd.city + ", " + campGroundAdd.stateCode + " " + campGroundAdd.postalCode;
                console.log(json.data[i].addresses[0]);
                parentCampground.appendChild(natParkAdd);
               

                var nationalParkImg = document.createElement("img");
                nationalParkImg.setAttribute("src", json.data[i].images[0].url)
                nationalParkImg.classList.add("natImg");
                parentCampground.appendChild(nationalParkImg);

                campgroundEl.appendChild(parentCampground);
            }
        })
        .catch (function (error) {
            console.log("error", error);
        });
}



//start of weather dashboard
var weatherFiveDayForecast = function (latitude, longitude) {
        var weatherApi = "https://api.openweathermap.org/data/2.5/onecall?&lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly&appid=5c71643f7754882962dd3859f2f84f94&units=imperial"

        fetch(weatherApi)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log("latlong", data);

                for (var i = 0; i < 5; i++) {
                    var dateList = document.getElementById(`date${i + 1}`)
                    dateList.innerHTML = "";

                    var dayList = document.getElementById(`day${i + 1}`);
                    dayList.innerHTML = "";

                    var dateInfo = document.createElement("div")
                    var dateItem = new Date(data.daily[i].dt * 1000).toLocaleDateString("en-US");
                    dateInfo.textContent = dateItem;
                    document.getElementById(`date${i + 1}`).appendChild(dateInfo);
                    console.log(dateItem);

                    var currentWeatherIconUrl = `https://openweathermap.org/img/w/${data.current.weather[0].icon}.png`
                    console.log(currentWeatherIconUrl);
                    var weatherIcon = document.createElement("img")
                    weatherIcon.setAttribute("src", currentWeatherIconUrl);
                    weatherIcon.classList.add("icon");
                    document.getElementById(`day${i + 1}`).appendChild(weatherIcon);

                    // create current weather
                    var currentTempMax = data.daily[i].temp.max;
                    // console.log(currentTemp);
                    var tempMax = document.createElement("p")
                    tempMax.textContent = "Tempature Max:" + " " + currentTempMax + " " + "°F";
                    document.getElementById(`day${i + 1}`).appendChild(tempMax);

                    var currentTempMin = data.daily[i].temp.min;
                    // console.log(currentTemp);
                    var tempMin = document.createElement("p")
                    tempMin.textContent = "Tempature Min:" + " " + currentTempMin + " " + "°F";
                    document.getElementById(`day${i + 1}`).appendChild(tempMin);

                    var currentHumidity = data.current.humidity;
                    // console.log(currentHumidity);
                    var humidity = document.createElement("p")
                    humidity.textContent = "Humidity:" + " " + currentHumidity + " " + "%";
                    document.getElementById(`day${i + 1}`).appendChild(humidity);

                    var currentWindSpeed = data.daily[i].wind_speed;
                    // console.log(currentWindSpeed);
                    var wind = document.createElement("p")
                    wind.textContent = "Wind Speed:" + " " + currentWindSpeed + " " + "MPH";
                    document.getElementById(`day${i + 1}`).appendChild(wind);

                    var currentUvi = data.daily[i].uvi;
                    // console.log(currentUvi);
                    var uvi = document.createElement("p");
                    uvi.textContent = "UV Index:" + " " + currentUvi;
                    if (currentUvi < 3) {
                        uvi.classList.add("favorable");
                    } else if (currentUvi < 7) {
                        uvi.classList.add("moderate");
                    } else {
                        uvi.classList.add("severe");
                    }
                    document.getElementById(`day${i + 1}`).appendChild(uvi);
                };
            })
    };

    var weatherByLocation = function (location) {
        var apiLatLon = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=5c71643f7754882962dd3859f2f84f94"

        fetch(apiLatLon)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log("weather", data);
                        var lat = data.coord.lat;
                        var lon = data.coord.lon;
                        console.log("this", lat, lon);
                        weatherFiveDayForecast(lat, lon);
                        forecastLocationSearch.textContent = location;
                    })
                }
            })
    };

    var saveWeatherResults = function (locationInput) {
        var savedWeatherCities = JSON.parse(localStorage.getItem("cities")) || [];
        savedWeatherCities.push(locationInput);
        localStorage.setItem("cities", JSON.stringify(savedWeatherCities));
        console.log("this", savedWeatherCities);
    };

    var displaySaveWeatherResults = function () {
        var savedWeatherCities = JSON.parse(localStorage.getItem("cities")) || [];
        for (var i = 0; i < savedWeatherCities.length; i++) {
            var weatherBtnLocation = document.createElement("button");
            weatherBtnLocation.textContent = savedWeatherCities[i];
            weatherBtnLocation.classList.add("button");
            weatherBtnLocation.addEventListener("click", function () {
                console.log("this is some text", this);
                weatherByLocation(this.textContent);
                campgrounds(this.textContent);

            });
            savedWeatherSearches.append(weatherBtnLocation);
        };
    };

    var updatedSaveWeatherResults = function (latestCity) {
        var weatherBtnLocation = document.createElement("button");
        weatherBtnLocation.textContent = latestCity;
        weatherBtnLocation.classList.add("button");
        weatherBtnLocation.addEventListener("click", function () {
            console.log("this is some text", this);
            weatherByLocation(this.textContent);
            campgrounds(this.textContent);

        });
        savedWeatherSearches.append(weatherBtnLocation);
    };

    var deleteSearches = function () {
        console.log("delete button clicked");
        localStorage.removeItem("cities");
        savedWeatherSearches.innerHTML = "";
    };

    displaySaveWeatherResults();
    searchBtn.addEventListener("click", function (event) {
        event.preventDefault();
        if (locationWeatherInput.value) {
            weatherByLocation(locationWeatherInput.value);
            saveWeatherResults(locationWeatherInput.value);
            updatedSaveWeatherResults(locationWeatherInput.value);
            campgrounds(locationWeatherInput.value);
        }
    });

    var ipAddress = function () {
        var apiIpAddress = "http://ip-api.com/json"

        fetch(apiIpAddress)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log("IP", data);
                weatherByLocation(data.city);
                updatedSaveWeatherResults(data.city);
                // ipAddressBtn();
                campgrounds(data.regionName);
            })
    };

    //End of weather dashboard code // 


    ipAddress();
    // searchBtn.addEventListener("click", parkSearch);
    deleteEl.addEventListener("click", deleteSearches);