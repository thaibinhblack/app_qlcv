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
import VueApexCharts from 'vue-apexcharts'
import JsonExcel from 'vue-json-excel'
import 'vue-cal/dist/vuecal.css'
import Vue2Editor from "vue2-editor";
import * as firebase from 'firebase'
Vue.use(Vue2Editor);
Vue.component('downloadExcel', JsonExcel)
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

//set up firebase clouse messangging

const messaging = firebase.messaging();
messaging.usePublicVapidKey("BF2u0XESRTWxjtnFvcy7hpD3Vz2RbDf3rRjrjvLdjDS7fpGy5wFwqIGeL6nmOsJciHfhPacwLIIvHAkejd3ZV7Q");

// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
messaging.getToken().then((currentToken) => {
  if (currentToken) {
    // sendTokenToServer(currentToken);
    // updateUIForPushEnabled(currentToken);
    console.log(currentToken);
  } else {
    // Show permission request.
    console.log('No Instance ID token available. Request permission to generate one.');
    // Show permission UI.
    // updateUIForPushPermissionRequired();
    // setTokenSentToServer(false);
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // showToken('Error retrieving Instance ID token. ', err);
  // setTokenSentToServer(false);
});
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
