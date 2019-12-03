import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSession from 'vue-session'
Vue.use(Buefy)
Vue.use(VueAxios,axios)
Vue.use(VueSession)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
