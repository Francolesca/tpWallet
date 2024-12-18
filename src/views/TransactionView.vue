<template>
  <div class="container">
    <h1 class="title">Compra y Venta de Cryptos</h1>

    <form @submit.prevent="realizarOperacion" class="transaction-form">
        <div class="form-group">
        <label>
          Criptomoneda:
          <select v-model="coin" class="form-select">
            <option value="btc">Bitcoin</option>
            <option value="eth">Ethereum</option>
            <option value="usdc">USDC</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Tipo de Operación:
          <select v-model="action" class="form-select">
            <option value="purchase">Compra</option>
            <option value="sale">Venta</option>
          </select>
        </label>
      </div> 

      <div class="form-group">
        <label>Precio:</label>
        <span>{{ currentPrice }}</span>
      </div>

      <div class="form-group">
        <label>
          Cantidad:
        </label>
        <input type="number" 
          v-model="crypto_amount" min="0" 
          step="0.0000000001" 
          id="amount"
          class="form-input"
          placeholder="Ej: 0.00001">
      </div>

      <div class="form-group">
        <label>Total Pesos: {{ totalTransaction }}</label>
      </div>
      
      <button type="submit" class="submit-button">Realizar Operación</button>
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
        action: 'purchase',
        coin: 'btc',
        crypto_amount: 0,
        money: '0',
        transaction: {},
        criptos:{
            btc:'',
            eth:'',
            usdc:'',
        },
        availableAmount: 0
      }
    },
    created(){
        criptoyaApi.getBitcoin().then((res) => 
        {this.criptos.btc = res.data}).catch((error) => {console.log('Error al obtener el precio de Bitcoin.', error)});
        criptoyaApi.getEtherum().then((res) => 
        {this.criptos.eth = res.data}).catch((error) => {console.log('Erro al obtener el precio de Ethereum.',error)});
        criptoyaApi.getUSDC().then((res) => 
        {this.criptos.usdc = res.data}).catch((error) => {console.log('Error al obtener el precio de Usdc.',error)});
    },
    computed: {
      currentPrice(){
        const price = this.criptos[this.coin]?.[this.action === 'purchase' ? 'totalAsk' : 'totalBid'];
        return price ? `$${price}` : 'N/A';
      },
      totalTransaction(){
        const price = this.criptos[this.coin]?.[this.action === 'purchase' ? 'totalAsk' : 'totalBid'];

        this.money = price ? (this.crypto_amount * price).toFixed(2) : 0;

        return this.money;
      }
    },
    methods: {
        async realizarOperacion() {

/*           this.datetime = new Date();
          this.datetime = moment().format("DD-MM-YYYY hh:ss"); */
          let fechaactual = moment().toISOString();

          this.transaction = {
            user_id: localStorage.getItem('user'),
            action: this.action,
            crypto_code: this.coin,
            crypto_amount: this.crypto_amount,
            money: this.money,
            datetime: fechaactual,
          }

          try {
            lab3api.postTransaction(this.transaction);
            console.log('Realizado con exito', this.transaction);
          } catch (error) {
            console.log(error);
          } 

        },
      }
};

</script>

<style scoped>
.transaction-container .container{
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.title {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.transaction-form {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-select, .form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.form-input {
  width: 90%;
}
.submit-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>