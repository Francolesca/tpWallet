<template>
  <div class="container">
    <h1 class="welcome">¡Bienvenido/a! {{ user }}</h1>
    <div v-if="Value" class="crypto-container">
      <div class="crypto-card" v-for="(crypto, index) in cryptos" :key="index">
        <h2>{{ crypto.name }}</h2>
        <h3>Compra: ${{ crypto.totalAsk }}</h3>
        <h3>Venta: ${{ crypto.totalBid }}</h3>
      </div>
<!--       <div>
        <h2>Bitcoin</h2>
        <h3>Compra ${{ btc.totalAsk }}</h3>
        <h3>Venta ${{ btc.totalBid }}</h3>
      </div>
      <div>
        <h2>Etherum</h2>
        <h3>Compra ${{ eth.totalAsk }}</h3>
        <h3>Venta ${{ eth.totalBid }}</h3>
      </div>
      <div>
        <h2>USDC</h2>
        <h3>Compra ${{ usdc.totalAsk }}</h3>
        <h3>Venta ${{ usdc.totalBid }}</h3>
      </div> -->
    </div>
    <div v-else class="loading">
      Cargando....
    </div>
    <div>
      <button @click="logout" class="logout">Salir</button>
    </div>
  </div>
</template>;
<script>
import router from '@/router';
import criptoyaApi from '@/services/criptoyaApi';
import { mapMutations } from 'vuex';
import { mapState } from 'vuex';

export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      cryptos:[
        {name: 'Bitcoin', totalAsk:0, totalBid:0},
        {name: 'Ethereum', totalAsk: 0, totalBid: 0},
        {name: 'Usdc', totalAsk: 0, totalBid: 0}
    ],

    };
  },
  created() {
    Promise.all([
      criptoyaApi.getBitcoin().then((res) => { this.cryptos[0].totalAsk = res.data.totalAsk; this.cryptos[0].totalBid = res.data.totalBid}),
      criptoyaApi.getEtherum().then((res) => { this.cryptos[1].totalAsk = res.data.totalAsk; this.cryptos[1].totalBid = res.data.totalBid}),
      criptoyaApi.getUSDC().then((res) => { this.cryptos[2].totalAsk = res.data.totalAsk; this.cryptos[2].totalBid = res.data.totalBid}),
    ]);

  },
  computed: {
    ...mapState(['user']),
    Value: function () {
      if (this.btc === '' || this.eth === '' || this.usdc === '') return false;
      else return true;
    },
  },
  methods: {
    ...mapMutations(['removeUser']),
    logout() {
      this.removeUser();
      router.replace('/');
    }
  },
}
</script>;
<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 5px;
  font-family: Arial, sans-serif;
}

.welcome {
  text-align: center;
  color: #333;
}

.crypto-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.crypto-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.crypto-card h2 {
  margin: 0;
  color: #444;
}

.loading {
  text-align: center;
  font-size: 1.2em;
  color: #888;
}

.logout {
  text-align: center;
  margin-top: 20px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>