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

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', 
    return null;
});

self.addEventListener('install', function (event) {
    event.waitUntil(skipWaiting());
});

self.addEventListener('activate', function (event) {
    event.waitUntil(clients.claim());
});

self.addEventListener('push', function (event) {
    var pushData = event.data.json();
    try {
        var notificationData = pushData.data;
        notificationData.data = JSON.parse(notificationData.data);
        console.log(notificationData);
        self.registration.showNotification(pushData.notification.title, notificationData);
    }
    catch (err) {
        console.log('Push error happened: ', err);
    }
});