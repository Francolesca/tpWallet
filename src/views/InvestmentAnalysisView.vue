<template>
    <div class="container">
      <h1 class="panel-heading">Análisis de Inversiones</h1>
      <table class="table">
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
<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.panel-heading {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border-radius: 8px;
  font-size: 1.5em;
  text-align: center;
}

.table {
  width: 100%;
  margin: 20px 0;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
}

.table th, .table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.table th {
  background-color: #007bff;
  color: white;
}

.profit {
  color: #28a745;
}

.loss {
  color: #dc3545;
}

.table-hover tbody tr:hover {
  background-color: #f1f1f1;
}
</style>
