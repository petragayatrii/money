<template>
    <div>
        <header>
            <nav class="navbar bg-dark">
                <div class="container-fluid">
                    <nuxt-link to="/" class="navbar-brand text-light" href="#">
                        <img src="/images/money-bag.png" alt="Logo" width="36" height="32" class="d-inline-block align-text-top">
                    Money.com </nuxt-link>
                    <div class="d-flex">
                        <div>
                            <nuxt-link to="/user/login" type="button" class="btn btn-primary" v-if="!$store.getters.isAuthenticated">Log In</nuxt-link>
                        </div>
                        <div >
                            <a href="#" type="button" class="btn btn-primary" v-if="$store.getters.isAuthenticated" @click="logout">Log Out</a>
                        </div>
                        <div class="ms-3" >
                            <div class="text-white" v-if="$store.getters.isAuthenticated">{{ $store.state.userData.username }}</div>
                        </div>
                        
                    </div>
                </div>
            </nav>
        </header>
    </div>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$store.dispatch("logout");
            this.$router.push("/user/login")
        }
    }
}
</script>
