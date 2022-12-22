import { useRouter } from "next/router";

const ProductDetails = () => {
  const { query } = useRouter();

  return (
    <section>
      <h1>Product Detail</h1>
      <p>{query.productId}</p>
    </section>
  );
};

export default ProductDetails;
