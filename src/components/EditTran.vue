<template>
  <h3>Edit Transaction</h3>
      <form @submit.prevent="updateTrans">
        <div class="form-group">
          <label for="crypto_code">Crypto Code</label>
          <input 
            type="text"
            v-model="selectedTran.crypto_code"
            id="crypto_code"
            class="form-control"
          />
        </div>
        <div class="form-group">
        <label for="crypto_amount">Crypto Amount</label>
        <input
          type="text"
          v-model="selectedTran.crypto_amount"
          id="crypto_amount"
          class="form-control"
        />
      </div>
        <div class="form-group">
        <label for="money">Money</label>
        <input
          type="text"
          v-model="selectedTran.money"
          id="money"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="action">Action</label>
        <input
          type="text"
          v-model="selectedTran.action"
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
</template>

<script>
export default {

}
</script>

<style>

</style>