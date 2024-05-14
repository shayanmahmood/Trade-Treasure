import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { LogIn } from "../../../services/apiLogninSignUp"
import toast from "react-hot-toast"

export function useLogin() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }) => LogIn({
            email,
            password
        })
        ,
        onSuccess: (user) => {
            toast.success("User logged in successfully")
            queryClient.setQueryData(["user"], user.user)
            navigate('/store')
        },
        onError: (err) => {
            toast.error("User cannot be Login")
            console.log(err)
        }
    })

    return { login, isLoading }
}