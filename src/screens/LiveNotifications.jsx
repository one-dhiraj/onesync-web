import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import channel from "../services/channel";
import useNotificationStore from "../store/useNotificationStore";

export default function LiveNotifications() {
  const addNotification = useNotificationStore(
    (state) => state.addNotification,
  );

  useEffect(() => {
    channel.onmessage = (event) => {
      console.log(event);
      addNotification(event.data);
    };

    return () => {
      channel.onmessage = null;
    };
  }, []);

  const notifications = useNotificationStore((state) => state.notifications);

  const allowed = sessionStorage.getItem("allowLiveNotifications");

  if (!allowed) return <Navigate to="/" replace />;

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
    <div className={`h-screen ${bgClass} flex flex-col`}>
      {/* Header */}
      <div className="px-4 py-3 border-b flex justify-between items-center">
        <h2 className="text-sm font-semibold">Live Notifications</h2>

        <span className="text-xs text-green-500">● Live</span>
      </div>

      {/* Notifications */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {notifications.length === 0 ? (
          <p className={`${mutedText} text-sm`}>No notifications yet</p>
        ) : (
          notifications.map((n) => (
            <div key={n.id} className={` ${cardClass} rounded-lg p-3`}>
              <p className="text-sm font-bold">{n.title}</p>
              <p className={`${secondaryText} text-sm mt-2`}>{n.body}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
