import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import classes from "./main-navigation.module.css";

export default function MainNavigation() {
  const { data, status } = useSession();

  console.log("data", data);
  console.log("status", status);

  async function logOutHandler() {
    await signOut();
  }

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {status === "unauthenticated" && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {status === "authenticated" && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {status === "authenticated" && (
            <li>
              <button onClick={logOutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
