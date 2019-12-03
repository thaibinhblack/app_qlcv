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
                component: () => import('@/pages/managers/users/users.vue')
            },
            {
                path: 'rules',
                component: () => import('@/pages/managers/users/rules.vue')
            },
            {
                path: 'projects',
                component: () => import('@/pages/managers/projects/projects.vue')
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