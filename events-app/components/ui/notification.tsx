import { useContext } from "react";

import classes from "./notification.module.css";
import NotificationContext from "../../store/notification-context";

interface IProps {
  title: string | undefined;
  message: string | undefined;
  status: string | undefined;
}

function Notification({ title, message, status }: IProps) {
  const { hideNotification } = useContext(NotificationContext);

  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  if (status === "pending") {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
