import axios from 'axios';

const proxy = 'https://cors-anywhere.herokuapp.com/';
const russian = '&lang=ru';
const API_KEY_DARKSKY = '7102c032dfc82cbe484875a41e5ac1a5';
const API_KEY_OPEN = '9ba6e5ed9610d49dcea7d39e4a9b4943';
// const API_KEY_WEATHERBIT = '2bdda14f1a0e4c2b8e272373cac86afe';
// const API_KEY_WWO = '51f820642a1a4730b1a01801191901';
const API_KEY_APIXU = 'cda8f89f58a54a82981165202191701';
const API_DARKSKY = `${proxy}https://api.darksky.net/forecast/${API_KEY_DARKSKY}/37.8267,-122.4233?&exclude=[minutely,hourly,daily]${russian}&units=si`;
const API_OPEN = `https://api.openweathermap.org/data/2.5/weather?lat=37.8267&lon=-122.4233&mode=json&appid=${API_KEY_OPEN}&units=metric${russian}`;
// const API_WEATHERBIT = `https://api.weatherbit.io/v2.0/current?&lat=37.8267&lon=-122.4233&key=${API_KEY_WEATHERBIT}${russian}`;
const API_APIXU = `https://api.apixu.com/v1/current.json?key=${API_KEY_APIXU}&q=37.8267,-122.4233${russian}`;

function getDarkSkyForecast() {
    return axios.get(API_DARKSKY);
}
function getOpenWeatherForecast() {
    return axios.get(API_OPEN);
}
function getApixuForecast() {
    return axios.get(API_APIXU);
}

export default {
    getDarkSkyForecast,
    getOpenWeatherForecast,
    getApixuForecast,
};
