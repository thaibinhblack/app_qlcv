import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const state = {
    config: {
        API_URL: 'http://127.0.0.1:8000/api/'
    }
}

export default new Vuex.Store({
    state
})