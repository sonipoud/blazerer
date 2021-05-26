

// variables 
var cities = [];
var cityFormEl = document.querySelector("#city-search-form");
var formInputEl = document.querySelector("#form-input");
var formSubmitEl = document.querySelector("#btn");
var forecastEl = document.querySelector("#forecast");
var createFiveDayEl = document.querySelector("#five-day-forecast");


// function to operate the search button 
var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = formInputEl.value;

    if (city) {
        formInputEl.value = "";
    } else {
        alert("please enter a name of a city");
    }

    getWeather(city);
};

//function to save the searched cities in the local storage
var saveSearchCities = function (city) {
    var savedCities = JSON.parse(localStorage.getItem("cities"));
    if (savedCities === null) {
        var array = [city]
        localStorage.setItem("cities", JSON.stringify(array));
    } else {
        savedCities.push(city);
        localStorage.setItem("cities", JSON.stringify(savedCities));
    }
};


//function to fetch the apiUrl 

var getWeather = function (city) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=384fed659b9ff3e7bd8ebc325dacf9b8`

    fetch(apiUrl)
        .then(function (response) {
            response.json().then(function (data) {
                console.log(data);
                displayWeather(data);
                saveSearchCities(data.name);
            });
        });
};

// function to displayWeather

var displayWeather = function (weather) {
    forecastEl.textContent = "";
    var cityName = document.createElement("h3");
    cityName.textContent = weather.name
    forecastEl.append(cityName);

    //function to create a date next to the city
    var currentDate = document.createElement("span")
    currentDate.textContent = "(" + moment().format("MMMM Do, YYYY") + ")";
    forecastEl.append(currentDate);

    //function to put an icon next to the date
    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`);
    forecastEl.append(weatherIcon);

    //function to create a temperature data
    var temperature = document.createElement("span")
    temperature.textContent = "Temperature: " + weather.main.temp + "°F";
    temperature.classList = "list-group-item"
    forecastEl.append(temperature);

    //function to create the humidity data
    var humidity = document.createElement("span")
    humidity.textContent = "Humidity:" + weather.main.humidity + "%";
    humidity.classList = "list-group-item"
    forecastEl.append(humidity);

    //function to create wind speed
    var windSpeed = document.createElement("span")
    windSpeed.textContent = "Wind Speed:" + weather.wind.speed + "MPH"
    windSpeed.classList = "list-group-item"
    forecastEl.append(windSpeed);

    uvIndex(weather);

};

//function to create the UV Index
var uvIndex = function (weather) {
    var URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${weather.coord.lat}&lon=${weather.coord.lon}&appid=384fed659b9ff3e7bd8ebc325dacf9b8`
    fetch(URL)
        .then(function (response) {
            response.json()
            .then(function (weather) {
                console.log(weather);
                displayUvIndex(weather);
            });
        });
}

// function to display UV Index
var displayUvIndex = function (index) {
    var uvIndex = document.createElement("div");
    uvIndex.textContent = "UV Index:"
    // + weather.current.uvi
    uvIndex.classList = "List-group-item"

    uvIndexValue = document.createElement("span")
    uvIndexValue.textContent = index.value

    uvIndex.append(uvIndexValue);
    forecastEl.append(uvIndex);
}

// //function to create 5 day forecast 
var get5Day = function (city) {
    var api = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=384fed659b9ff3e7bd8ebc325dacf9b8`
    fetch(api)
        .then(function (response) {
            return response.json()
        })
        .then(function (weather) {
            console.log(weather);
            // display5Day(data);
        });

}

get5Day("denver");


// var display5Day = function (weather) {
//     createFiveDayEl.textContent = ""
//     var fiveDay = document.createElement("h5")
//     fiveDay.textContent = "5-Day Forecast:";
//     console.log(weather);
//     createFiveDayEl.append(fiveDay);

//     var forecast = weather.list;
//     for (var i = 5; i < forecast.length; i = i + 8) {
//         var dailyForecast = forecast[i];

//         var createFiveDayEl = document.createElement("div");
//         createFiveDayEl.classList = "card bg-primary text-ligh m-2";


//         //function to create a date next to the city
//         var forecastDate = document.createElement("h6")
//         forecastDate.textContent = "(" + moment().format("MMMM Do, YYYY") + ")";
//         forecastDate.classList = "card-header text-center"
//         createFiveDayEl.append(forecastDate);

//         //function to put an icon next to the date
//         var forecastWeatherIcon = document.createElement("img")
//         forecastWeatherIcon.setAttribute("src", `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`);
//         forecastWeatherIcon.classList = "card-header text-center"
//         createFiveDayEl.append(forecastWeatherIcon);


//         //function to create a temperature data
//         var forecastTemperature = document.createElement("span")
//         forecastTemperature.textContent = "Temperature: " + weather.main.temp + "°F";
//         forecastTemperature.classList = "card-header text-center"
//         createFiveDayEl.append(forecastTemperature);

//         //function to create the humidity data
//         var forecastHumidity = document.createElement("span")
//         forecastHumidity.textContent = "Humidity:" + weather.main.humidity + "%";
//         forecastHumidity.classList = "card-header text-center"
//         createFiveDayEl.append(forecastHumidity);

//         //function to create wind speed
//         var forecastWindSpeed = document.createElement("span")
//         forecastWindSpeed.textContent = "Wind Speed:" + weather.wind.speed + "MPH"
//         forecastWindSpeed.classList = "card-header text-center"
//         createFiveDayEl.append(forecastWindSpeed);
//     };
// };

formSubmitEl.addEventListener("click", formSubmitHandler);