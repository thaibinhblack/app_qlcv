import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSession from 'vue-session'
import store from './store'
import VueDraggable from 'vue-draggable'
import JqxGrid from "jqwidgets-scripts/jqwidgets-vue/vue_jqxgrid.vue";
import VueCookies from 'vue-cookies'
import 'vue2-timepicker/dist/VueTimepicker.css'
import VueApexCharts from 'vue-apexcharts'

Vue.component('apexchart', VueApexCharts)

Vue.use(VueCookies)
// set default config
VueCookies.config('30d')
Vue.use(VueDraggable)
Vue.use(Buefy)
Vue.use(VueAxios,axios)
Vue.use(VueSession)
Vue.use(JqxGrid)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
