<template>
  <h1>¡Bienvenido/a!</h1>
  <div v-if="Value"> 
    <div>
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
    </div>
  </div>
  <div v-else>
    Cargando....
  </div>
</template>;
<script>
import criptoyaApi from '@/services/criptoyaApi';

  export default {
    name: 'HomeView',
    components:{},
    data(){
      return {
        btc: {},
        eth: {},
        usdc: {},
        user: this.$store.state.id
      };
    },
    created(){
        criptoyaApi.getBitcoin().then((res) => 
        {this.btc = res.data});
        criptoyaApi.getEtherum().then((res) => 
        {this.eth = res.data});
        criptoyaApi.getUSDC().then((res) => 
        {this.usdc = res.data});
    },
    computed: {
      Value: function(){
      if (this.btc === '' || this.eth === '' || this.usdc === '') return false;
      else return true;
    },
    methods: {
      // getPrices() {
      //   criptoyaApi.getBitcoin().then((res) => 
      //   {this.btc = res.data});
      //   criptoyaApi.getEtherum().then((res) => 
      //   {this.eth = res.data});
      //   criptoyaApi.getUSDC().then((res) => 
      //   {this.usdc = res.data});
      // }
    },

    }
  }
</script>;
