<template>
    <tr>
        <td scope="row"> {{ transaction.date }}</td>
        <td>{{ transaction.name }}</td>
        <td>{{ transaction.description }}</td>
        <td>{{ transaction.type === "Pemasukan" ? "+" : "-"}} Rp {{ transaction.amount }}</td>
        <td> 
            <nuxtLink :to="{name: 'transaction-transactionId-edit', params: {transactionId : transaction.id}, query: {data: transaction}}" tag="button" class="btn btn-info"> Edit </nuxtLink>
            <button type="button" class="btn btn-danger" @click="deleteTransaction"> Delete </button>
        </td>
    </tr>
</template>

<script>
export default {
    props: {
        transaction : {
            type: Object,
            default: {}
        },
        isUser: {
            type : Boolean,
            default: false
        }
    },

    methods : {
        deleteTransaction() {
            this.$store.dispatch("deleteTransaction", this.transaction.id)
        }
       }
    }

</script>