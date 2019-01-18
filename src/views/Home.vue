<template>
    <div class="home">
        <div class="row">
            <div class="col-6">
                <div class="card text-white bg-secondary mb-3 text-center"
                 v-if="darksky.currently">
                    <div class="card-header">Darksky weather</div>
                    <div class="card-body">
                        <h4 class="card-title">
                            {{darksky.currently.summary}}</h4>
                        <div class="card-text">
                            {{darksky.currently.icon}}
                        </div>
                        <div class="card-text">
                            {{darksky.currently.temperature | temperaturedecimal}} &deg;C
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="card text-white bg-secondary mb-3">
                    <div class="card-header">Header</div>
                    <div class="card-body">
                        <h4 class="card-title">Secondary card title</h4>
                        <p class="card-text">Some quick example text to build on the card title
                            and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </div>
        </div>
        <pre>{{darksky}}</pre>
    </div>
</template>

<script>
import API from '@/lib/API';

export default {
    name: 'home',
    data() {
        return {
            darksky: {},
        };
    },
    filters: {
        temperaturedecimal(value) {
            return value.toFixed();
        },
    },
    mounted() {
        API.getDarkSkyForecast().then((result) => {
            this.darksky = result.data;
        });
    },
};
</script>
