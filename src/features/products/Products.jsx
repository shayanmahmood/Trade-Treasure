import Product from "./Product";
import { useProducts } from "./hooks/useProducts";

function Products() {
  const { products } = useProducts();

  return (
    <>
      <section class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {products?.map((product) => {
          return <Product product={product} key={product.id} />;
        })}
      </section>
    </>
  );
}

export default Products;
/* <script src="https://unpkg.com/ionicons@5.0.0/dist/ionicons.js"></script> */
