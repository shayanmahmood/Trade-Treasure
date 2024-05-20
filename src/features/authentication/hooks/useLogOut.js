import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LogOut } from "../../../services/apiLogninSignUp";


export default function useLogOut() {

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { mutate: logOut, isLoading } = useMutation({
        mutationFn: LogOut
        ,
        onSuccess: () => {
            queryClient.removeQueries()
            toast.success("User LogOut successfully")
            navigate("/login", { relative: true })
        }
    }
    )

    return { logOut, isLoading }
}