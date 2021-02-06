import Vue from 'vue'
import Vuex from 'vuex'
import { setStore, getStore, removeItem } from '@/config/utils'
import casesModule from '@/stores/cases'

Vue.use(Vuex)

const user = getStore('user')

export default new Vuex.Store({
  modules: {
    casesModule
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
  actions: {

  },
  getters: {
    getLoginUserInfo(state) {
      return state.loginUser
    }
  }
})