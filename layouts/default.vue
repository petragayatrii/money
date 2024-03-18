<template>
    <div>
        <app-header></app-header>
        
        <main class="container">
            <Nuxt/>
        </main>

    </div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
    // middleware: ["check-auth", "auth"],
    components: {
        "app-header" : Header
    }
}

</script>