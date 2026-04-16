import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

// Generate or reuse deviceId
const getDeviceId = () => {
  let deviceId = localStorage.getItem("deviceId");

  if (!deviceId) {
    deviceId = "web_" + crypto.randomUUID();
    localStorage.setItem("deviceId", deviceId);
  }

  return deviceId;
};

const getDeviceName = () => {
  const ua = navigator.userAgent;

  if (ua.includes("Chrome")) return "Chrome Browser";
  if (ua.includes("Firefox")) return "Firefox Browser";
  if (ua.includes("Edge")) return "Edge Browser";

  return "Web Browser";
};

export const saveDevice = async (userId, token, canReceive) => {
  const deviceId = getDeviceId();

  await setDoc(
    doc(db, "users", userId, "devices", deviceId),
    {
      token,
      name: getDeviceName(),
      canReceive: canReceive,
      canSend: false,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  return deviceId;
};