<template>
    <div class="d-block mx-auto mt-5 w-50">
        <h1 class="text-center "> SIGN UP </h1>

        <form @submit.prevent="signUp">
            <div class="form-floating mt-4">
                <input type="username" class="form-control" v-model="username" placeholder="Enter Username" name="uname" required>
                <label for="floatingInput">Username</label>
            </div>

            <div class="form-floating mt-4">
                <input type="email" class="form-control" v-model="email" placeholder="Enter Email" name="email" required>
                <label for="floatingInput">Email address</label>
            </div>

            <div class="form-floating mt-4">
                <input type="password" class="form-control" v-model="password" placeholder="Enter Password" name="psw" required>
                <label for="floatingPassword">Password</label>
            </div>

            <button type="submit" class="btn btn-primary d-block mx-auto mt-4" style="max-width: 18rem;"> Sign In </button>

            <p class="new-acc mt-4 text-center"> Sudah Punya akun? 
                <nuxt-link to="/user/login">Masuk</nuxt-link>
            </p>

        </form>
        
       
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            username: ''
        };
    },

    methods: {
        signUp(){
            
            this.$store.dispatch('authenticateUser', {
                isLogin: false,
                email: this.email,
                password: this.password,
                displayName: this.username
            }).then(response => this.$router.push('/'))
            .catch (error => {
                alert('Tidak dapat Sign Up')
            });
        }
    }
}
</script>