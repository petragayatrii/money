<template>
    <div>
       <div>
            <div class="form-floating mt-4 mb-3">
                    <input type="Nama" class="form-control" id="data-nama" placeholder="Nama Transaksi" v-model="Transaction.name">
                    <label for="data-nama"> {{ Transaction.name }}</label>
                </div>

                <div class="form-floating mt-4 mb-3">
                    <input type="date" class="form-control" id="data-tanggal" placeholder="Tanggal" v-model="Transaction.date">
                    <label for="data-tanggal">{{Transaction.date}} </label>
                </div>

                <div class="form-floating mt-4 mb-3">
                    <input type="number" class="form-control" id="data-transaksi" placeholder="Jumlah Transaksi" v-model="Transaction.amount">
                    <label for="data-transaksi"> {{Transaction.amount}}</label>
                </div>

                <div class="form-floating mt-4 mb-3">
                    <input type="Description" class="form-control" id="data-deskripsi" placeholder="deskripsi" v-model="Transaction.description">
                    <label for="data-deskripsi">{{Transaction.description}}</label>
                </div>

       </div> 
    </div>
</template>

<script>
export default {
    asyncData ({store, params}) {
        const transaction = store.getters.getDetailTransaction(params.transactionId);
        return {transaction}
    }
}
</script>