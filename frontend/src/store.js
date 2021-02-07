import Vue from 'vue'
import Vuex from 'vuex'
import {setStore, getStore, removeItem} from '@/config/utils'
import casesModule from '@/stores/cases.js'
import countryCaseModule from '@/stores/country-case.js'

Vue.use(Vuex)

const user = getStore('user')

export default new Vuex.Store({
    modules: {
        casesModule: casesModule, countryCaseModule: countryCaseModule
    },
    state: {
        loginUser: user,
    },
    mutations: {
        setLoginUser(state, user) {
            state.loginUser = user
            setStore('user', user)
        },
        setLogoutUser(state) {
            state.loginUser = null
            removeItem('user')
        }
    },
    actions: {},
    getters: {
        /** {
      idToken: {token}
      user: {infoUserByGoogle}
    } */
        getLoginUserInfo(state) {
            return state.loginUser
        }
    }
})
