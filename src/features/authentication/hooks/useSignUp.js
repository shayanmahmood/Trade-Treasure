import { useMutation } from "@tanstack/react-query";
import { SignUp as SignUpApi } from '../../../services/apiLogninSignUp'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function useSignUp() {

    const navigate = useNavigate()

    const { mutate: SignUp, isLoading } = useMutation({
        mutationFn: SignUpApi,
        onSuccess: (user) => {
            toast.success(`${user?.user_metadata?.fullName} has been SignUp`)
            navigate('/store')
        },
        onError: (error) => {
            toast.error(`${error.message} so user cannot be SignUp`)
        }
    })

    return { SignUp, isLoading }
}