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
                path: 'loai-du-an',
                component: () => import('@/pages/managers/projects/loaiDuAn.vue')
            },
            {
                path: 'du-an',
                component: () => import('@/pages/managers/projects/pageDuAn.vue')
            },
            {
                path: 'projects',
                component: () => import('@/pages/managers/projects/projects.vue')
            },
           
            {
                path: 'loai-cv',
                component: () => import('@/pages/managers/projects/loaiCongViec.vue')
            },
            {
                path: 'ds-trung-tam',
                component: () => import('@/pages/managers/trungtam/danhSachTrungTam.vue')
            },
            {
                path: 'ds-phong-ban',
                component: () => import('@/pages/managers/phongban/danhsachPhongBan.vue')
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
    },
    {
        path: 'cong-viec',
        component: () => import('@/pages/managers/congviec/index.vue')
    },
]

export default new VueRouter({
    routes: routes,
    mode: 'history'
})