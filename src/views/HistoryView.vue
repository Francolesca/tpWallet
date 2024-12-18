<template>
  <div class="container">
    <div class="tran" v-if="!showEditForm">
      <div class="panel">
        <div class="panel-heading">Transacciones Recientes</div>
        <div class="panel-body">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Crypto</th>
                <th>Cantidad</th>
                <th>Dinero</th>
                <th>Accion</th>
                <th>Fecha</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tran in history" :key="tran._id">
                <td>{{ tran.crypto_code }}</td>
                <td>{{ tran.crypto_amount }}</td>
                <td>{{ tran.money }}</td>
                <td>{{ tran.action }}</td>
                <td>{{ tran.datetime }}</td>
                <td>
                  <button @click="editTransaction(tran)" class="btn btn-edit">Editar</button>
                  <button @click="delTransaction(tran._id)" class="btn btn-delete">Borrar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-if="showEditForm" class="edit-form">
      <h3>Editar Transacción</h3>
      <form @submit.prevent="updateTran">
        <div class="form-group">
          <label for="crypto_code">Crypto</label>
          <input type="text" v-model="selectedTranEdit.crypto_code" id="crypto_code" class="form-control" />
        </div>
        <div class="form-group">
          <label for="crypto_amount">Cantidad</label>
          <input type="text" v-model="selectedTranEdit.crypto_amount" id="crypto_amount" class="form-control" />
        </div>
        <div class="form-group">
          <label for="money">Dinero</label>
          <input type="text" v-model="selectedTranEdit.money" id="money" class="form-control" />
        </div>
        <div class="form-group">
          <label for="action">Acción</label>
          <input type="text" v-model="selectedTranEdit.action" id="action" class="form-control" />
        </div>
        <div>
          <button type="submit" class="btn btn-primary">Aceptar</button>
        </div>
        <div>
          <button @click="cancelEdit" class="btn btn-secondary">Cancelar</button>
        </div>
      </form>
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
    history: {},
    showEditForm: false,
    selectedTran: {},
    selectedTranEdit: {}
    }
  },
  created(){
    lab3api.getTransaction(localStorage.getItem('user')).then((res) =>{
      this.history = res.data.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
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
      console.log("cancelado")
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
}

.table {
  width: 100%;
  margin: 0;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 10px;
  text-align: left;
}

.table-hover tbody tr:hover {
  background-color: #f1f1f1;
}

.btn {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-edit {
  background-color: #28a745;
  color: white;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
  margin-left: 5px;
}

.edit-form {
  border: 1px solid #007bff;
  border-radius: 8px;
  padding: 20px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}
</style>



