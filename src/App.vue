<template id="app">
  <div class="nav-container">
    <nav>
      <router-link class="nav-link" to="/home">Home</router-link> |
      <router-link class="nav-link" to="/transaction">Trade</router-link> |
      <router-link class="nav-link" to="/history">History</router-link> |
      <router-link class="nav-link" to="/current">Current Analysis</router-link> |
      <router-link class="nav-link" to="/investment">Investment Analysis</router-link>
    
    </nav>
  </div>
  <router-view/>
</template>

<style scoped>
#app {
    background-color: #121212; 
    color: #ffffff; 
    min-height: 100vh; 
    font-family: Arial, sans-serif;
}
.nav-container {
    padding: 20px;
    background-color: #ffffff;
    border-bottom: 2px solid #007bff;
}

.navbar {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.nav-link {
    color: #007bff;
    text-decoration: none;
    padding: 10px 15px;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
}

.nav-link:hover {
    background-color: #007bff;
    color: white;
}

</style>