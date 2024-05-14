import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../../services/apiProduct";

export function useProducts() {

    const { data: products, isLoading } = useQuery({
        queryFn: getProduct,
        queryKey: ['products']
    })

    return { products, isLoading }

}