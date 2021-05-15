const API_KEY = '3d73f7682621c007f0a32e31c44dba02';
const base_URL= 'https://api.openweathermap.org';

const button = document.getElementById("sendButton");
const main = document.getElementById("main");
const inputElement = document.getElementById("search");
const resultsElement = document.getElementById('results');
const noResultsElement = document.getElementById('no-results');
const showClass = 'show';


inputElement.addEventListener('keypress', (event)=> {
    if (event.key === "Enter") {
        event.preventDefault();
        searchGif(inputElement.value);
    }
})
button.addEventListener("click", ()=>{
    searchGif(inputElement.value);
});

function searchGif(wordToSearch){
    resultsElement.classList.remove(showClass);
    noResultsElement.classList.remove(showClass);

    const fetchPromise = fetch(`${base_URL}/data/2.5/weather?q=${wordToSearch}&appid=${API_KEY}&units=metric&lang=es`,{mode:"cors"})

    fetchPromise.then(response => {
        console.log('result', response);
        return response.json();
    }).then(result => {
        console.log('data', result);
        madeGrid(result);
        resultsElement.classList.add(showClass);
    }).catch(err => {
        noResultsElement.classList.add(showClass);
    });
}
const tempMaxP = document.getElementById('temp-max');
const tempMinP = document.getElementById('temp-min');
const humidityP = document.getElementById('humidity');
const feelsP = document.getElementById('feels');
const pressureP = document.getElementById('pressure');
const windSpeedP = document.getElementById('wind-speed');
const iconImg = document.getElementById('weather-icon');
const weatherDescriptionP = document.getElementById('weather-description');

function madeGrid(data) {
    let tempMax = data['main']['temp_max'];
    let tempMin = data['main']['temp_min'];
    let humidity = data['main']['humidity'];
    let feels = data['main']['feels_like'];
    let pressure = data['main']['pressure'];
    let windSpeed = data['wind']['speed'];
    let iconCode = data['weather'][0]['icon'];
    let weatherDescription = data['weather'][0]['description'];

    tempMaxP.innerHTML = tempMax;
    tempMinP.innerHTML = tempMin;
    humidityP.innerHTML = humidity;
    feelsP.innerHTML = feels;
    pressureP.innerHTML = pressure;
    windSpeedP.innerHTML = Math.round(windSpeed*60*60/1000); //default is m/s, converting to km/h
    iconImg.setAttribute('src',`http://openweathermap.org/img/wn/${iconCode}@2x.png`);
    weatherDescriptionP.innerHTML = weatherDescription[0].toUpperCase() + weatherDescription.substring(1);
}