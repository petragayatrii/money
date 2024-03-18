<template>
    <div>
     <app-transaksi-form :transaction="transactionData"></app-transaksi-form>
     
    </div>
 </template>
 
 <script>
 import TransaksiForm from "~/components/Transaksi/TransaksiForm.vue"
 export default {
    middleware: ["check-auth", "auth"], 
    asyncData ({ store, params}) {
         const transaction = store.getters.getDetailTransaction(params.transactionId);
         const transactionData = {...transaction, id:params.transactionId}
         return {transactionData}
     },
     components:{
         "app-transaksi-form": TransaksiForm,
     }
 }
 </script>