<template>
    <div class="col-md-8 tran" v-if="!showEditForm">
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
            <td @click="editTransaction(tran)" class="btn">Edit</td>
            <td @click="delTransaction(tran._id)" class="btn">Delete</td>
          </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div> 
    <div v-if="showEditForm" class="edit-form">
      <h3>Edit Transaction</h3>
      <form @submit.prevent="updateTran">
        <div class="form-group">
          <label for="crypto_code">Crypto Code</label>
          <input 
            type="text"
            v-model="selectedTranEdit.crypto_code"
            id="crypto_code"
            class="form-control"
          />
        </div>
        <div class="form-group">
        <label for="crypto_amount">Crypto Amount</label>
        <input
          type="text"
          v-model="selectedTranEdit.crypto_amount"
          id="crypto_amount"
          class="form-control"
        />
      </div>
        <div class="form-group">
        <label for="money">Money</label>
        <input
          type="text"
          v-model="selectedTranEdit.money"
          id="money"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="action">Action</label>
        <input
          type="text"
          v-model="selectedTranEdit.action"
          id="action"
          class="form-control"
        />
      </div>
      <div>
        <button type="submit">Ok</button>
      </div>
      <div>
        <button @click="cancelEdit">Cancel</button>
      </div>
      </form>
    </div>
</template>
<script>
import lab3api from '@/services/lab3api';

export default {
  name: 'HistoryView',
  components:{},
  data(){
    return{
    history: {},
    showEditForm: false,
    selectedTran: {},
    selectedTranEdit: {}
    }
  },
  created(){
    lab3api.getTransaction(localStorage.getItem('user')).then((res) =>{
      this.history = res.data;
    })
  },
  methods: {
    editTransaction(tran){
      this.selectedTran = tran;
      this.selectedTranEdit = tran;
      this.showEditForm = true;
    },
    cancelEdit(){
      this.selectedTran = {};
      this.showEditForm = false;
      console.log("canceled")
    },
    updateTran(){
      const id = this.selectedTran._id;
      const data = {};
      if (this.selectedTran.crypto_code != this.selectedTranEdit.crypto_code && this.selectedTranEdit.crypto_code!= '') {
        data.crypto_code = this.selectedTranEdit.crypto_code;
      }
      if (this.selectedTran.crypto_amount != this.selectedTranEdit.crypto_amount && this.selectedTranEdit.crypto_amount!= '') {
        data.crypto_amount = this.selectedTranEdit.crypto_amount;
      }
      if (this.selectedTran.money != this.selectedTranEdit.money && this.selectedTranEdit.money!= '') {
        data.money = this.selectedTranEdit.crypto_code;
      }
      lab3api.patchTransaction(id,data);
      this.showEditForm = false;
    },
    delTransaction(id){
      lab3api.delTransaction(id);
      alert('Transaction has been deleted: id ' + id);
      location.reload();
    }
  }
}
</script>


