import { Navigate } from "react-router-dom";
import { useEffect } from 'react';
import channel from "../services/channel";
import useNotificationStore from "../store/useNotificationStore";

export default function LiveNotifications() {

    const addNotification =
        useNotificationStore((state) => state.addNotification);

    useEffect(() => {
        channel.onmessage = (event) => {
            console.log(event);
            addNotification(event.data);
        };

        return () => {
            channel.onmessage = null;
        };
    }, []);

    const notifications = useNotificationStore(
        (state) => state.notifications
    );

    
    
    
    
    
    const allowed = sessionStorage.getItem("allowLiveNotifications");

    if (!allowed) return <Navigate to="/" replace />;

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