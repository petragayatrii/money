<template>
  <div>
    <h2 class="mt-5"> Selamat Datang, {{ $store.state.userData.username }} </h2>

    <div class="container text-center">
      <div class="row">
        <div class="col-4">
          <div class="card text-bg-success mb-3">
            <div class="card-header text-center">Tabungan Utama </div>
              <div class="card-body">
                <h5 class="card-title text-center">Rp {{ totalTransaction }}</h5>
                
              </div>
          </div>
        </div>
        
   
      </div>

  
        <div class="d-flex justify-content-end">
          <nuxt-link to="/add" type="button" class="btn btn-secondary" style="max-width: 18rem;"> Tambahkan Transaksi </nuxt-link>
        </div>

       
       
        <app-transaksi-list :dataTransactions="transactions" :isUser="true"></app-transaksi-list>

      </div>
    </div>

  
</template>

<script>
import TransaksiList from '../components/Transaksi/TransaksiList.vue'

export default {
  name: 'IndexPage',
  middleware: ["check-auth", "auth"],

  components:{
    'app-transaksi-list': TransaksiList
  },

  computed: {
    transactions(){
      const userId = this.$store.getters.userId;
      const transactions = this.$store.getters.transactionData;
      console.log (transactions)
      return transactions.filter (item => item.userId === userId);
    }, 
    totalTransaction() {
      return this.$store.getters.getTotalTransaction
    }
  },

  data(){
    return {
      data: [{
        nama : "Pak Buds"
      }],

      
    }
    
  },
    
  mounted() {
    this.$store.dispatch("getTransaction")
  },

}
</script>
