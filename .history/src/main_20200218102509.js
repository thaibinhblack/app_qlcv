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
const firebaseConfig = {
  apiKey: "AIzaSyAr8HNhmFoSWWCV3QlVa_vvMEz-xBwDGok",
  authDomain: "qlcv-4fb4e.firebaseapp.com",
  databaseURL: "https://qlcv-4fb4e.firebaseio.com",
  projectId: "qlcv-4fb4e",
  storageBucket: "qlcv-4fb4e.appspot.com",
  messagingSenderId: "37752835054",
  appId: "1:37752835054:web:3b12f9edb243325f0c5cff",
  measurementId: "G-KSRCK346TK"
};

firebase.initializeApp(firebaseConfig)


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
import https from 'axios'

https.post('https://fcm.googleapis.com/fcm/send',{
  headers: {
    "Content-Type: application/json",
    'Authorization': 'key=AAAACMo-i-4:APA91bHzKdqTX_QoNfkj4OMhBkLsQHNDzK37B6B2sIVgif6uzMx3VH1enf28G3pJmdnpIIFxcJWhyCneCfrJLpIQ5FU5qPts4pqK2CygiZ1DDw7iVy14GRezNjyu38zN2Az10Z2YFHsc'
  }
},
{
  "notification": {
    "title": "Your Title",
    "text": "Your Text",
    "click_action": "OPEN_ACTIVITY_1" // should match to your intent filter
  },
  "data": {
    "keyname": "any value " //you can get this data as extras in your activity and this data is optional
    },
  "to" : "dmMiHhFHG1g5-C3XZ61RsA:APA91bEVCx7Q_UIxji4-uGcof6zshumArPycEsRQGKm03YWEyZbtH1ytueBYsn5XffZOQTGNdfKSRG15V6j0X5eY9ohmo4sii6d4iKc2iHa3l0gWBR-2b2eaYRyUQjAxR_rcf_4qk8D7"
}).then((response) => {
  console.log(response  )
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
