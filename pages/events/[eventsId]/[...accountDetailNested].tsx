import { useRouter } from "next/router";

const AccountDetailNested = () => {
  const { query } = useRouter();

  console.log(query);

  return (
    <section>
      <h1>AccountDetailNested</h1>
      <p>{query.AccountDetailNested}</p>
    </section>
  );
};

export default AccountDetailNested;
