<template id="app">
  <h1>Trabajo Final CryptoWallet</h1>
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
h1 {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  padding-bottom: 0px;
  margin-bottom: 0px;
}
</style>