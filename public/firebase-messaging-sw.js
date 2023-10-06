importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyDDx2FIXbWkTRJLo3B45r5L4KQBVqhdMhY",
    authDomain: "tropify-1c360.firebaseapp.com",
    projectId: "tropify-1c360",
    storageBucket: "tropify-1c360.appspot.com",
    messagingSenderId: "683496918732",
    appId: "1:683496918732:web:8cd3776c53624f7acfbc69",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});