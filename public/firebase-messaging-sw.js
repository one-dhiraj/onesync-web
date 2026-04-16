importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBZKsEMSA-7Ibqa7GpEPRTbFAVo0keVd6w",
  authDomain: "one-sync-c5f90.firebaseapp.com",
  projectId: "one-sync-c5f90",
  storageBucket: "one-sync-c5f90.firebasestorage.app",
  messagingSenderId: "810269009285",
  appId: "1:810269009285:web:6c8d328f4d1783c02a50ec"
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