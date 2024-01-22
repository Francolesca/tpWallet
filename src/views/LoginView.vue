<template>
  <form @submit.prevent="login">
    <div>
      <label for="username">Usuario:</label>
      <input type="text" id="username" v-model="username" required />
    </div>
    <div>
      <label for="password">Contraseña:</label>
      <input type="password" id="password" v-model="password" required />
    </div>
    <div>
      <button type="submit">Iniciar sesión</button>
    </div>
    <div>
      <span>¿No tienes cuenta? <a href="#">Registrate</a></span><br>
      <span>¿Olvidaste la contraseña? <a href="#">Recupera tu contraseña</a></span>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      console.log('Iniciar sesión con:', this.username, this.password);
    },
  },
};
</script>

<style scoped>
</style>
