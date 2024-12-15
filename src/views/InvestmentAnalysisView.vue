<template>
    <div>
      <h1>Análisis de Inversiones</h1>
      <table>
        <thead>
          <tr>
            <th>Criptomoneda</th>
            <th>Resultado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="crypto in investmentData" :key="crypto.crypto_code">
            <td>{{ crypto.crypto_code }}</td>
            <td :class="{ profit: crypto.result >= 0, loss: crypto.result < 0 }">
              {{ crypto.result.toFixed(2) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
<script>
import lab3api from '@/services/lab3api';
import axios from 'axios';

export default {
    data() {
        return {
            investmentData: []
        }
    },
    async mounted() {
        await this.analyzeInvestments()
    },
    methods: {
        async analyzeInvestments() {
            try {
                const transacciones = await lab3api.getTransaction(localStorage.getItem('user'))

                const cryptoData = transacciones.data.reduce((totals, transaction) => {
                    const { crypto_code, crypto_amount, money, action } = transaction;

                    if (!totals[crypto_code]) totals[crypto_code] = { amount: 0, cost: 0, revenue: 0 };

                    if (action === 'purchase') {
                        totals[crypto_code].amount += parseFloat(crypto_amount);
                        totals[crypto_code].cost += parseFloat(money);
                    } else if (action === 'sale') {
                        totals[crypto_code].amount -= parseFloat(crypto_amount);
                        totals[crypto_code].revenue += parseFloat(money);
                    }
                    return totals;
                }, {})

                const cryptoPrices = await Promise.all(
                    Object.entries(cryptoData)
                    .map(async ([crypto_code, data]) => {
                        const priceResponse = await axios.get(`https://criptoya.com/api/satoshitango/${crypto_code}/ars/1`)
                        return {
                            crypto_code,
                            amount: data.amount,
                            cost: data.cost,
                            revenue: data.revenue,
                            currentValue: priceResponse.data.totalBid
                        }
                    })
                )

                const investmentData = cryptoPrices.map((crypto) => {
                    const result = crypto.revenue + (crypto.currentValue * crypto.amount) - crypto.cost;

                    return {
                        crypto_code: crypto.crypto_code,
                        result
                    }
                })

                this.investmentData = investmentData
            } catch (error) {
                console.log(error)
            }
        },
        formatCurrency(value) {
            return Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency: 'ARS',
                minimumFractionDigits: 2
            }).format(value)
        }
    }
}
</script>