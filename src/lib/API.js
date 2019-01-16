const API_URL = 'https://api.darksky.net/forecast/7102c032dfc82cbe484875a41e5ac1a5/37.8267,-122.4233?lang=ru&units=si';

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
