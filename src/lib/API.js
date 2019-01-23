import axios from 'axios';

const proxy = 'https://cors-anywhere.herokuapp.com/';
const russian = '&lang=ru';
const API_KEY_DARKSKY = '7102c032dfc82cbe484875a41e5ac1a5';
const API_KEY_OPEN = '9ba6e5ed9610d49dcea7d39e4a9b4943';
const API_KEY_APIXU = 'cda8f89f58a54a82981165202191701';
const API_GEO = `${proxy}https://darksky.net/geo?q=`;

function getCoordinates(location) {
    return axios.get(`${API_GEO}${location}`);
}

function getDarkSkyForecast(lat, lon) {
    return axios.get(`${proxy}https://api.darksky.net/forecast/${API_KEY_DARKSKY}/${lat},${lon}?&exclude=[minutely,hourly]${russian}&units=si`);
}
function getOpenWeatherForecast(lat, lon) {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&mode=json&appid=${API_KEY_OPEN}&units=metric${russian}`);
}
function getApixuForecast(lat, lon) {
    return axios.get(`https://api.apixu.com/v1/current.json?key=${API_KEY_APIXU}&q=${lat},${lon}${russian}`);
}

export default {
    getDarkSkyForecast,
    getOpenWeatherForecast,
    getApixuForecast,
    getCoordinates,
};
