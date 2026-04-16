import { useState, useEffect } from "react";
import Login from "./screens/Login";
import Home from "./screens/Home";
import { requestPermissionAndToken, listenToMessages } from './services/notifications';
import { saveDevice } from "./services/device";
import { logout } from './services/auth';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // done checking
    });

    return () => unsubscribe();
  }, []);

  window.onerror = function (msg, url, line, col, error) {
    alert("Error: " + msg);
  };

  const handleToggleNotifications = async (notificationStatus) => {
    const token = await requestPermissionAndToken();

    if (!token) return;

    try {
      await saveDevice(user.uid, token, !notificationStatus);
      alert(!notificationStatus ? "Device registered successfully 🚀" : "Device un-registered");
      return !notificationStatus;
    } catch (err) {
      console.error(err);
      alert("Failed to save device");
      return false;
    }
  };

  const handleLogout = async () => {
    const token = await requestPermissionAndToken();

    if (!token) return;

    console.log("logging out");
    try {
      await saveDevice(user.uid, token, false);
      await logout();
      setUser(null);
    } catch (err) {
      console.error(err);
      alert("Logout failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return <Home user={user} onToggleNotifications={handleToggleNotifications} onLogout={handleLogout} />;
}