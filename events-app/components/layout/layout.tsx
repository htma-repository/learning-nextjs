import { Fragment, useContext } from "react";

import MainHeader from "./main-header";
import Notification from "../ui/notification";
import NotificationContext from "../../store/notification-context";

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  const { notification, showNotification, hideNotification } =
    useContext(NotificationContext);

  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
      <Notification
        title={notification?.title}
        message={notification?.message}
        status={notification?.status}
      />
    </Fragment>
  );
};

export default Layout;
