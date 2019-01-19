<template>
    <div class="home">
        <div class="row">
            <div class="col-4">
                <div class="card text-white bg-secondary mb-3 text-center"
                 v-if="darksky.currently">
                    <div class="card-header">Darksky weather</div>
                    <div class="card-body">
                        <h4 class="card-title summary">
                            {{darksky.currently.summary}}</h4>
                        <div class="card-text">
                            {{icons[darksky.currently.icon]}}
                        </div>
                        <div class="card-text">
                        </div>
                        <div class="card-text">
                            {{darksky.currently.temperature | temperaturedecimal}} &deg;C
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="card text-white bg-secondary mb-3 text-center"
                 v-if="openweather">
                    <div class="card-header">OpenWeatherMap weather</div>
                    <div class="card-body">
                        <h4 class="card-title summary">
                            {{openweather.weather[0].description}}</h4>
                        <div class="card-text">
                            {{openweather.weather[0].icon}}
                        </div>
                        <div class="card-text">
                        </div>
                        <div class="card-text">
                            {{openweather.main.temp | temperaturedecimal}} &deg;C
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <pre>{{openweather}}</pre>
    </div>
</template>

<script>
import API from '@/lib/API';

export default {
    name: 'home',
    data() {
        return {
            darksky: {},
            openweather: {},
            weatherbit: {},
            icons: {
                'clear-day': '<i class="wi wi-day-sunny"></i>',
                'clear-night': '<i class="wi wi-night-clear"></i>',
                rain: '<i class="wi wi-rain"></i>',
                snow: '<i class="wi wi-snow"></i>',
                sleet: '<i class="wi wi-sleet"></i>',
                wind: '<i class="wi wi-strong-wind"></i>',
                fog: '<i class="wi wi-fog"></i>',
                cloudy: '<i class="wi wi-cloudy"></i>',
                'partly-cloudy-day': '<i class="wi day-cloudy-high"></i>',
                'partly-cloudy-night': '<i class="wi night-alt-partly-cloudy"></i>',
            },
        };
    },
    mounted() {
        API.getDarkSkyForecast().then((result) => {
            this.darksky = result.data;
        });
        API.getOpenWeatherForecast().then((result) => {
            this.openweather = result.data;
        });
        API.getWeatherbitForecast().then((result) => {
            this.weatherbit = result.data;
        });
    },
    filters: {
        temperaturedecimal(value) {
            return value.toFixed(1);
        },
    },
};
</script>

<style>
@font-face {
    font-family: 'WeatherIcons';
    src: url('../font/weathericons-regular-webfont.eot');
    src: url('../font/weathericons-regular-webfont.woff2') format('woff2'),
        url('../font/weathericons-regular-webfont.woff') format('woff'),
        url('../font/weathericons-regular-webfont.ttf')  format('truetype'),
        url('../font/weathericons-regular-webfont.svg') format('svg');
}
.summary {
    font-size: 40px;
}
</style>
