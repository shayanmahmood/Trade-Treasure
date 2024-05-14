import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateUser } from "../../../services/apiLogninSignUp";
import toast from "react-hot-toast";

export function useUpdateUser() {
    const queryClient = useQueryClient();
    const { isLoading: isUpdating, mutate: updateUser } = useMutation({
        mutationFn: UpdateUser,

        onSuccess: (data) => {
            if (data) {
                const { user } = data
                toast.success("User Has been Updated")
                queryClient.setQueryData(["user"], user)
            }
        },

        onError: (error) => {
            console.log(error);
            toast.error("Failed to Upload User");
        },
    });

    return { updateUser, isUpdating };
}
