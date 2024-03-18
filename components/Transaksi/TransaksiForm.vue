<template>
    <div>
        <div class="mt-4">
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="Transaksi" id="Pemasukan" value="Pemasukan" v-model="newTransaction.type">
                <label class="form-check-label" for="Pemasukan">Pemasukan</label>
            </div>

            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="Transaksi" id="Pengeluaran" value="Pengeluaran" v-model="newTransaction.type">
                <label class="form-check-label" for="Pengeluaran">Pengeluaran </label>
            </div>
        </div>

        <div>
            <div class="form-floating mt-4 mb-3">
                <input type="Nama" class="form-control" id="data-nama" placeholder="Nama Transaksi" v-model="newTransaction.name">
                <label for="data-nama">Nama Transaksi</label>
            </div>

            <div class="form-floating mt-4 mb-3">
                <input type="date" class="form-control" id="data-tanggal" placeholder="Tanggal" v-model="newTransaction.date">
                <label for="data-tanggal">Tanggal </label>
            </div>

            <div class="form-floating mt-4 mb-3">
                <input type="number" class="form-control" id="data-transaksi" placeholder="Jumlah Transaksi" v-model="newTransaction.amount">
                <label for="data-transaksi"> Jumlah Transaksi</label>
            </div>

            <div class="form-floating mt-4 mb-3">
                <input type="Description" class="form-control" id="data-deskripsi" placeholder="deskripsi" v-model="newTransaction.description">
                <label for="data-deskripsi">Deskripsi Transaksi</label>
            </div>
        </div>

        <div class="mb-5 mt-4">
          <button type="button" class="btn btn-primary" style="max-width: 18rem;" @click="addTransaction">  {{ transaction ? "update" : "submit" }}</button>
        </div>

        
    </div>
</template>

<script>

export default {
    middleware: ["check-auth", "auth"],
    props:{
        transaction: {
            type: Object,
            required: false,
            
        }
    },

    components:{
    },
    data() {
        return{
            newTransaction: this.transaction
            ? {... this.transaction}
            : {
                type:"",
                name: "",
                date: "",
                amount : undefined,
                description : ""
            }
        }
        
    },
    methods: {
        addTransaction () {
            if (!this.transaction) {
                this.$store.dispatch("addNewTransaction", this.newTransaction). then (() => {
                    this.$router.push("/");
                });
            } else {
                let { id: _, ...newTransaction } = this.newTransaction;
                this.$store
                .dispatch("updateTransaction", {newTransaction, id: this.newTransaction.id})
                .then(()=> {
                    this.$router.push("/");
                })
            }
        },

       
    }
}
</script>