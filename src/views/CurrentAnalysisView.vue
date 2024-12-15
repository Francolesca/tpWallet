<template>
    <h1>Current Analysis</h1>
    <table v-if="currentCoins.length">
        <thead>
            <tr>
                <th>Crypto</th>
                <th>Amount</th>
                <th>$Ars</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="crypto in currentCoins" :key="crypto.crypto_code">
                <td>{{ crypto.crypto_code }}</td>
                <td>{{ crypto.amount.toFixed(2) }}</td>
                <td>{{ crypto.value.toFixed(2) }}</td>                
            </tr>
        </tbody>
        <h3>{{ totalMoney.toFixed(2) }}</h3>
    </table>
    <div v-else>
        Cargando Datos
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