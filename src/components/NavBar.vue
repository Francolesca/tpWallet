<!-- NavBar.vue -->
<template>
    <div class="nav-container">
      <nav class="navbar">
        <router-link class="nav-link" to="/home">Home</router-link>
        <router-link class="nav-link" to="/transaction">Trade</router-link>
        <router-link class="nav-link" to="/history">History</router-link>
        <router-link class="nav-link" to="/current">Current Analysis</router-link>
        <router-link class="nav-link" to="/investment">Investment Analysis</router-link>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NavBar',
  };
  </script>
  
  <style scoped>
  .nav-container {
      padding: 2px;
      background-color: #ffffff;
      border-bottom: 2px solid #007bff;
      border-top: 2px solid #007bff;
  }
  
  .navbar {
      display: flex;
      justify-content: space-evenly;
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
  