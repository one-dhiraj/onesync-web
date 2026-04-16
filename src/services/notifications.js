import { getToken } from "firebase/messaging";
import { onMessage } from "firebase/messaging";
import { messaging } from "../firebase.js";

const VAPID_KEY = "BHsMuIdxIM1yuBkgNDhC3SZ2-HPuetVq12DdGXwsmmmXYURhqvWp9fxZRDxqD3omxT0zOVN99AjRcSS7DWtvZsU";

export const requestPermissionAndToken = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      alert("Permission denied");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
    });

    return token;
  } catch (err) {
    console.error("Error getting token:", err);
    return null;
  }
};

export const listenToMessages = (callback) => {
  onMessage(messaging, (payload) => {
    console.log("Foreground message:", payload);

    const title = payload.notification?.title || payload.data?.title;
    const body = payload.notification?.body || payload.data?.body;

    new Notification(title, {
      body: body,
    });

    if (callback) callback(title, body);
  });
};