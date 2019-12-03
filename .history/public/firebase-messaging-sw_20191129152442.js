// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/6.4.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/6.4.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '464757044107'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log(' Received background message ', payload);
  var sender = JSON.parse(payload.data.message);
  var notificationTitle = 'CometChat Pro Notification';
  var notificationOptions = {
    body: payload.data.alert,
    icon: sender.data.entities.sender.entity.avatar,
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  //handle click event onClick on Web Push Notification
});