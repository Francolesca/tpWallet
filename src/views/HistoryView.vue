<template>
    <div class="col-md-8 tran">
      <div class="panel panel-primary">
        <div class="panel panel-heading">Recent Transaction</div>
        <div class="panel-body">
         <table class="table table-hover">
         <thead id="tabhead">
          <th>Crypto Code</th>
          <th >Crypto Amount</th>
          <th>Money</th>
          <th>Action</th>
          <th>Date</th>
          </thead>
        <tbody>
          <tr v-for="tran in history">
            <td>{{tran.crypto_code}}</td>
            <td>{{ tran.crypto_amount }}</td>
            <td>{{tran.money}}</td>
            <td>{{tran.action}}</td>
            <td>{{tran.datetime}}</td>
          </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div> 
</template>
<script>
import lab3api from '@/services/lab3api';

export default {
  name: 'HistoryView',
  components:{},
  data(){
    return{
    username: localStorage.username,
    history: {},
    }
  },
  created(){
    lab3api.getTransaction(this.username).then((res) =>{
      this.history = res.data;
    })
  }
}
</script>


