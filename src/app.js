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

function showTemperature(response) {  
    let city = response.data.name;
    let country = response.data.sys.country;
    let temp = Math.round(response.data.main.temp);
    let description = response.data.weather[0].description;
    let cloudines = Math.round(response.data.clouds.all);
    let wind = Math.round(response.data.wind.speed);
    let humidity = Math.round(response.data.main.humidity);
    let feelsLike = Math.round(response.data.main.feels_like);
    let icon = response.data.weather[0].icon;
    showTime(new Date(response.data.dt * 1000));

    document.querySelector("#temperature").innerHTML = temp;
    document.querySelector("#city").innerHTML = `${city}, ${country}`;
    document.querySelector("#description").innerHTML = description;
    document.querySelector("#cloudines").innerHTML = cloudines;
    document.querySelector("#wind").innerHTML = wind;
    document.querySelector("#humidity").innerHTML = humidity;
    document.querySelector("#feels-like").innerHTML = feelsLike;
  document.querySelector("#icon").setAttribute("src", `images/${icon}@2x.png`);
  document.querySelector("#icon").setAttribute("alt", description);
}


let city = "New York";
let unit = "metric";
let apiKey = "125089b53f00feddd6fbd602dc6cec7a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;


axios.get(apiUrl).then(showTemperature);