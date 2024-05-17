import { useMutation } from "@tanstack/react-query"
import { addCart } from "../../../services/apiCart"

function useCart() {
    const { data, mutate, isLoading } = useMutation({
        mutationFn: addCart,
        onSuccess: (data) => console.log(data)
    })

    return { data, mutate, isLoading }
}

export default useCart
