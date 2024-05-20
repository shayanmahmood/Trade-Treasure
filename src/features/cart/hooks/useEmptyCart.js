import toast from "react-hot-toast"
import { emptyCart as emptycart } from "../../../services/apiCart"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

function useEmptyCart() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { data, mutate: emptyCart, isLoading } = useMutation({
        mutationFn: emptycart,
        onSuccess: (data) => {
            toast.success("user has been paid")
            queryClient.setQueryData(["user"], data?.data?.user)
            navigate('/')
        }
    })

    return { data, emptyCart, isLoading }
}

export default useEmptyCart
