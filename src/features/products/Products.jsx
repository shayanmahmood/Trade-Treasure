import Product from "./Product";
import useUser from "../authentication/hooks/useUser";
import { useProducts } from "./hooks/useProducts";
import { useState } from "react";

function Products() {
  const { products } = useProducts();
  const { cart } = useUser();
  const [userCart, setUserCart] = useState(cart);
  return (
    <>
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {products?.map((product) => {
          return <Product product={product} setUserCart={setUserCart} cart={userCart} key={product.id} />;
        })}
      </section>
    </>
  );
}

export default Products;
/* <script src="https://unpkg.com/ionicons@5.0.0/dist/ionicons.js"></script> */
