function showTemperature(response) {  
    let city = response.data.name;
    let country = response.data.sys.country;
    let temp = Math.round(response.data.main.temp);
    let description = response.data.weather[0].description;
    let cloudines = Math.round(response.data.clouds.all);
    let wind = Math.round(response.data.wind.speed);
    let humidity = Math.round(response.data.main.humidity);
    let feelsLike = Math.round(response.data.main.feels_like);
 
    document.querySelector("#temperature").innerHTML = temp;
    document.querySelector("#city").innerHTML = `${city}, ${country}`;
    document.querySelector("#description").innerHTML = description;
    document.querySelector("#cloudines").innerHTML = cloudines;
    document.querySelector("#wind").innerHTML = wind;
    document.querySelector("#humidity").innerHTML = humidity;
    document.querySelector("#feels-like").innerHTML = feelsLike;
}

let city = "New York";
let unit = "metric";
let apiKey = "125089b53f00feddd6fbd602dc6cec7a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;


axios.get(apiUrl).then(showTemperature);