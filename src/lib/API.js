const proxy = 'https://cors-anywhere.herokuapp.com/';
const API_KEY = '7102c032dfc82cbe484875a41e5ac1a5';
const API_URL = `${proxy}https://api.darksky.net/forecast/${API_KEY}/37.8267,-122.4233?lang=ru&units=si`;

function getForecast() {
    fetch(API_URL)
        .then(response => response.json())
        .then((result) => {
            console.log(result);
        });
}

export default {
    getForecast,
};