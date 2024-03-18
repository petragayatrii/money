import Vuex from "vuex";
import Cookie from "js-cookie";


const firebaseUrl ="https://final-project-petra-default-rtdb.asia-southeast1.firebasedatabase.app/moneycom.json?auth="
const createStore = () => {
    return new Vuex.Store ({
        state: {
            transactions: [],
            token: null,
            userData: null
        },

        getters:{
            transactionData(state){
                return state.transactions;
            },

            detailTransaction: (state) => (id) => {
                return state.transactions.find ((transaction) => transaction.id === id)
            },

            getDetailTransaction: (state) => (id)=> {
                return state.transactions.find(transaction=> transaction.id === id)
            },

            isAuthenticated(state) {
                return state.token != null
            },

            userId(state){
                return state.userData.userId;
            },

            getTotalTransaction (state) {
                let total = 0;
                for (let x of state.transactions) {
                    if (state.userData.userId !== x.userId){
                        continue;
                    }
                    
                    if (x.type === "Pengeluaran") {
                        total = total - parseInt(x.amount);
                    } else {
                        total = total + parseInt(x.amount);
                    }
                }
                return total;
            }, 
        },
        
        mutations:{
            addNewTransaction(state, payload) {
                return state.transactions.push(payload);
            },

            setTransaction (state, payload){
                state.transactions = payload
            },
            
            setToken(state,payload) {
                state.token = payload;
            },
            
            setUserData(state, payload){
                state.userData = payload
            },

            deleteTransaction(state, payload) {
                const transactions = state.transactions.filter(item => item.id !== payload)
                state.transactions = transactions;
            }
        },

        actions:{
            nuxtServerInIt ({commit}) {
                return this.$axios.get(
                    "https://final-project-petra-default-rtdb.asia-southeast1.firebasedatabase.app/moneycom.json"
                ).then(response => {
                    const transactionArray = [];
                    for (const key in response.data) {
                        transactionArray.push ({ ... response.data[key], id: key });
                    }
                    commit('SetTransaction', transactionArray)
                }) 
                .catch (e => AudioContext.error(e));
            },

            addNewTransaction ({commit}, newtransaction) {
                let transaction = {...newtransaction,
                userId : this.state.userData.userId,
                username: this.state.userData.username 
            };

                return this.$axios 
                    .post (firebaseUrl + this.state.token, transaction)
                    .then ((response) => {
                    commit('addNewTransaction', {... transaction, id: response.data.name})
                    });
            },


            authenticateUser({commit}, authData) {
                console.log("masuk authenticateUser")
                let webApiKey = "AIzaSyARKK_qgGL9zgfSkf1mDbVM-qZzJYQy1WE";
                let authUrl = authData.isLogin ?
                    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
                    : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
                
                    return this.$axios.post(authUrl + webApiKey, {
                        email: authData.email,
                        password: authData.password,
                        returnSecureToken: true,
                        displayName: authData. displayName
                    })

                    .then(response => {
                        commit ('setToken', response.data.idToken)
                        commit ("setUserData",{
                            username: response.data.displayName,
                            userId: response.data.localId,
                            email: response.data.email
                        })

                        
                        localStorage.setItem("token", response.data.idToken);
                        Cookie.set("jwt", response.data.idToken);
                        const userData = {
                            username: response.data.displayName,
                            userId: response.data.localId,
                            email: response.data.email
                         };
                    
                        

                         localStorage.setItem("user", JSON.stringify(userData));
                         Cookie.set ("acc_user", JSON.stringify(userData));
                         localStorage.setItem("tokenExpiration", 
                             new Date().getTime()+ Number.parseInt(response.data.expiresIn) * 1000);
                         Cookie.set("expirationDate", 
                             new Date ().getTime() + Number.parseInt(response.data.expiresIn)* 1000);
                        });
                        
                   

            },

            initAuth({commit, dispatch}, req){
                let token;
                let user;
                let expirationDate;

                if (req){
                    if (!req.headers.cookie){
                        return;
                    }

                    const accUserCookie = req.headers.cookie 
                    ?.split (";")
                    ?.find ((c)=> c.trim(). startsWith ("acc_user="));

                    if (!accUserCookie){
                        return;
                    }

                    const userCookie = accUserCookie.substr(accUserCookie.indexOf("=")+1);
                    user = JSON.parse(decodeURIComponent(userCookie));

                    const jwtCookie = req.headers.cookie
                    .split(";")
                    .find ((c)=> c.trim().startsWith("jwt="));

                    if (!jwtCookie){
                        return;
                    }
                    token = jwtCookie.split('=')[1];

                    expirationDate = req.headers.cookie
                    .split(";")
                    .find ((c) => c.trim().startsWith("expirationDate="))
                    .split("=")[1];
                }

                else {
                    token= localStorage.getItem('token');
                    user= JSON.parse(localStorage.getItem("user"));
                    expirationDate = localStorage.getItem("tokenExpiration");
                }

                if (new Date().getTime() > +expirationDate|| !token) {
                    console.log ("No Token or invalid token");
                    this.dispatch("logout");
                }

                commit ('setToken', token)
                commit('setUserData', user)
            },

            logout({commit}) {
                commit("setToken", null);
                Cookie.remove("jwt");
                Cookie.remove("acc_user");
                if(process.client){
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                }
            },

            getTransaction ({commit}) {
                return this.$axios.get(firebaseUrl)
                .then (response => {
                    const transactionArray = [];
                    for (const key in response.data){
                        transactionArray.push({...response.data[key], id: key})
                    }
                    commit('setTransaction', transactionArray)
                })
                .catch (e => context.error(e))
            },

            updateTransaction ({dispatch, state}, transaction) {
                return this.$axios.put (
                    "https://final-project-petra-default-rtdb.asia-southeast1.firebasedatabase.app/moneycom/"
                    +
                    transaction.id +
                    ".json?auth=" +
                    state.token,
                    transaction.newTransaction
                ). then ((res) => dispatch ("getTransaction"))
            },

            deleteTransaction({commit, state}, transactionId){
                return this.$axios.delete (
                    "https://final-project-petra-default-rtdb.asia-southeast1.firebasedatabase.app/moneycom/" +
                    transactionId +
                    ".json?auth="+
                    state.token
                ).then ((res) => commit ("deleteTransaction", transactionId))
            },



        },


    })
};

export default createStore;