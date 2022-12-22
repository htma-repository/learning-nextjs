import Navigation from "../Navigation/Navigation";

import styles from "./layout.module.css";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navigation />
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;
