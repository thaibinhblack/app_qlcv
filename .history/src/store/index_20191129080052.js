import Vuex from 'vuex'
import Vue from 'vue'
import module_function_user from './modules/functions/users'
import module_user from './modules/functions/users'
import module_rule from './modules/functions/rule'
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
        module_rule
    }
})