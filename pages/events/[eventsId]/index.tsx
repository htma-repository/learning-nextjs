import { useRouter } from "next/router";
import Link from "next/link";

const AccountDetailPage = () => {
  const { query } = useRouter();

  return (
    <section>
      <h1> AccountDetailPage</h1>
      <p>{query.accountId}</p>
      <Link href={`${query.accountId}/accountDetail1`}>
        <button>Account Detail Nested</button>
      </Link>
    </section>
  );
};

export default AccountDetailPage;
