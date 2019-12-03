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
import * as firebase from 'firebase';

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
firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()
messaging.usePublicVapidKey('BAIXp5fZ0nepToKuQVYV0uww5IUDOIkWIfsaP2DFRAXJOxOfO7kXOAhA7FqLvD5nOxNP10CsUevntnvaUUJdlhc')

Notification.requestPermission().then((permission) => {
  console.log(permission)
  if (permission === 'granted') {
    console.log('Notification permission granted.');
    // TODO(developer): Retrieve an Instance ID token for use with FCM.
    // ...
  } else {
    console.log('Unable to get permission to notify.');
  }
});
// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
messaging.getToken().then((currentToken) => {
 console.log(currentToken)
 
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  showToken('Error retrieving Instance ID token. ', err);
  setTokenSentToServer(false);
});
axios.post('https://fcm.googleapis.com/fcm/send', {
   data: {
     title: "test",
     message: 'test api'
   },
   to: "euJWVyC3l5u2QuaStir-hU:APA91bHZcUdrE1ksjsnr7afu4VHUFeJoI0vRXOzPD1s4fvp-Fd1j690zjmuBR5fp2kYS7f1gxseBz-NKmSRu6BwoimnuPMrKl434-WLF2bZxyn2GxnA05Wfo5_HbFk6RKgc1hDHKEa46"
 },{
   headers: {
     Authorization: 'key=AAAAbDWts4s:APA91bEZVBF_afMh8Q4l0v19mZipFfE9ds0NgC3EOoH1QRMCNl0eZhkQE6C9K5y9KdXV309Fz3zXFRz-x-D7Ns-po4g8YTrVftl6bisVCiKPl8r0b0F99s192AkN6pfceS8ccu-sVH_E'
   }
 }).then((response) => {
   console.log(response)
 })
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
