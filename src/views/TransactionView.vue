<template>
  <div class="container">
    <h1 class="title">Compra y Venta de Criptomonedas</h1>

    <form @submit.prevent="realizarOperacion" class="transaction-form">
        <div class="form-group">
        <label>
          Criptomoneda:
          <select v-model="coin" class="form-select">
            <option value="Bitcoin">Bitcoin</option>
            <option value="Ethereum">Ethereum</option>
            <option value="Usdc">USDC</option>
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
        <span v-if="coin ==='Bitcoin'">
          ${{ action === 'purchase' ? this.criptos.btc.totalAsk : this.criptos.btc.totalBid }}
        </span>
        <span v-if="coin ==='Ethereum'">
          ${{ action === 'purchase' ? this.criptos.eth.totalAsk : this.criptos.eth.totalBid }}
        </span>
        <span v-if="coin ==='Usdc'">
          ${{ action === 'purchase' ? this.criptos.usdc.totalAsk : this.criptos.usdc.totalBid }}
        </span>
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
        const cryptoPrices = {
            Bitcoin: {
              purchase: this.criptos.btc.totalAsk,
              sale: this.criptos.btc.totalBid,
            },
            Ethereum: {
              purchase: this.criptos.eth.totalAsk,
              sale: this.criptos.eth.totalBid,
            },
            Usdc: {
              purchase: this.criptos.usdc.totalAsk,
              sale: this.criptos.usdc.totalBid,
            },
        };

        const price = cryptoPrices[this.coin]?.[this.action];
        this.money = price ? (this.crypto_amount * price).toFixed(2) : 0;

        return this.money;
      }
    },
    methods: {
        realizarOperacion() {
          this.datetime = new Date();
          this.datetime = moment(this.datetime).format("DD-MM-YYYY hh:ss");
          let transaction = {
            user_id: localStorage.getItem('user'),
            action: this.action,
            crypto_code: this.coin,
            crypto_amount: this.crypto_amount.toString(),
            money: this.money,
            datetime: this.datetime,
          }
          lab3api.postTransaction(transaction);
          console.log(transaction);
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