<template>
   <app-transaksi-form></app-transaksi-form> 
</template>

<script>
import TransaksiForm from '../../components/Transaksi/TransaksiForm.vue'
export default {
    middleware:["check-auth", "auth"],
    components : {
        "app-transaksi-form": TransaksiForm
    }

    
    
   

       
    }

</script>