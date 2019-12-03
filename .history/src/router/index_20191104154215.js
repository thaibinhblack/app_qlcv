import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const routes =  [
    {
        path: '/',
        component: () => import('@/pages/index.vue'),
        children: [
            {
                path: 'user',
                component: () => import('@/pages/managers/users/index.vue')
            },
            {
                path: 'rules',
                component: () => import('@/pages/manager/users/rules.vue')
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/pages/login.vue')
    }
]

export default new VueRouter({
    routes: routes,
    mode: 'history'
})