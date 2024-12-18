<template>
  <form @submit.prevent="login" class="login-form">
    <h2>Iniciar Sesión</h2>
    <div class="form-group">
      <label for="username">Usuario:</label>
      <input type="text" id="username" v-model="username" required class="form-input" />
    </div>
    <div class="form-group">
      <label for="password">Contraseña:</label>
      <input type="password" id="password" v-model="password" required class="form-input" />
    </div>
    <div class="form-group">
      <button type="submit" class="submit-button">Iniciar sesión</button>
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
.login-form {
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    max-width: 600px;
    margin: auto;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

.form-input {
    width: 90%;
    padding: 10px;
    border: 1px solid #444;
    border-radius: 5px;
    background-color: #2a2a2a; /* Fondo de los inputs */
    color: #ffffff; /* Color de texto en los inputs */
}

.form-input:focus {
    border-color: #007bff; /* Color del borde al enfocar */
    outline: none; /* Sin contorno */
}

.submit-button {
    width: 100%;
    padding: 10px;
    background-color: #007bff; /* Color del botón */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.submit-button:hover {
    background-color: #0056b3; /* Color del botón al pasar el mouse */
}
</style>

