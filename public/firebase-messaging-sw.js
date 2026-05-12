importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyBobozBbJe5xtjlNALmXB9RFr_kz25rQUo",
  authDomain: "onesync-analog.firebaseapp.com",
  projectId: "onesync-analog",
  storageBucket: "onesync-analog.firebasestorage.app",
  messagingSenderId: "543375347255",
  appId: "1:543375347255:web:e489c54c7f8f43742df9b2",
};

firebase.initializeApp({
  apiKey: "AIzaSyBobozBbJe5xtjlNALmXB9RFr_kz25rQUo",
  authDomain: "onesync-analog.firebaseapp.com",
  projectId: "onesync-analog",
  storageBucket: "onesync-analog.firebasestorage.app",
  messagingSenderId: "543375347255",
  appId: "1:543375347255:web:e489c54c7f8f43742df9b2",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Background message:", payload);

  const title = payload.notification?.title || payload.data?.title;
  const body = payload.notification?.body || payload.data?.body;

  // self.registration.showNotification(title, {
  //   body: body,
  // });
});