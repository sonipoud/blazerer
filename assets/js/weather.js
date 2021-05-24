

// variables 
var cities = [];
var cityFormEl = document.querySelector("#city-search-form");
var formInputEl = document.querySelector("#form-input");
var formSubmitEl = document.querySelector("#btn");
var forecastEl = document.querySelector("#forecast");
var citySearchEl = document.querySelector("#searched-city");


// function to operate the search button 
var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = formInputEl.value;

    if (city) {
        // getUserRepos(city);
        formInputEl.value = "";
    } else {
        alert("please enter a name of a city");
    }
    console.log(city);

    saveSearchCities();
};

//function to save the searched cities in the local storage
var saveSearchCities = function () {
    localStorage.setItem("cities", JSON.stringify(cities));
};

//function to fetch the apiUrl 

var getWeather = function (city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={384fed659b9ff3e7bd8ebc325dacf9b8}'
    fetch(apiUrl)
    .then(function (response){
        response.json().then(function (data) {
             console.log(data);
            displayWeather(data, city);
        });
    });

};

// function to displayWeather

var displayWeather = function (weather) {
forecastEl.textContent="";
// console.log(weather);


//function to create a date next to the city
var currentDate = document.createElement()
currentDate.textContent = moment().format("MMMM Do YYYY");
citySearchEl.appendChild(currentDate);

//function to put an icon next to the date

//function to create a temperature data

//function to create the humidity data

//function to create the UV index


};

//function to create 5 day forecast 




formSubmitEl.addEventListener("click", formSubmitHandler);