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
<!--       <span>¿No tienes cuenta? <a href="#">Registrate</a></span><br>
      <span>¿Olvidaste la contraseña? <a href="#">Recupera tu contraseña</a></span> -->
    </div>
  </form>
</template>

<script>
import router from '@/router';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    ...mapMutations(['setUser']),
    login() {
      if (this.username && this.password) {
        this.setUser(this.username);
        router.replace('/home');
      } else {
        alert('Por favor, complete todos los campos.');
      }
    }
  },
};
</script>

<style scoped>
</style>
