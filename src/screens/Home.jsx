import { useState, useEffect, useRef } from "react";
import { listenToMessages } from "../services/notifications";
import { hasPasswordProvider, linkPassword } from '../services/auth';
import { ArrowRightOnRectangleIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { QRCodeCanvas } from "qrcode.react";

export default function Home({ user, onToggleNotifications, onLogout }) {
  const [notifications, setNotifications] = useState([]);
  const [isTogglingNotification, setIsTogglingNotification] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  const [password, setPassword] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const params = new URLSearchParams(window.location.search);
  const isPopup = params.get("mode") === "popup";

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
      setNotifications((prev) => [
        {
          id: Date.now(),
          title,
          body,
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);
    });
  }, []);

  const handleSettings = () => {

  }

  if (isPopup) {
    return (
      <div className="h-screen bg-white flex flex-col">

        {/* Header */}
        <div className="px-4 py-3 border-b flex justify-between items-center">
          <h2 className="text-sm font-semibold">
            Live Notifications
          </h2>

          <span className="text-xs text-green-500">● Live</span>
        </div>

        {/* Notifications */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {notifications.length === 0 ? (
            <p className="text-gray-400 text-sm">
              No notifications yet
            </p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className="border border-gray-200 rounded-lg p-3"
              >
                <p className="font-medium text-sm">
                  {n.title}
                </p>
                <p className="text-gray-600 text-xs">
                  {n.body}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {showPasswordForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-80 shadow-lg">

            <h3 className="text-lg font-semibold mb-3">
              Set Password
            </h3>

            <input
              type="password"
              placeholder="Enter password"
              className="w-full border px-3 py-2 rounded-lg mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex gap-2">
              <button
                onClick={async () => {
                  try {
                    await linkPassword(user.email, password);
                    alert("Password added!");
                    setShowPasswordForm(false);
                  } catch (err) {
                    alert(err.message);
                  }
                }}
                className="flex-1 bg-indigo-600 text-white py-2 rounded-lg"
              >
                Save
              </button>

              <button
                onClick={() => setShowPasswordForm(false)}
                className="flex-1 bg-gray-200 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔝 App Bar */}
      <div className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">OneSync</h1>

        <div className="flex items-center gap-4">


        </div>

        <div className="relative flex items-center" ref={menuRef}>
          <span className="text-sm text-gray-600 mt-1 mr-1">
            {user.email}
          </span>
          {/* Settings Icon */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
          >
            <Cog6ToothIcon className="w-5 h-5" />
          </button>

          {/* Dropdown */}
          {showMenu && (
            <div className="absolute right-0 top-10 p-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">

              {/* Set Password */}
              {!hasPasswordProvider(user) && (
                <button
                  onClick={() => {
                    setShowPasswordForm(true);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-lg"
                >
                  Set Password
                </button>
              )}

              {/* Logout */}
              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 rounded-lg"
              >
                Logout
              </button>

            </div>
          )}
        </div>
      </div>

      {/* 📦 Main Content */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* 📘 Instructions Card */}
        <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col">
          <h2 className="text-lg font-semibold mb-3">
            Getting Started
          </h2>
          <div className="flex-1 flex flex-col justify-evenly">
            {/* QR Code */}
            <div className="flex flex-col items-center mb-6">
              <div className="p-2 bg-white rounded-lg border">
                <QRCodeCanvas
                  value="https://github.com/one-dhiraj/onesync/releases/latest"
                  size={160}
                />
              </div>
            </div>

            <ul className="text-gray-600 text-sm space-y-2">
              <li>1. Download and install the app by scanning the QR</li>
              <li>2. Sign in to the app with your google account: <u className="text-green-600">{user.email}</u></li>
              <li>3. Provide the necessary device permissions for the app</li>
            </ul>
          </div>

        </div>

        {/* 🔔 Notifications */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-xl shadow-sm p-5 flex justify-between items-center">
            <div className="">
              <h2 className="text-lg font-semibold ">
                Notifications
              </h2>

              {notificationEnabled ? <div className="text-sm text-gray-500">
                To check all notifications, {'\n'}
                <href
                  onClick={() => {
                    window.open(window.location.origin + "?mode=popup",
                      "_blank", "width=600,height=600,resizable=yes,scrollbars=yes");
                  }}
                  disabled={!notificationEnabled}
                  className="text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer"
                >
                  open this window ↗
                </href>
              </div> :
                <p className="text-sm text-gray-500">
                  Notification sync is not active
                </p>
              }
            </div>

            <button
              onClick={async () => {
                setIsTogglingNotification(true);
                let result = await onToggleNotifications(notificationEnabled);
                console.log(`notification response ${result}`);
                setNotificationEnabled(result);
                setIsTogglingNotification(false);
              }
              }
              disabled={isTogglingNotification}
              className={`h-fit text-sm px-3 pb-2 pt-3 rounded-lg font-semibold text-white 
                ${isTogglingNotification ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : notificationEnabled
                    ? "bg-gray-600 hover:bg-gray-700"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}

            >
              {notificationEnabled ? "Disable Sync" : "Enable Sync"}
            </button>

            {/* {notifications.length === 0 ? (
              <>
                <p className="text-gray-500 text-sm">
                  No notifications yet.
                </p>
                {notificationEnabled && <p className="text-sm text-gray-500 mb-2">
                  For best real-time updates, keep this tab active or{'\n'}
                  <button
                    onClick={() => {
                      window.open(window.location.origin + "?mode=popup",
                        "_blank", "width=600,height=600,resizable=yes,scrollbars=yes");
                    }}
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    open in new window ↗
                  </button>
                </p>}
              </>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="border border-gray-200 rounded-lg p-3"
                  >
                    <p className="font-medium text-sm">
                      {n.title}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {n.body}
                    </p>
                  </div>
                ))}
              </div>
            )} */}
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-lg font-semibold mb-4">
              Features
            </h2>

            <div className="space-y-3">

              {/* Clipboard */}
              <div className="border border-gray-200 rounded-lg p-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm">Clipboard Sync</p>
                  <p className="text-xs text-gray-500">Copy text across devices</p>
                </div>
                <span className="text-xs text-gray-400">Coming soon</span>
              </div>

              {/* File Transfer */}
              <div className="border border-gray-200 rounded-lg p-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm">File Transfer</p>
                  <p className="text-xs text-gray-500">Send files between devices</p>
                </div>
                <span className="text-xs text-gray-400">Coming soon</span>
              </div>

              {/* Device Management */}
              <div className="border border-gray-200 rounded-lg p-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm">Devices</p>
                  <p className="text-xs text-gray-500">Manage connected devices</p>
                </div>
                <span className="text-xs text-gray-400">Coming soon</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}