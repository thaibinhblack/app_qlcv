import Vuex from 'vuex'
import Vue from 'vue'
import module_function_user from './modules/functions/users'
import module_function_rule from './modules/functions/rule'
import module_function_customers from './modules/functions/customers'
import module_function_projects from './modules/functions/projects'
import module_function_danhmuc from './modules/functions/danhmuc'
import module_user from './modules/user'

Vue.use(Vuex)

const state = {
    config: {
        API_URL: 'http://127.0.0.1:8000/api/'
    }
}

export default new Vuex.Store({
    state,
    modules: {
        module_function_user,
        module_user,
        module_function_rule,
        module_function_customers,
        module_function_danhmuc,
        module_function_projects
    }
})