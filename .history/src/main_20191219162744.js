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
import * as firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyAMLI2Ig_IBew5MYCS3iH_wWB_pTZrNmvE",
  authDomain: "qlcv-ed447.firebaseapp.com",
  databaseURL: "https://qlcv-ed447.firebaseio.com",
  projectId: "qlcv-ed447",
  storageBucket: "qlcv-ed447.appspot.com",
  messagingSenderId: "476967849113",
  appId: "1:476967849113:web:d8dc1343a55d874291bc08",
  measurementId: "G-FHQDLRBJJ4"
};
firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging();
messaging.usePublicVapidKey('BEpNcDZIQE6n7nDApkogiUOTYWrxnG_E4e0HpdOLFX_Y2f0VvOe98JIMvl6OMdH0RhwMh5wsJJXo6cFvF8x_b9Q')
messaging.requestPermission().then(() => {
  console.log('Notification permission granted.');

  // Get Token
  messaging.getToken().then((token) => {
    console.log(token)
  })
}).catch((err) => {
  console.log('Unable to get permission to notify.', err);
});
Vue.use(VueCookies)

// set default config
VueCookies.config('30d')
Vue.use(VueDraggable)
Vue.use(Buefy)
Vue.use(VueAxios,axios)
Vue.use(VueSession)
Vue.use(JqxGrid)
Vue.config.productionTip = false
axios.post(" https://fcm.googleapis.com/fcm/send",{
  to: "d4FAIhfvIvfmiInpyLIsdp:APA91bEUPaabGH1slTBkIKH4iyEbexjmMYBYBGO5a66ku0_j5_LBLu57T_Jhc_9EgHLUOgvAFskc-tZaaQVoTMxJCWS9soAHqX8otwB46qH1JTdEeN-84i-pKHzZz20PdvdBvpVbNSgI",
  notification: {
    title: "FCM Message 123123",
    body: "This is an FCM Message 123123"
  }
},{
  headers:{
    'Authorization': "key=AAAAbw1_zJk:APA91bFMY0Q97hPijmpUJ5xwSUYrnBhN7_JOPs8_BKe34tRKLb4CY6D39CWT1-a-t2Cpzaf88QfMVAC14QOzodZNhT4FUyFppQg1lNpkFPDU7sWvUuuGIbP31i2hD9tURPHvCjpfYbMa",
    'Content-Type': 'application/json'
  }
}).then((response) => {
  console.log(response)
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
