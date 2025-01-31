import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: user => {
            queryClient.setQueryData(["user"], user.user);
            navigate("/dashboard", { replace: true });
        },

        // const { mutate: login, isLoading } = useMutation({
        //     mutationFn: ({ email, password }) => loginApi({ email, password }),
        //     onSuccess: async user => {
        //         // Fetch the current user to ensure we have the full profile
        //         const currentUser = await getCurrentUser();

        //         queryClient.setQueryData(["user"], currentUser);

        //         // Detailed logging for debugging
        //         console.log("Current User:", currentUser);

        //         // Navigation based on role
        //         if (currentUser?.userProfile?.role === "admin") {
        //             navigate("/dashboard", { replace: true });
        //         } else if (currentUser?.userProfile?.role === "user") {
        //             navigate("/user-dashboard", { replace: true });
        //         } else {
        //             console.error("No valid role found", currentUser);
        //             navigate("/login");
        //         }
        //     },
        onError: err => {
            console.log("ERROR", err);
            toast.error("Provided email or password are incorrect");
        },
    });

    return { login, isLoading };
}
