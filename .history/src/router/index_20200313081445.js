import VueRouter from 'vue-router'
import Vue from 'vue'
import state from '@/store/state'
Vue.use(VueRouter)

const routes =  [
    {
        path: '/',
        component: () => import('@/pages/index.vue'),
        children: [
            {
                path: '',
                redirect: 'dashboard'
            },
            {
                path: 'dashboard',
                component: () => import('@/pages/managers/dashboard/index.vue')
            },
            {
                path: 'user',
                component: () => import('@/pages/managers/users/users.vue')
            },
            {
                path: 'info',
                component: () => import("@/pages/managers/users/info.vue")
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
            },
            {
                path: 'lich-cong-tac',
                component: () => import('@/pages/managers/congviec/calendar.vue')
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
        path: '/cong-viec',
        component: () => import('@/pages/managers/congviec/index.vue')
    },
]

  
const router =  new VueRouter({
    routes: routes,
    mode: 'history'
})

router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    state.isLoading = true
    next()
  })
  
  router.afterEach((to, from) => {
    state.isLoading = false
  })

export default router