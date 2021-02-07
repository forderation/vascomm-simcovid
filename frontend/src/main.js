import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import * as mdbvue from 'mdbvue'
import infiniteScroll from "vue-infinite-scroll"
import VueNumber from 'vue-number-animation'
import Toasted from 'vue-toasted'
import {firestorePlugin} from 'vuefire'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxios from 'vue-axios'
import $axios from '@/config/axios.js'

Vue.use(firestorePlugin)
Vue.use(VueAxios, $axios)
Vue.use(Toasted)
Vue.use(VueNumber)
for (const component in mdbvue) {
    Vue.component(component, mdbvue[component])
}
Vue.use(infiniteScroll)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
