import { createContext, useState, useEffect } from "react";

import { INotification, INotificationContext } from "../utils/type";

interface IProps {
  children: React.ReactNode;
}

const NotificationContext = createContext<INotificationContext>(
  {} as INotificationContext
);

export function NotificationProvider({ children }: IProps) {
  const [notification, setNotification] = useState<INotification | null>(null);

  useEffect(() => {
    if (
      notification &&
      (notification.status === "success" || notification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification]);

  function showNotificationHandler(notificationData: INotification) {
    setNotification(notificationData);
  }

  function hideNotificationHandler() {
    setNotification(null);
  }

  const value = {
    notification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
