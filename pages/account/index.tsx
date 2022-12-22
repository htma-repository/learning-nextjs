import Link from "next/link";
import { useRouter } from "next/router";

const AccountPage = () => {
  const { pathname } = useRouter();

  return (
    <section>
      <h1>User Account</h1>
      <Link href={`${pathname}/account1`}>
        <button>Account Detail</button>
      </Link>
    </section>
  );
};

export default AccountPage;
