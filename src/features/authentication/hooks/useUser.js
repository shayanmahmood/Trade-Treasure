import { useQuery } from "@tanstack/react-query";
import { CurrentUser } from "../../../services/apiLogninSignUp";

export default function useUser() {

    const { data: user, isLoading } = useQuery({
        queryFn: CurrentUser,
        queryKey: ['user'],
    })


    return { user, isLoading, isAuthenticated: user?.role === 'authenticated', cart: user?.user_metadata.cart }
}