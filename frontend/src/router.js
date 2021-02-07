import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login.vue'
import Home from '@/pages/Home.vue'
import Countries from '@/pages/Countries.vue'
import Country from '@/pages/CountryDetail.vue'
import Account from '@/pages/Account.vue'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/account',
            name: 'account',
            component: Account
        },
        {
            path: '/countries',
            name: 'countries',
            component: Countries,
        },
        {
            path: '/countries/:cid',
            name: 'country',
            component: Country,
        }
    ]
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/assets/*']
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = localStorage.getItem('user')
    if (authRequired && !loggedIn) {
        return next('/login')
    }
    next()
})

export default router
