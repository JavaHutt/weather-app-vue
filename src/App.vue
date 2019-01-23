<template>
    <div class="home">
        <!-- <a onclick="setStyleSheet('https://bootswatch.com/4/solar/bootstrap.min.css')" href="#">Style 1</a>
        <a onclick="setStyleSheet('https://bootswatch.com/4/litera/bootstrap.min.css')" href="#">Style 2</a> -->
        <div class="search">
            <input type="text" name="" id="" placeholder="Enter Location" v-model="location" class="search__input">
            <button @click="updateLocation" class="search__button">Search</button>
            <button @click.once="showCard =! showCard" class="search__button search__button_big">Рассчитать усреднённое</button>
        </div>
        <div class="row">
            <div class="card" v-if="darksky">
                <a class="card__header" :href="darkskyUrl" target="_blank" title="See source">
                    <p class="card__header-link">Darksky forecast</p>
                </a>
                <div class="card__icon" v-html="icons[darksky.currently.icon]"></div>
                <p class="card__temp">{{darksky.currently.temperature | decimal}}&deg;C</p>
                <h4 class="card__summary">{{darksky.currently.summary}}</h4>
                <div class="card__data">
                    <div class="card__data-item">
                        <p class="card__data-number">{{darksky.currently.windSpeed | decimal}}м/с {{darksky.currently.windBearing | direction}}</p>
                        <i class="wi wi-strong-wind card__data-icon"></i>
                        <p class="card__data-text">ветер</p>
                    </div>
                    <div class="card__data-item">
                        <p class="card__data-number"> {{darksky.currently.pressure | mbToMm}} мм</p>
                        <i class="wi wi-earthquake card__data-icon"></i>
                        <p class="card__data-text">давление</p>
                    </div>
                    <div class="card__data-item">
                        <p class="card__data-number">{{darksky.currently.humidity | percentage}}%</p>
                        <i class="wi wi-raindrops card__data-icon"></i>
                        <p class="card__data-text">влажность</p>
                    </div>
                </div>
            </div>        
            <div class="card" v-if="openweather">
                <a class="card__header" :href="openweatherUrl" target="_blank" title="See source">
                    <p class="card__header-link">OpenWeatherMap forecast</p>
                </a>
                <div class="card__icon" v-html="icons[openweather.weather[0].icon]"></div>
                <p class="card__temp">{{openweather.main.temp | decimal}}&deg;C</p>
                <h4 class="card__summary">{{openweather.weather[0].description | capitalize}}</h4>
                <div class="card__data">
                    <div class="card__data-item">
                        <p class="card__data-number">{{openweather.wind.speed | decimal}}м/с {{openweather.wind.speed | direction}}</p>
                        <i class="wi wi-strong-wind card__data-icon"></i>
                        <p class="card__data-text">ветер</p>
                    </div>
                    <div class="card__data-item">
                        <p class="card__data-number">{{openweather.main.pressure | mbToMm}} мм</p>
                        <i class="wi wi-earthquake card__data-icon"></i>
                        <p class="card__data-text">давление</p>
                    </div>
                    <div class="card__data-item">
                        <p class="card__data-number">{{openweather.main.humidity}}%</p>
                        <i class="wi wi-raindrops card__data-icon"></i>
                        <p class="card__data-text">влажность</p>
                    </div>
                </div>
            </div>       
            <div class="card" v-if="apixu">
                <a class="card__header" :href="apixuUrl" target="_blank" title="See source">
                    <p class="card__header-link">Apixu forecast</p>
                </a>
                <div class="card__icon" v-html="icons[openweather.weather[0].icon]"></div>
                <p class="card__temp">{{apixu.current.temp_c}}&deg;C</p>
                <h4 class="card__summary">{{apixu.current.condition.text}}</h4>
                <div class="card__data">
                    <div class="card__data-item">
                        <p class="card__data-number">{{apixu.current.wind_kph | kphToMs}}м/с {{apixu.current.wind_degree | direction}}</p>
                        <i class="wi wi-strong-wind card__data-icon"></i>
                        <p class="card__data-text">ветер</p>
                    </div>
                    <div class="card__data-item">
                        <p class="card__data-number">{{apixu.current.pressure_mb | mbToMm}} мм</p>
                        <i class="wi wi-earthquake card__data-icon"></i>
                        <p class="card__data-text">давление</p>
                    </div>
                    <div class="card__data-item">
                        <p class="card__data-number">{{apixu.current.humidity}}%</p>
                        <i class="wi wi-raindrops card__data-icon"></i>
                        <p class="card__data-text">влажность</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="calculated" v-show="showCard" v-if="darksky && openweather && apixu">
            <h4 class="calculated__header">Средние значения:</h4>
            <div class="calculated__data">
                <p class="calculated__data-text">Температура: <span class="calculated__data-text_number">{{calculatedTemp | decimal}}&deg;C</span></p>
                <p class="calculated__data-text">Влажность: <span class="calculated__data-text_number">{{calculatedHumidity | integer}}%</span></p>
                <p class="calculated__data-text">Давление: <span class="calculated__data-text_number">{{calculatedPressure | mbToMm}}мм</span></p>
                <p class="calculated__data-text">Скорость ветра: <span class="calculated__data-text_number">{{calculatedSpeed | decimal}}м/с</span></p>
            </div>
        </div>
    </div>
</template>

<script>
import API from './lib/API.js';

export default {
name: 'app',
    data () {
        return {
            location: '', 
            geolat: '',
            geolon: '',
            darksky: null,
            darkskyUrl: 'https://darksky.net/',
            openweather: null,
            openweatherUrl: 'https://openweathermap.org/',
            apixu: null,
            apixuUrl: 'https://www.apixu.com/weather/',
            showCard: false,
            icons: {
                'clear-day': '<i class="wi wi-day-sunny"></i>',
                '01d': '<i class="wi wi-day-sunny"></i>',
                'clear-night': '<i class="wi wi-night-clear"></i>',
                '01n': '<i class="wi wi-night-clear"></i>',
                rain: '<i class="wi wi-rain"></i>',
                '02d': '<i class="wi wi-day-cloudy"></i>',
                '02n': '<i class="wi wi-night-alt-cloudy"></i>',
                '09d': '<i class="wi wi-day-showers"></i>',
                '09n': '<i class="wi wi-night-showers"></i>',
                '10d': '<i class="wi wi-day-rain"></i>',
                '10n': '<i class="wi wi-night-rain"></i>',
                '11d': '<i class="wi wi-thunderstorm"></i>',
                '11n': '<i class="wi wi-thunderstorm"></i>',
                snow: '<i class="wi wi-snow"></i>',
                '13n': '<i class="wi wi-snow"></i>',
                sleet: '<i class="wi wi-sleet"></i>',
                wind: '<i class="wi wi-strong-wind"></i>',
                fog: '<i class="wi wi-fog"></i>',
                '50n': '<i class="wi wi-fog"></i>',
                cloudy: '<i class="wi wi-cloudy"></i>',
                '03d': '<i class="wi wi-cloudy"></i>',
                '03n': '<i class="wi wi-cloudy"></i>',
                '04n': '<i class="wi wi-cloud"></i>',
                'partly-cloudy-day': '<i class="wi wi-day-cloudy"></i>',
                'partly-cloudy-night': '<i class="wi wi-night-alt-partly-cloudy"></i>',
            },
        }
    },
    beforeMount() {
        this.geolocation();
    },
    mounted() {
        this.loadDarkSkyForecast('37.8267', '-122.4233')
        this.loadOpenWeatherForecast('37.8267', '-122.4233')
        this.loadApixuForecast('37.8267', '-122.4233')
    },
    methods: {
       geolocation() {
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(position => {
                    console.log(position);
                    this.geolat = position.coords.latitude;
                    this.geolon = position.coords.longitude;
                })
            }
        },
        loadDarkSkyForecast(lat, lon) {
            API.getDarkSkyForecast(lat, lon)
                .then((result) => {
                    this.darksky = result.data;
                })
                .catch((error) => {
                    this.darksky = `Service is currently unavaliable ${error}`;
                });
        },
        loadOpenWeatherForecast(lat, lon) {
            API.getOpenWeatherForecast(lat, lon)
                .then((result) => {
                    this.openweather = result.data;
                })
                .catch((error) => {
                    this.openweather = `Service is currently unavaliable ${error}`;
                });
        },
        loadApixuForecast(lat, lon) {
            API.getApixuForecast(lat, lon)
                .then((result) => {
                    this.apixu = result.data;
                })
                .catch((error) => {
                    this.apixu = `Service is currently unavaliable ${error}`;
                });
        },
        updateLocation() {
            API.getCoordinates(this.location).then(result => {
                this.loadDarkSkyForecast(result.data.latitude, result.data.longitude)
                this.loadOpenWeatherForecast(result.data.latitude, result.data.longitude)
                this.loadApixuForecast(result.data.latitude, result.data.longitude)
            });
        },        
    },
    computed: {
        calculatedTemp() {
            return (this.darksky.currently.temperature + this.openweather.main.temp + this.apixu.current.temp_c) / 3;
        },
        calculatedHumidity() {
            return ((this.darksky.currently.humidity + (this.openweather.main.humidity / 100) + (this.apixu.current.humidity / 100)) / 3) * 100;
        },
        calculatedPressure() {
            return (this.darksky.currently.pressure + this.openweather.main.pressure + this.apixu.current.pressure_mb) / 3;
        },
        calculatedSpeed() {
            return (this.darksky.currently.windSpeed + this.openweather.wind.speed + (this.apixu.current.wind_kph* 0.27777777777778)) / 3;
        },
    },
    filters: {
        integer(value) {
            return value.toFixed(0);
        },
        decimal(value) {
            return value.toFixed(1);
        },
        capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        percentage(value) {
            return (value * 100).toFixed(0);
        },
        mbToMm(value) {
            return (value * 0.75006).toFixed(0);
        },
        kphToMs(value) {
            return (value * 0.27777777777778).toFixed(1);
        },
        direction(value) {
            const north = 'С';
            const east = 'В';
            const south = 'Ю';
            const west = 'З';
            const northeast = 'СВ';
            const southeast = 'ЮВ';
            const southwest = 'ЮЗ';
            const northwest = 'СЗ';

            if ((value >= 337.5 && value <= 0) || (value >= 0 && value < 22.5)) {
                return north;
            }
            if (value >= 22.5 && value < 67.5) {
                return northeast;
            }
            if (value >= 67.5 && value < 112.5) {
                return east;
            }
            if (value >= 112.5 && value < 157.5) {
                return southeast;
            }
            if (value >= 112.5 && value < 202.5) {
                return south;
            }
            if (value >= 202.5 && value < 247.5) {
                return southwest;
            }
            if (value >= 247.5 && value < 292.5) {
                return west;
            }
            if (value >= 292.5 && value < 337.5) {
                return northwest;
            }
        }
    },
}
</script>

<style lang="scss">

</style>
