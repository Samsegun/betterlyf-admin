import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditSpecialist } from "../../services/apiSpecialists";

export function useCreateSpecialist() {
    const queryClient = useQueryClient();

    const { mutate: createSpecialist, isLoading: isCreating } = useMutation({
        mutationFn: createEditSpecialist,
        onSuccess: () => {
            toast.success("New speccialist successfully created");
            queryClient.invalidateQueries({ queryKey: ["specialists"] });
        },
        onError: err => toast.error(err.message),
    });

    return { isCreating, createSpecialist };
}
