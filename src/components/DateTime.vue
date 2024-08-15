<!-- DateTime.vue -->
  <template>
    <div>
      <p>Fecha y hora actual: {{ currentDateTime }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentDateTime: this.getCurrentDateTime(),
      };
    },
    methods: {
      getCurrentDateTime() {
        const now = new Date();
        return now.toLocaleString(); // Puedes personalizar el formato según tus necesidades
      },
      updateDateTime() {
        this.currentDateTime = this.getCurrentDateTime();
      },
    },
    mounted() {
      // Actualiza la fecha y hora cada segundo
      setInterval(this.updateDateTime, 10);
    },
  };
  </script>
  
  <style scoped>
  /* Estilos si es necesario */
  </style>
  