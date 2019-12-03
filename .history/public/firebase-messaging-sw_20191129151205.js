// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '464757044107'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

const messaging = firebase.messaging();
self.addEventListener('push', function (event) {
    event.waitUntil(
        self.registration.pushManager.getSubscription().then(function (subscription) {
            const channel = new BroadcastChannel('sw-messages');
            channel.postMessage(event.data.json().data);
        })
    );
});

messaging.setBackgroundMessageHandler(function (payload) {
    const channel = new BroadcastChannel('sw-messages');
    let data = payload.data;
    console.log(data);
    channel.postMessage(data);
    // var notificationTitle = data.title;
    // var notificationOptions = {
    //     body: data.author + ' ' + data.actionTitle,
    // };
    // return self.registration.showNotification(notificationTitle,
    //     notificationOptions);
});

// function send_message_to_sw(msg){
//   navigator.serviceWorker.controller.postMessage("Client 1 says '"+msg+"'");
// }