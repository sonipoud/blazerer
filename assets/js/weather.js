// variables 
var cities = [];
var cityFormEl = document.querySelector("#city-search-form");
var formInputEl = document.querySelector("#form-input");
var formSubmitEl = document.querySelector("#btn");
var forecastEl = document.querySelector("#forecast");
// var apiUrl = 
// var apiKey = 

// function to operate the search button 
var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = formInputEl.value.trim();

    if (city) {
        getUserRepos(city);
        formInputEl.value = "";
    } else {
        alert("please enter a name of a city");
    }
    console.log(event);

    saveSearchCities();
};

//function to save the searched cities in the local storage
var saveSearchCities = function () {
    localStorage.setItem("cities");
};

//function to fetch the apiUrl 

var getWeather = function () {
    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            displayWeather(data, city);
        });
    });
};

// function to displayWeather

var displayWeather = function() {
    
}


formInputEl.addEventListener("submit", formSubmitHandler);