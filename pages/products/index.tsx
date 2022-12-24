import Link from "next/link";
import { useRouter } from "next/router";

const ProductsPage = () => {
  const { pathname, query } = useRouter();

  return (
    <section>
      <h1>Products</h1>
      <Link href={`${pathname}/1`}>Product Detail</Link>
    </section>
  );
};

export default ProductsPage;
