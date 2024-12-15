<template>
    <div class="container">
        <div class="panel">
            <div class="panel-heading">
                <h1>Current Analysis</h1>
            </div>
            <table class="table" v-if="currentCoins.length">
                <thead>
                    <tr>
                        <th>Crypto</th>
                        <th>Cantidad</th>
                        <th>Dinero</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="crypto in currentCoins" :key="crypto.crypto_code">
                        <td>{{ crypto.crypto_code }}</td>
                        <td>{{ crypto.amount.toFixed(2) }}</td>
                        <td>{{ crypto.value.toFixed(2) }}</td>                
                    </tr>
                </tbody>
            </table>
            <h3 class="total">{{ totalMoney.toFixed(2) }}</h3>
        </div>
        <div v-if="!currentCoins.length" class="loading">
            Cargando Datos
        </div>
    </div>
</template>
<script>
import lab3api from '@/services/lab3api';
import axios from 'axios';

export default {
    name: 'CurrentAnalysisView',
    data(){
        return{
            currentCoins: [],
            totalMoney: 0
        }
    },
    async created(){
        await this.fetchTransactions();
    },
    methods: {
        async fetchTransactions(){
            try {
                const transacciones = await lab3api.getTransaction(localStorage.getItem('user'));
                
                const cryptoTotals = transacciones.data.reduce((totals, transaction) => {
                    const { crypto_code, crypto_amount, action } = transaction;

                    if(!totals[crypto_code]) totals[crypto_code] = 0;

                    totals[crypto_code] += action === 'purchase' ? parseFloat(crypto_amount) : -parseFloat(crypto_amount);
                    
                    return totals;
                },{})

                const activeCryptos = Object.entries(cryptoTotals).filter(([,amount]) => amount > 0);

                const cryptoPrices = await Promise.all(
                    activeCryptos.map(async ([crypto_code, amount]) => {
                        const priceResponse = await axios.get(`https://criptoya.com/api/satoshitango/${crypto_code}/ars/1`);
                        const price = amount * priceResponse.data.totalBid;
                        return {
                            crypto_code,
                            amount,
                            value: price
                        }
                    })
                )

                const totalValue = cryptoPrices.reduce((total, crypto) => total + crypto.value, 0)
                
                this.currentCoins = cryptoPrices;
                this.totalMoney = totalValue;
            } catch (error) {console.log(error)}

        }
    }
}
</script>
<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.panel {
  border: 1px solid #007bff;
  border-radius: 8px;
  margin-bottom: 20px;
}

.panel-heading {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  font-size: 1.5em;
  text-align: center;
}

.table {
  width: 100%;
  margin: 0;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.table th {
  background-color: #f2f2f2;
}

.table-hover tbody tr:hover {
  background-color: #f1f1f1;
}

.total {
  text-align: right;
  font-size: 1.2em;
  color: #007bff;
  margin-top: 10px;
}

.loading {
  text-align: center;
  font-size: 1.2em;
  color: #888;
}
</style>
