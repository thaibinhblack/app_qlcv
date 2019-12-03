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
                path: 'khach-hang',
                component: () => import('@/pages/manager/customers/customer.vue')
            },
            {
                path: 'rules',
                component: () => import('@/pages/managers/users/rules.vue')
            },
            
        ]
    },
    {
        path: '/login',
        component: () => import('@/pages/login.vue')
    },
    {
        path: '/projects',
        component: () => import('@/pages/managers/projects/projects.vue')
    }
]

export default new VueRouter({
    routes: routes,
    mode: 'history'
})