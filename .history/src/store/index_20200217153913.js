import Vuex from 'vuex'
import Vue from 'vue'
import module_function_user from './modules/functions/users'
import module_function_rule from './modules/functions/rule'
import module_function_customers from './modules/functions/customers'
import module_function_projects from './modules/functions/projects'
import module_function_danhmuc from './modules/functions/danhmuc'
import module_function_loaicv from './modules/functions/loaicongviec'
import module_user from './modules/user'
import module_chart_cv from './modules/charts/congviec.js'
import module_loaicv from './loaiCongViec'
import module_duan_kh from './du_an_kh'
import module_congviec from './congviec'
import module_duan from './duan'
import module_users from './user'
import module_dashboard from './dashboard'
import module_lich_cong_tac from './lichcongtac'
import module_setting from './setting/moduleSetting'
Vue.use(Vuex)

const state = {
    config: {
        API_URL: 'http://127.0.0.1:8000/api/',
        PUBLIC_URL: 'http://127.0.0.1:8000',
        // API_URL: 'http://10.102.13.14:8005/server_qlcv/public/api/'
    },
    loading: false
}
const getters = {
    loading: state => {
        return state.loading
    }
}

export default new Vuex.Store({
    state,
    getters,
    modules: {
        module_function_user,
        module_user,
        module_function_rule,
        module_function_customers,
        module_function_danhmuc,
        module_function_projects,
        module_function_loaicv,
        module_chart_cv,
        module_loaicv,
        module_duan_kh,
        module_congviec,
        module_duan,
        module_users,
        module_dashboard,
        module_lich_cong_tac,
        module_setting
    }
})