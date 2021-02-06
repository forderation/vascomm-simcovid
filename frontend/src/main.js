import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import GoogleAuth from '@/config/google.js'
import * as mdbvue from 'mdbvue'
import VueAxios from 'vue-axios'
import $axios from '@/config/axios.js'
import infiniteScroll from "vue-infinite-scroll"
import VueAos from 'vue-aos'
import VueNumber from 'vue-number-animation'



const gauthOption = {
  clientId: process.env.VUE_APP_GAUTH_CLIENT_ID,
  scope: 'profile email',
  prompt: 'select_account'
}

Vue.use(VueAxios, $axios)
Vue.use(VueAos)
Vue.use(VueNumber)
for (const component in mdbvue) {
  Vue.component(component, mdbvue[component])
}
Vue.use(infiniteScroll)
Vue.use(GoogleAuth, gauthOption)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
