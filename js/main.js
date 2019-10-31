const header = document.querySelector("header");
const form = document.querySelector("form");
const searchBtn = document.querySelector("#search-btn");
const input = document.querySelector("input");
const cityDOM = document.querySelector("#city");
const tempDOM = document.querySelector("#temp");
const description = document.querySelector("#description");
const minTemp = document.querySelector("#min-temp");
const maxTemp = document.querySelector("#max-temp");
const windDOM = document.querySelector("#wind-speed");
const precipitationDOM = document.querySelector("#precipitation");
const lattDOM = document.querySelector("#lattitude");
const longDOM = document.querySelector("#longitude");
const humidity = document.querySelector("#humidity");
const section = document.querySelector("section");
const searchResultsNone = document.querySelector(".search-results-none");
const apiKey = '&units=imperial&appid=157573d8ada4942264a2ac2031c7e6cd';
const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const footer = document.querySelector("footer");
/*
Here's an overview of the steps you'll follow to get your app to work...
STEPS
1. when the page loads
  - add an event listener to the button
2. When the button is clicked
  - grab the input
  - store the value
  - make an API request based on the input value
3. When the API response is returned
  - grab all the appropriate DOM elements
  - append the data to the DOM
*/
const setData = (city, temp, descrip, min, max) => {
  cityDOM.innerText = city;
  tempDOM.innerText = temp;
  description.innerText = descrip;
  minTemp.innerText = min;
  maxTemp.innerText = max;
};

const setMoreData = (latt, long, wind, hum) => {
  lattDOM.innerText = latt;
  longDOM.innerText = long;
  windDOM.innerText = wind;
  humidity.innerText = hum;
};

const getData = (response) => {
  const city = response.name;
  const temp = response.main.temp;
  const description = response.weather[0].description;
  const minTemp = response.main.temp_min;
  const maxTemp = response.main.temp_max;
  const latt = response.coord.lat;
  const long = response.coord.lon;
  const windSpeed = response.wind.speed;
  const humid = response.main.humidity;

  setData(city, temp, description, minTemp, maxTemp, windSpeed);
  setMoreData(latt, long, windSpeed, humid+'%')
  setIcons(temp);
};

const callWeather = (zipsearch) => {
  fetch(zipsearch)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      getData(response);
      console.log(response);
    })
    .catch((err) => {
      console.log(err)
    })
};

const headerAdjust = () => {
  header.classList.remove('flex-row-center');
  header.classList.add('header-adjust');
  form.style.marginRight = '1em';
  header.style.margin = '0';
};

const showSearchResults = () => {
  section.classList.remove('search-results-none');
  section.classList.add('search-results');
};

const adjustFooter = () => {
  footer.style.display = 'flex';
};

const setUpPage = () => {
  headerAdjust();
  showSearchResults();
  adjustFooter();
};

const setIcons = (temp) => {
  if(temp > 90) {
    tempDOM.style.color = "red";
  } else if(temp < 40) {
    tempDOM.style.color = "blue";
  } else {
    tempDOM.style.color = "#000000"
  }
}

searchBtn.addEventListener('click', function(e) {
  e.preventDefault();
  const inputVal = input.value;
  input.value = '';
  console.log(weatherUrl+inputVal+apiKey);
  setUpPage();
  callWeather(weatherUrl+inputVal+apiKey);
});
