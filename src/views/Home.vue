<template>
  <div class="home">
    <h1>Home</h1>
  </div>
</template>

<script>
import API from '@/lib/API';
export default {
  name: 'home',
  mounted() {
    API.getForecast();
  }
};
</script>
