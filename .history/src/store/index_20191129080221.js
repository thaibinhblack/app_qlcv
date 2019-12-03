import Vuex from 'vuex'
import Vue from 'vue'
import module_function_user from './modules/functions/users'
import module_function_rule from './modules/functions/rule'
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
        module_function_rule
    }
})