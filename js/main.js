const API_KEY = '***';
const maps_API_KEY = '***';
const base_URL= 'https://api.openweathermap.org';
const MAPS_PATH = 'https://api.tomtom.com/map/1/staticimage';


const button = document.getElementById("sendButton");
const inputElement = document.getElementById("search");
const resultsElement = document.getElementById('results');
const noResultsElement = document.getElementById('no-results');
const mapContainer = document.getElementById('map-container');
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
    mapContainer.classList.remove(showClass);

    const fetchPromise = fetch(`${base_URL}/data/2.5/weather?q=${wordToSearch}&appid=${API_KEY}&units=metric&lang=es`,{mode:"cors"})

    fetchPromise.then(response => {
        console.log('result', response);
        if (response.ok === true) {
            return response.json();
        }else {
            noResultsElement.classList.add(showClass);
        }
    }).then(result => {
        if (result){
            storeInLocalStorage(result);
            makeGrid(result);
            resultsElement.classList.add(showClass);
            mapContainer.classList.add(showClass);
        }
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
const cityNameSpan = document.getElementById('city-name');
const map = document.getElementById('map');

function makeGrid(data) {
    let tempMax = data['main']['temp_max'];
    let tempMin = data['main']['temp_min'];
    let humidity = data['main']['humidity'];
    let feels = data['main']['feels_like'];
    let pressure = data['main']['pressure'];
    let windSpeed = data['wind']['speed'];
    let iconCode = data['weather'][0]['icon'];
    let weatherDescription = data['weather'][0]['description'];
    let name = data['name'];
    let lon = data['coord']['lon'];
    let lat = data['coord']['lat'];

    cityNameSpan.innerHTML = name;
    tempMaxP.innerHTML = tempMax;
    tempMinP.innerHTML = tempMin;
    humidityP.innerHTML = humidity;
    feelsP.innerHTML = feels;
    pressureP.innerHTML = pressure;
    windSpeedP.innerHTML = Math.round(windSpeed*60*60/1000); //default is m/s, converting to km/h
    iconImg.setAttribute('src',`http://openweathermap.org/img/wn/${iconCode}@2x.png`);
    weatherDescriptionP.innerHTML = weatherDescription[0].toUpperCase() + weatherDescription.substring(1);
    map.src=`${MAPS_PATH}?layer=basic&style=main&format=png&center=${lon}%2C%20${lat}&width=900&height=500&key=${maps_API_KEY}`;
}
function isInLocalStorage () {
    return localStorage.lastResult;
}
function storeInLocalStorage (response) {
    localStorage.lastResult = JSON.stringify(response);
}
function retrieveFormLocalStorage () {
    return JSON.parse(localStorage.lastResult);
}
if (isInLocalStorage()) {
    let lastResult = retrieveFormLocalStorage();
    makeGrid(lastResult);
    resultsElement.classList.add(showClass);
    mapContainer.classList.add(showClass);
}