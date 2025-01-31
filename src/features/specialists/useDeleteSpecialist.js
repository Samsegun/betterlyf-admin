import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteSpecialist as deleteSpecialistApi } from "../../services/apiSpecialists";

export function useDeleteSpecialist() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteSpecialist } = useMutation({
        mutationFn: deleteSpecialistApi,
        onSuccess: () => {
            toast.success("Specialist successfully deleted");

            queryClient.invalidateQueries({
                queryKey: ["specialists"],
            });
        },
        onError: err => toast.error(err.message),
    });

    return { isDeleting, deleteSpecialist };
}
