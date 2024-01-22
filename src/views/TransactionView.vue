<template>
  <div>
    <h1>Compra y Venta de Criptomonedas</h1>

    <!-- Formulario para comprar y vender -->
    <form @submit.prevent="realizarOperacion">
      <label>
        Criptomoneda:
        <select v-model="coin">
          <option value="btc">Bitcoin</option>
          <option value="eth">Ethereum</option>
          <option value="usdc">USDC</option>
        </select>
      </label>

      <label>
        Tipo de Operación:
        <select v-model="action">
          <option value="compra">Compra</option>
          <option value="venta">Venta</option>
        </select>
      </label>

      <label>
        Cantidad:
        <input type="number" v-model="amount" min="0" step="0.01">
      </label>

      <button type="submit">Realizar Operación</button>
    </form>

    <!-- Resultados de la operación -->
    <div v-if="resultadoOperacion">
      <p>{{ resultadoOperacion }}</p>
    </div>
  </div>

</template>
<script>
import criptoyaApi from '@/services/criptoyaApi';
export default{
    data(){
        return {
        coin: 'btc',
        action: 'compra',
        amount: 0,
        resultadoOperacion: '',
        datetime:'',
        prices:{
            btc:{},
            eth:{},
            usdc:{}
        }
      }
    },
    created(){
        criptoyaApi.getBitcoin().then((res) => 
        {this.prices.btc = res.data});
        criptoyaApi.getEtherum().then((res) => 
        {this.prices.eth = res.data});
        criptoyaApi.getUSDC().then((res) => 
        {this.prices.usdc = res.data});
    },
    methods: {
        realizarOperacion() {
        // Aquí puedes implementar la lógica para realizar la compra/venta de criptomonedas
        // Por ahora, simplemente mostraremos un mensaje con los detalles de la operación
        this.resultadoOperacion = `Has realizado una ${this.action} de ${this.amount} ${this.coin}.`;
        }
    }
};

</script>
