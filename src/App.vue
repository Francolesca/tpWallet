<template id="app">
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    NavBar,
  },
};
</script>


<style scoped>
#app {
    background-color: #ffffff; 
    color: #000000; 
    min-height: 100vh; 
    font-family: Arial, sans-serif;
}
</style>