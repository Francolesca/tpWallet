<template>
  <div>
    <h1>Compra y Venta de Criptomonedas</h1>

    <!-- Formulario para comprar y vender -->
    <form @submit.prevent="realizarOperacion">
      <label>
        Criptomoneda:
        <select v-model="coin" >
          <option value="btc">Bitcoin</option>
          <option value="eth">Ethereum</option>
          <option value="usdc">USDC</option>
        </select>
      </label>
      <br>
      <label>
        Tipo de Operación:
        <select v-model="action">
          <option value="purchase">Compra</option>
          <option value="sale">Venta</option>
        </select>
      </label>
      <br>
      <label v-if="coin === 'btc'">
        Precio: <span v-if="action === 'purchase'"> ${{ this.criptos.btc.totalAsk}} </span>
                <span v-else-if="action === 'sale'"> ${{ this.criptos.btc.totalBid}} </span>
      </label>
      <label v-if="coin === 'usdc'">
        Precio: <span v-if="action === 'purchase'"> ${{ this.criptos.usdc.totalAsk}} </span>
                <span v-else-if="action === 'sale'"> ${{ this.criptos.usdc.totalBid}} </span>
      </label>
      <label v-if="coin === 'eth'">
        Precio: <span v-if="action === 'purchase'"> ${{ this.criptos.eth.totalAsk}} </span>
                <span v-else-if="action === 'sale'"> ${{ this.criptos.eth.totalBid}} </span>
      </label>
      <br>
      <label>
        Cantidad:
        <input type="number" 
          v-model="crypto_amount" min="0" 
          step="0.0000000001" 
          aria-label="Amount (to the nearest dollar)"
          placeholder="Ej: 0.00001">
      </label>

      <br>
      <label>Total pesos:{{ totalTransaction }}</label>
      <br>
      
      <button type="submit">Realizar Operación</button>
    </form>
    
  </div>

</template>
<script>
import criptoyaApi from '@/services/criptoyaApi';
import lab3api from '@/services/lab3api';
import moment from 'moment';
export default{
    data(){
        return {
        username: localStorage.username,
        action: 'purchase',
        coin: 'btc',
        crypto_amount: 0,
        money: '0',
        datetime: '',
        criptos:{
            btc:'',
            eth:'',
            usdc:'',
        }
      }
    },
    created(){
        criptoyaApi.getBitcoin().then((res) => 
        {this.criptos.btc = res.data});
        criptoyaApi.getEtherum().then((res) => 
        {this.criptos.eth = res.data});
        criptoyaApi.getUSDC().then((res) => 
        {this.criptos.usdc = res.data});
    },
    computed: {
      totalTransaction(){
        if (this.coin == 'btc') {
          if (this.action == 'purchase') {
          this.money = (this.crypto_amount * this.criptos.btc.totalAsk).toFixed(2);
        }
        if (this.action == 'sale') {
          this.money = (this.crypto_amount * this.criptos.btc.totalBid).toFixed(2);
        }
      }
      if (this.coin == 'eth') {
          if (this.action == 'purchase') {
          this.money = (this.crypto_amount * this.criptos.eth.totalAsk).toFixed(2);
        }
        if (this.action == 'sale') {
          this.money = (this.crypto_amount * this.criptos.eth.totalBid).toFixed(2);
        }
      }
      if (this.coin == 'usdc') {
          if (this.action == 'purchase') {
          this.money = (this.crypto_amount * this.criptos.usdc.totalAsk).toFixed(2);
        }
        if (this.action == 'sale') {
          this.money = (this.crypto_amount * this.criptos.usdc.totalBid).toFixed(2);
        }
      }
        return this.money;
      }
    },
    methods: {
        realizarOperacion() {
          this.datetime = new Date();
          this.datetime = moment(this.datetime).format("DD-MM-YYYY hh:ss");
          let transaction = {
            user_id: this.username,
            action: this.action,
            crypto_code: this.coin,
            crypto_amount: this.amount.toString(),
            money: this.money,
            datetime: this.datetime,
          }
          lab3api.postTransaction(transaction);
          console.log(transaction);
        },
    }
};

</script>
