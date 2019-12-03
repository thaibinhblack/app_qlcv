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
import * as firebase from 'firebase'
Vue.use(firebase)
Vue.use(VueDraggable)
Vue.use(Buefy)
Vue.use(VueAxios,axios)
Vue.use(VueSession)
Vue.use(JqxGrid)
Vue.config.productionTip = false
const firebaseConfig = {
  apiKey: "AIzaSyDpDiyhKlbMYe5L8jjAI_QlEas7G7JjvFU",
  authDomain: "quanlycongviec-3ad29.firebaseapp.com",
  databaseURL: "https://quanlycongviec-3ad29.firebaseio.com",
  projectId: "quanlycongviec-3ad29",
  storageBucket: "quanlycongviec-3ad29.appspot.com",
  messagingSenderId: "464757044107",
  appId: "1:464757044107:web:dad9bdd56e5c31a788f58e",
  measurementId: "G-5FLCJ545NJ"
};
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
