import axios from 'axios';

const proxy = 'https://cors-anywhere.herokuapp.com/';
const API_KEY_DARKSKY = '7102c032dfc82cbe484875a41e5ac1a5';
const API_KEY_OPEN = '9ba6e5ed9610d49dcea7d39e4a9b4943';
const API_KEY_WEATHERBIT = '2bdda14f1a0e4c2b8e272373cac86afe';
const API_DARKSKY = `${proxy}https://api.darksky.net/forecast/${API_KEY_DARKSKY}/37.8267,-122.4233?&exclude=[minutely,hourly,daily]&lang=ru&units=si`;
const API_OPEN = `https://api.openweathermap.org/data/2.5/weather?lat=37.8267&lon=-122.4233&mode=json&appid=${API_KEY_OPEN}&units=metric&lang=ru`;
const API_WEATHERBIT = `https://api.weatherbit.io/v2.0/current?&lat=37.8267&lon=-122.4233&key=${API_KEY_WEATHERBIT}&lang=ru`;

function getDarkSkyForecast() {
    return axios.get(API_DARKSKY);
}
function getOpenWeatherForecast() {
    return axios.get(API_OPEN);
}
function getWeatherbitForecast() {
    return axios.get(API_WEATHERBIT);
}

export default {
    getDarkSkyForecast,
    getOpenWeatherForecast,
    getWeatherbitForecast,
};
