function showTemperature(response) {  
    console.log(response);
}

let city = " New York";
let unit = "metric";
let apiKey = "125089b53f00feddd6fbd602dc6cec7a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

console.log(apiUrl);

axios.get(apiUrl).then(showTemperature);