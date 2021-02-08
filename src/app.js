function showTime(datetime) { 
    let now = new Date(datetime);
    let minute = now.getMinutes();
    if (minute < 10) { 
        minute = `0${minute}`;
    } 
    let hour = now.getHours();
    let amPm = "AM";
    if (hour > 12) {
        amPm = "PM"
    }
    convertHour();

    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = days[now.getDay()];
    let date = now.getDate();
    let months = ["Jan","Feb","Mar","Apr", "May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let month = months[now.getMonth()];
    let year = now.getFullYear();

    document.querySelector("#clock").innerHTML = `${hour}:${minute}`;
    document.querySelector("#day").innerHTML = day; 
    document.querySelector("#date").innerHTML = `${date} ${month} ${year}`;
    document.querySelector("#amPm").innerHTML = amPm;

    function convertHour() {
    if (hour <= 9) {
      hour = `0${hour}`;
    } else if (hour > 9 && hour <= 12) {
      return hour;
    } else {
      hour = hour - 12;
      hour = `0${hour}`;
    }
  }

}

let celcius = null;
let celciousFeelsLike = null;
let fahrenheit = null;
let fahrenheitFeelsLike = null;
let unit = null;

function showTemperature(response) {  
    let city = response.data.name;
    let country = response.data.sys.country;
    let temp = response.data.main.temp;
    let description = response.data.weather[0].description;
    let cloudines = Math.round(response.data.clouds.all);
    let wind = Math.round(response.data.wind.speed);
    let humidity = Math.round(response.data.main.humidity);
    let feelsLike = response.data.main.feels_like;
    let icon = response.data.weather[0].icon;
    showTime(new Date(response.data.dt * 1000));
  
  celcius = temp;
  celciousFeelsLike = feelsLike;
  fahrenheit = temp;
  fahrenheitFeelsLike = feelsLike;

    document.querySelector("#temperature").innerHTML = Math.round(temp);
    document.querySelector("#city").innerHTML = `${city}, ${country}`;
    document.querySelector("#description").innerHTML = description;
    document.querySelector("#cloudines").innerHTML = cloudines;
    document.querySelector("#wind").innerHTML = wind;
    document.querySelector("#humidity").innerHTML = humidity;
    document.querySelector("#feels-like").innerHTML = Math.round(feelsLike);
    document.querySelector("#icon").setAttribute("src", `images/${icon}@2x.png`);
    document.querySelector("#icon").setAttribute("alt", description); 
}


function searchCity(city) {
    if (celciusLink.classList.value === "active" ) {
    unit = "metric";
    celciusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
     } else {
    unit = "imperial";
    celciusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
  }
      
  let apiKey = "125089b53f00feddd6fbd602dc6cec7a";
  let targetUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${targetUrl}q=${city}&units=${unit}&appid=${apiKey}`;
  
  axios.get(apiUrl).then(showTemperature);
}

function showPosition(position) { 
  
    if (celciusLink.classList.value === "active" ) {
    unit = "metric";
    celciusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
     } else {
    unit = "imperial";
    celciusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
  }

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "125089b53f00feddd6fbd602dc6cec7a";
  let targetUrl = "https://api.openweathermap.org/data/2.5/weather?"; 
  let apiUrl = `${targetUrl}lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
  
  axios.get(apiUrl).then(showTemperature);
}

function searchCurrentLocation() { 
  navigator.geolocation.getCurrentPosition(showPosition);
}
document.querySelector("#currentLocation").addEventListener("click", searchCurrentLocation);


function handleClick(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;

  searchCity(city);
}
document.querySelector("#search-form").addEventListener("submit", handleClick);



function convertToFahrenheit(event) {
  event.preventDefault();
  fahrenheit = (celcius * 9 / 5) + 32;
  fahrenheitFeelsLike = (celciousFeelsLike * 9 / 5) + 32;
  document.querySelector("#temperature").innerHTML = Math.round(fahrenheit); 
  document.querySelector("#feels-like").innerHTML = Math.round(fahrenheitFeelsLike);
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}
let fahrenheitLink = document.querySelector("#toFahrenheit")
fahrenheitLink.addEventListener("click", convertToFahrenheit)

function convertToCelcius(event) {
  event.preventDefault();
  celcius = (fahrenheit - 32) * 5 / 9;
  celciousFeelsLike = (fahrenheitFeelsLike - 32) * 5 / 9;
  document.querySelector("#temperature").innerHTML = Math.round(celcius);
  document.querySelector("#feels-like").innerHTML = Math.round(celciousFeelsLike) ;
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
}
let celciusLink = document.querySelector("#toCelcius")
celciusLink.addEventListener("click", convertToCelcius);

function searchCities(event) { 
  event.preventDefault();
  let targetCity = event.target.innerHTML;
 
  searchCity(targetCity); 
}
document.querySelector("#jakarta").addEventListener("click", searchCities);
document.querySelector("#london").addEventListener("click", searchCities);
document.querySelector("#paris").addEventListener("click", searchCities);
document.querySelector("#newyork").addEventListener("click", searchCities);
document.querySelector("#sanfrancisco").addEventListener("click", searchCities);

//default
searchCity("Jakarta");