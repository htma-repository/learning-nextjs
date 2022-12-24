import Link from "next/link";

import styles from "./navigation.module.css";

const menus = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Products",
    href: "/products",
  },
  {
    title: "Events",
    href: "/events",
  },
];

const Navigation = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <h1 className={styles["navigation__heading"]}>NextEvents</h1>
        <ul className={styles["navigation__links"]}>
          {menus.map((menu, index) => (
            <li key={index} className={styles["navigation__link"]}>
              <Link href={menu.href} replace>
                {menu.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
