import { useProducts } from "../features/products/hooks/useProducts";
import Spinner from "../ui/Spinner";

function Store() {
  const { products, isLoading } = useProducts();
  if (isLoading) return <Spinner />;
  return (
    <div>
      {products?.map((product) => {
        return (
          <div key={product.product_name}>
            <p>{product.product_name}</p>
            <p>{product.product_price}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Store;
