<template>
    <div class="row m-4">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>

            <tbody>
                <app-transaksi-item
                    v-for="data in dataTransactions"
                    :key="data.id"
                    :transaction="data"></app-transaksi-item>
            </tbody>
        </table>

        
    </div>


</template>

<script>
import TransaksiItem from './TransaksiItem.vue'

export default {
    components: {
        "app-transaksi-item" : TransaksiItem,
    },
    props: {
        dataTransactions : {
            type: Array,
            default : ''
        }
    }
}
</script>