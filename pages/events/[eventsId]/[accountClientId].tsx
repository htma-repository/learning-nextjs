import React from "react";
import { useRouter } from "next/router";

const AccountClientId = () => {
  const { push } = useRouter();

  const goToProductHandler = () => {
    push("/products");
  };

  return (
    <section>
      <h1>AccountClientId</h1>
      <button onClick={goToProductHandler}>Go to Products</button>
    </section>
  );
};

export default AccountClientId;
