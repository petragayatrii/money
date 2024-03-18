<template>
    <div>
        <div class="row pt-3 text-start">
            <div class="card border-primary mb-3">
            <div class="card-header"> {{transactions.nama}} - {{transactions.tanggal}}</div>
            <div class="card-body text-primary">
              <h5 class="card-title"> Rp{{transactions.nominal}},- </h5>
              <p class="card-text"> {{transactions.deskripsi}}</p>
            </div>
            </div>
            </div>
    </div>
    
</template>

<script>
export default {
    middleware: ["check-auth", "auth"],
    asyncData ({store, params}) {
        const transaction = store.getters.getDetailTransaction(params.transactionId);
        return {transaction}
    } 
}
</script>