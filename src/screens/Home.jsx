import { useState, useEffect, useRef } from "react";
import { listenToMessages } from "../services/notifications";
import {
  hasPasswordProvider,
  linkPassword,
  updateUserPassword,
} from "../services/auth";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { QRCodeCanvas } from "qrcode.react";
import useNotificationStore from "../store/useNotificationStore";
import channel from "../services/channel";

export default function Home({ user, onToggleNotifications, onLogout }) {
  const [isTogglingNotification, setIsTogglingNotification] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  const [password, setPassword] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const addNotification = useNotificationStore.getState().addNotification;
  const clearNotifications = useNotificationStore(
    (state) => state.clearNotifications,
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    listenToMessages((title, body) => {
      const notification = {
        id: Date.now(),
        title,
        body,
        time: new Date().toLocaleTimeString(),
      };

      // Update current window
      addNotification(notification);

      // Send to popup/other windows
      channel.postMessage(notification);
    });
  }, []);

  const [isDark, setIsDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e) => {
      setIsDark(e.matches);
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  // Theme classes
  const bgClass = isDark
    ? "bg-[#0f172a] text-white"
    : "bg-[#f8fafc] text-gray-900";

  const cardClass = isDark
    ? "bg-slate-800 border-slate-600"
    : "bg-white border-gray-200 shadow-xl";

  const secondaryText = isDark ? "text-gray-300" : "text-gray-600";

  const mutedText = isDark ? "text-gray-400" : "text-gray-500";

  const inputClass = isDark
    ? "bg-white/10 border-white/10 text-white placeholder:text-gray-400"
    : "bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500";

  return (
    <div className={`min-h-screen ${bgClass} pt-3`}>
      {showPasswordForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className={`${cardClass} p-6 rounded-xl w-80 shadow-lg`}>
            <h3 className="text-lg font-semibold mb-3">Set Password</h3>

            <input
              type="text"
              placeholder="Enter password"
              className={`w-full border px-3 py-2 rounded-lg mb-4 ${inputClass}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex gap-2">
              <button
                onClick={async () => {
                  setUpdatingPassword(true);
                  try {
                    if (!hasPasswordProvider(user)) {
                      await linkPassword(user.email, password);
                      alert("Password added!");
                    } else {
                      await updateUserPassword(password);
                      alert("Password updated!");
                    }
                    setShowPasswordForm(false);
                  } catch (err) {
                    alert(err.message);
                  } finally {
                    setUpdatingPassword(false);
                  }
                }}
                className={`flex-1 py-2 rounded-lg ${
                  updatingPassword
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-indigo-600 text-white"
                }`}
              >
                Save
              </button>

              <button
                onClick={() => setShowPasswordForm(false)}
                className="flex-1 text-black bg-gray-200 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔝 App Bar */}
      <div
        className={`w-[98vw] rounded-lg border ${cardClass} shadow-sm px-6 py-2 mx-auto flex justify-between items-center`}
      >
        <h1 className="text-xl font-semibold mt-1">One Sync</h1>

        <div className="flex items-center gap-4"></div>

        <div
          className={`relative flex items-center ${secondaryText}`}
          ref={menuRef}
        >
          <span className="text-sm mt-1 mr-1">{user.email}</span>
          {/* Settings Icon */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={`p-2 rounded-lg ${isDark ? "hover:bg-slate-600" : "hover:bg-gray-100"} transition`}
          >
            <Cog6ToothIcon className="w-5 h-5" />
          </button>

          {/* Dropdown */}
          {showMenu && (
            <div
              className={`absolute right-0 top-10 p-2 w-56 ${cardClass} border border-gray-200 rounded-lg shadow-lg z-50`}
            >
              {/* Set Password */}
              <button
                onClick={() => {
                  setShowPasswordForm(true);
                  setShowMenu(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm ${isDark ? "hover:bg-slate-700" : "hover:bg-gray-100"} rounded-lg`}
              >
                {hasPasswordProvider(user) ? "Update Password" : "Set Password"}
              </button>

              {/* Logout */}
              <button
                onClick={onLogout}
                className={`w-full text-left px-4 py-2 text-sm text-red-500 ${isDark ? "hover:bg-slate-700" : "hover:bg-gray-100"} rounded-lg`}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 📦 Main Content */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 📘 Instructions Card */}
        <div className={`${cardClass} rounded-xl shadow-sm p-5 flex flex-col`}>
          <h2 className="text-lg font-semibold mb-3">Getting Started</h2>
          <div className="flex-1 flex flex-col justify-evenly">
            {/* QR Code */}
            <div className="flex flex-col items-center mb-6">
              <div className="p-2 bg-white rounded-lg border">
                <QRCodeCanvas
                  value={`https://github.com/one-dhiraj/onesync/releases/download/${import.meta.env.VITE_RELEASE_TAG}/${import.meta.env.VITE_RELEASE_TITLE}.apk`}
                  size={160}
                />
              </div>
            </div>

            <ul className={`${mutedText} text-sm space-y-2`}>
              <li>1. Download and install the app by scanning the QR</li>
              <li>
                2. Sign in to the app with your account:{" "}
                <u className={isDark ? "text-green-500" : "text-green-600"}>
                  {user.email}
                </u>
              </li>
              <li>3. Provide the necessary device permissions for the app</li>
            </ul>
          </div>
        </div>

        {/* 🔔 Notifications */}
        <div className="flex flex-col gap-3">
          <div
            className={`${cardClass} rounded-xl shadow-sm p-5 flex justify-between items-center`}
          >
            <div className="">
              <h2 className="text-lg font-semibold ">Notifications</h2>

              {notificationEnabled ? (
                <div className={`text-sm ${mutedText}`}>
                  To check all notifications, {"\n"}
                  <href
                    onClick={() => {
                      window.open(
                        "/liveNotifications",
                        "LiveNotifications",
                        "width=600,height=600,resizable=yes,scrollbars=yes",
                      );
                    }}
                    disabled={!notificationEnabled}
                    className={`text-sm ${isDark ? "text-blue-400 hover:text-blue-300" : "text-indigo-600 hover:text-indigo-800"} cursor-pointer`}
                  >
                    open this window ↗
                  </href>
                </div>
              ) : (
                <p className={`text-sm ${mutedText}`}>
                  Notification sync is not active
                </p>
              )}
            </div>

            <button
              onClick={async () => {
                setIsTogglingNotification(true);
                let result = await onToggleNotifications(notificationEnabled);
                console.log(`notification response ${result}`);
                setNotificationEnabled(result);
                clearNotifications();
                sessionStorage.setItem("allowLiveNotifications", "true");
                setIsTogglingNotification(false);
              }}
              disabled={isTogglingNotification}
              className={`h-fit text-sm px-3 pb-2 pt-3 rounded-lg font-semibold text-white 
                ${
                  isTogglingNotification
                    ? "bg-gray-400 text-gray-500 cursor-not-allowed"
                    : notificationEnabled
                      ? "bg-gray-600 hover:bg-gray-700"
                      : "bg-indigo-600 hover:bg-indigo-700"
                }`}
            >
              {notificationEnabled ? "Disable Receive" : "Enable Receive"}
            </button>
          </div>

          {/* Sync Overview */}
          <div className={`${cardClass} rounded-2xl p-6 flex-1`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Device Card */}
              <div
                className={`rounded-2xl p-5 border ${isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"}`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="font-semibold"> Connected Devices </p>
                    <p className={`text-sm mt-1 ${secondaryText}`}>
                      {" "}
                      Android & desktop sync{" "}
                    </p>
                  </div>
                  <div className="text-3xl"> 📱 </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={secondaryText}> Notification Sync </span>
                    <span className="text-green-500 text-sm font-medium">
                      {" "}
                      Ready{" "}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Card */}
              <div
                className={`rounded-2xl p-5 border ${isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"}`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="font-semibold"> Security & Privacy </p>
                    <p className={`text-sm mt-1 ${secondaryText}`}>
                      {" "}
                      Account protected sync{" "}
                    </p>
                  </div>
                  <div className="text-3xl"> 🔒 </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={secondaryText}> Password Login </span>
                    <span className="text-sm">
                      {" "}
                      {hasPasswordProvider(user) ? "Enabled" : "Not Set"}{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Banner */}
            <div
              className={`mt-4 rounded-2xl p-5 border ${isDark ? "border-indigo-500/20 bg-indigo-500/10" : "border-indigo-200 bg-indigo-50"}`}
            >
              <div className="flex items-start gap-4">
                <div className="text-2xl"> ⚡ </div>
                <div>
                  <h3 className="font-semibold">
                    {" "}
                    Real-time Cross-device Sync{" "}
                  </h3>
                  <p
                    className={`text-sm mt-1 ${isDark ? "text-indigo-200" : "text-indigo-700"}`}
                  >
                    OneSync instantly syncs Android notifications between
                    phones, tablets, desktops, and laptops using your connected
                    account.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
