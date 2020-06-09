import VueRouter from 'vue-router'
import Vue from 'vue'
import store from '@/store'
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
            },
            {
                path: 'question',
                component: () => import('@/pages/study/question.vue')
            },
            {
                path: 'ds-du-an',
                component: () => import('@/pages/managers/congviec/tableDuAnKH.vue')
            },
            {
                path: 'ds-cv-can-theo-doi',
                component: () => import('@/pages/managers/congviec/dataCVCanTheoDoi.vue')
            }
        ]
    },
    {
        path: '/study',
        component: () => import('@/pages/study/index.vue'),
        children: [
            {
                path: 'oracle',
                component: () => import("@/pages/study/oracle/index.vue")
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
        component: () => import('@/pages/managers/congviec/indexv2.vue')
    },
    // {
    //     path: '/cong-viec2',
    //     component: () => import('@/pages/managers/congviec/indexv2.vue')
    // },
]

  
const router =  new VueRouter({
    routes: routes,
    mode: 'history'
})

router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    console.log('loading befoore')
    store.state.isLoading = true
    next()
  })
  
  router.afterEach((to, from) => {
    setTimeout(() => {
        store.state.isLoading = false
    }, 3 * 1000)
    
  })

export default router