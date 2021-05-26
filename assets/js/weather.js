

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
    // console.log(weather);

    //function to create a date next to the city
    var currentDate = document.createElement("h5")
    currentDate.textContent = moment().format("MMMM Do YYYY");
    forecastEl.appendChild(currentDate);

    //function to put an icon next to the date
    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`);
    forecastEl.append(weatherIcon);

    //function to create a temperature data

    //function to create the humidity data

    //function to create wind speed

    //function to create the UV index
    var URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${weather.coord.lat}&lon=${weather.coord.lon}&appid=384fed659b9ff3e7bd8ebc325dacf9b8`
    fetch(URL)
        .then(function (response) {
            response.json().then(function (weather) {
                
                console.log(weather);
            
            });
        });

};

//function to create 5 day forecast 

// var get5Day = function (city) {
//     var apiUrl = '';
//     fetch(apiUrl)
//         .then(function (response) {
//             response.json().then(function (data) {
//                 console.log(data);
//                 display5Day(data);
//             });
//         });
// }

// var display5Day = function (weather) {
// createFiveDayEl.textContent = ""

// }




formSubmitEl.addEventListener("click", formSubmitHandler);