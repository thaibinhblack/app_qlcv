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
                component: () => import('@/pages/managers/customers/customer.vue')
            },
            {
                path: 'rules',
                component: () => import('@/pages/managers/users/rules.vue')
            },
            {
                path: 'projects',
                component: () => import('@/pages/managers/projects/projects.vue')
            },
            {
                path: 'ds-trung-tam',
                component: () =>  import('@/pages/managers/trungtam/danhsachTrungTam.vue')
            }
            
        ]
    },
    {
        path: '/login',
        component: () => import('@/pages/login.vue')
    },
    {
        path: '/project',
        component: () => import('@/pages/managers/projects/project.vue')
    }
]

export default new VueRouter({
    routes: routes,
    mode: 'history'
})