function current() {
  let now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let date = now.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let current = document.querySelector("#current-date-time");
  current.innerHTML = `${day}, ${month} ${date}, ${hour}:${minute}`;
}
current();

function searchCity(position) {
  let apiKey = "c4da09db70d4a4fa1bab47ca68549026";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCity);
}

function displayWeather(response) {
  console.log(response);
  let currentTemp = document.querySelector("#temp-current");
  let currentFeel = document.querySelector("#feels-like");
  let currentHumidity = document.querySelector("#humidity");
  let currentConditions = document.querySelector("#conditions");
  let currentWind = document.querySelector("#wind");
  let currentWindGust = document.querySelector("#wind-gust");
  let iconElement = document.querySelector("#icon");
  currentTemp.innerHTML = Math.round(response.data.main.temp) + "°F";
  currentFeel.innerHTML = Math.round(response.data.main.feels_like);
  currentHumidity.innerHTML = Math.round(response.data.main.humidity);
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  currentWindGust.innerHTML = Math.round(response.data.wind.gust);
  currentConditions.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let cityTitle = document.querySelector("#entered-city");
  cityTitle.innerHTML = response.data.name;
  let searchInput = document.querySelector("city-search-input");
  searchInput.value = null;
}

function displayCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search-input");
  let apiKey = "c4da09db70d4a4fa1bab47ca68549026";
  let city = searchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", displayCurrentLocation);

let searchButton = document.querySelector("#city-search");
searchButton.addEventListener("submit", displayCity);
