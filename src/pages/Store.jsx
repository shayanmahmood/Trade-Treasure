import Button from "../components/Buttons/Button";
import Products from "../features/products/Products";
import { useProducts } from "../features/products/hooks/useProducts";
import Spinner from "../ui/Spinner";

function Store() {
  const { isLoading } = useProducts();
  if (isLoading) return <Spinner />;
  return (<>
    <Products />
    <Button path='/cart' title='Cart' />
  </>)
}

export default Store;
