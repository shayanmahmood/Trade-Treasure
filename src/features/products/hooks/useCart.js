import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addCart } from "../../../services/apiCart"
import toast from "react-hot-toast"


function useCart() {
    const queryClient = useQueryClient()
    const { data, mutate, isLoading } = useMutation({
        mutationFn: addCart,
        onSuccess: (data) => {
            toast.success("Product has been added to cart")
            queryClient.setQueryData(["user"], data?.data?.user)
        }
    })

    return { data, mutate, isLoading }
}

export default useCart
