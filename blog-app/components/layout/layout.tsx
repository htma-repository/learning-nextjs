import { Fragment } from "react";

import MainNavigation from "./main-navigation";

interface IProps {
  children: React.ReactNode;
}

function Layout({ children }: IProps) {
  return (
    <Fragment>
      <MainNavigation />
      <main>{children}</main>
    </Fragment>
  );
}

export default Layout;
