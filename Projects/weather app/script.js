const userTab = document.querySelector('[data-userWeather]');
const searchTab = document.querySelector('[data-searchWeather]');
const userContainer = document.querySelector('.weather-container');
const grantAccessContainer = document.querySelector('.grant-location-container');
const loadingScreen = document.querySelector('.loading-container');
const userInfoContainer = document.querySelector('.user-info-container');
const grantAccessBtn = document.querySelector('[data-grantAccess]');
const searchInput = document.querySelector('[data-searchInput]');
const searchForm = document.querySelector('[data-search-form]');
const errorContainer=document.querySelector('.error-404');


let currentTab = userTab;
let API_KEY = "";
currentTab.classList.add("current-tab");
getfromSessionStorage();


function switchTab(clickedTab) {
    if (clickedTab != currentTab) {
        currentTab.classList.remove('current-tab');
        currentTab = clickedTab;
        currentTab.classList.add('current-tab');


        if (!searchForm.classList.contains('active')) {
            userInfoContainer.classList.remove('active');
            searchForm.classList.add('active');
            grantAccessContainer.classList.remove('active');
        }
        else {
            searchForm.classList.remove('active');
            userInfoContainer.classList.remove('active');//i don't think this removal is necessary
            //Yes its necessary coz on clicking only it will hide all the unwanted sections 

            //now we are going to check if location is available in session storage or not
            getfromSessionStorage();


        }
    }



}

userTab.addEventListener('click', () => {
    //passing the clicked tab as arguement
    switchTab(userTab);
});

searchTab.addEventListener('click', () => {
    //passing the clicked tab as arguement
    switchTab(searchTab);
});

//to check if location is present or not
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if (!localCoordinates) {
        grantAccessContainer.classList.add('active');

    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}


async function fetchUserWeatherInfo(coordinates) {
    const { lat, lon } = coordinates;
    //make grant section invisible
    grantAccessContainer.classList.remove('active');
    //making loader visible coz going to make a API call
    loadingScreen.classList.add('active');
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        loadingScreen.classList.remove('active');
        errorContainer.classList.remove('active');
        userInfoContainer.classList.add('active');
        renderWeatherInfo(data);

    }
    catch (error) {
        loadingScreen.classList.remove('active');
    }
}

function renderWeatherInfo(weatherInfo) {
    //get the elements first
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed}m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;


}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        // showPosition(navigator.geolocation.getCurrentPosition());
    }
    else {

    }
}

function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

grantAccessBtn.addEventListener('click', getLocation)


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let searchCity = searchInput.value;
    if (searchCity === "") {
        errorContainer.classList.remove('active');
        userInfoContainer.classList.remove('active');
        return;
    }
    else {
        fetchSearchWeatherInfo(searchCity);
    }

});

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add('active');
    userInfoContainer.classList.remove('active');
    grantAccessContainer.classList.remove('active');

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        if(data?.cod=="404"){
            loadingScreen.classList.remove('active');
            errorContainer.classList.add('active');
        }
        else{
            errorContainer.classList.remove('active');
            userInfoContainer.classList.add('active');
            loadingScreen.classList.remove('active');
            renderWeatherInfo(data);
        }
        
    }
    catch (e) {

    }

}
