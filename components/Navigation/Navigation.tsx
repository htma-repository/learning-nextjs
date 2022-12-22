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
    title: "Account",
    href: "/account",
  },
];

const Navigation = () => {
  return (
    <header>
      <nav className={styles.navigation}>
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
