<template>
    <div class="d-block mx-auto mt-5 w-50">
        <h1 class="text-center" > LOG IN</h1>
       
        <form @submit.prevent="login">
            <div class="form-floating mb-3 mt-4">
                    <input type="email" class="form-control" v-model="email" placeholder="Enter Email" name="uname" required>
                    <label for="floatingInput">Email address</label>
                </div>

                <div class="form-floating mt-4">
                    <input type="password" class="form-control" v-model="password" placeholder="Enter Password" name="psw" required>
                    <label for="floatingPassword">Password</label>
                </div>

                <button type="submit" class="btn btn-primary d-block mx-auto mt-4" style="max-width: 18rem;"> Login </button>

                <p class="new-acc text-center mt-4"> Belum Punya akun? 
                    <nuxt-link to="/user/signup"> Buat Akun</nuxt-link>
                </p>
            </form>
        
    
    </div>
</template>

<script>
export default {
    data() {
        return {
            email:'',
            password:'',
            username:''
        }
    },
    
    methods: {
        login(){
            this.$store.dispatch('authenticateUser', {
                isLogin:true,
                email: this.email,
                password: this.password
            }).then(response => this.$router.push('/'))
            .catch (error => {
                alert('Invalid Password')
            })

            

        }, 
        
    }
}
</script>