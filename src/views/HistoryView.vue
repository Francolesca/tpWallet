<template>
    <div class="col-md-8 tran">
      <div class="panel panel-primary">
        <div class="panel panel-heading">Recent Transaction</div>
        <div class="panel-body">
         <table class="table table-hover">
         <thead id="tabhead">
          <th>Transaction ID</th>
          <th >Date</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Contact</th>
          </thead>
        <tbody>
          <tr v-for="tran in transa">
            <td>{{tran.trans_id}}</td>
            <td v-if="tran.time != 'Invalid Date'">{{tran.time}}</td>
            <td>{{tran.type}}</td>
            <td>{{tran.amount}}</td>
            <td>{{tran.contact}}</td>
          </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div> 
</template>