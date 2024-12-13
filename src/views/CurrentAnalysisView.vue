<template>
    <h1>Current Analysis</h1>
    <table>
        <thead>
            <tr>
                <th>Crypto</th>
                <th>Amount</th>
                <th>$Ars</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(coin, index) in currentCoins" :key="index">
                <div v-if="coin.amount > 0">
                    <td>{{ coin.crypto_code }}</td>
                    <td>{{ coin.amount }}</td>
                    <td>{{ coin.money.toFixed(2) }}</td>
                </div>
                
            </tr>
        </tbody>
    </table>
    <h3>{{ totalMoney.toFixed(2) }}</h3>
    <button @click="calculateData">Refresh</button>
</template>
<script>
import lab3api from '@/services/lab3api'
import criptoyaApi from '@/services/criptoyaApi'

export default {
    name: 'CurrentAnalysisView',
    data(){
        return{
            currentCoins: {},
            transactions: [],
            criptos: {
                btc:'',
                eth:'',
                usdc:''
            },
            totalMoney: 0
        }
    },
    created(){
        this.fetchPrices();
        this.fethTransactions();
    },
    methods: {
        async fethTransactions(){
            lab3api.getTransaction(localStorage.username).then((res) => {
                this.transactions = res.data;
            });
            this.calculateData();
        },
        calculateData(){
            const balanceCoins = {};

            this.transactions.forEach(tran => {
                const {crypto_code, crypto_amount, action} = tran;
                console.log(JSON.stringify(tran));
                if (!balanceCoins[crypto_code]) {
                    balanceCoins[crypto_code] = {amount: 0, money: 0};
                }
                if (action === 'purchase') {
                    balanceCoins[crypto_code].money += parseFloat(crypto_amount);
                } else if(action === 'sale'){
                    balanceCoins[crypto_code].money -= parseFloat(crypto_amount);
                }

                if(crypto_code === 'btc') balanceCoins[crypto_code].money = balanceCoins[crypto_code].amount * this.criptos.btc.totalbid; 
                if(crypto_code === 'eth') balanceCoins[crypto_code].money = balanceCoins[crypto_code].amount * this.criptos.eth.totalbid; 
                if(crypto_code === 'usdc') balanceCoins[crypto_code].money = balanceCoins[crypto_code].amount * this.criptos.usdc.totalbid; 

            })
            
            this.currentCoins = Object.keys(balanceCoins)
                .map(crypto_code => {
                    const crypto = balanceCoins[crypto_code];
                    alert(crypto_code);
                    if(crypto.amount > 0) {
                        return{
                            'crypto_code': crypto_code,
                            'amount': crypto.amount,
                            'money': crypto.money
                        }
                    }
                    return null;
                }).filter(coin => coin !== null);

            this.totalMoney = this.currentCoins.reduce((total, coin) => total + parseFloat(coin.money), 0);
        },
        async fetchPrices(){
            criptoyaApi.getBitcoin().then((res) => 
            {this.criptos.btc = res.data});
            criptoyaApi.getEtherum().then((res) => 
            {this.criptos.eth = res.data});
            criptoyaApi.getUSDC().then((res) => 
            {this.criptos.usdc = res.data});
        }
    }
}
</script>
