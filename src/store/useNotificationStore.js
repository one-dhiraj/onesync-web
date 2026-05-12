import { create } from "zustand";
import { persist } from "zustand/middleware";

const useNotificationStore = create(
  persist(
    (set) => ({
      notifications: [],

      addNotification: (notification) =>
        set((state) => ({
          notifications: [notification, ...state.notifications],
        })),

      clearNotifications: () =>
        set({
          notifications: [],
        }),
    }),
    {
      name: "onesync-notifications",
    }
  )
);

export default useNotificationStore;