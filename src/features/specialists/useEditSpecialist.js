import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditSpecialist } from "../../services/apiSpecialists";

export function useEditSpecialist() {
    const queryClient = useQueryClient();

    const { mutate: editSpecialist, isLoading: isEditing } = useMutation({
        mutationFn: ({ newSpecialistData, id }) =>
            createEditSpecialist(newSpecialistData, id),
        onSuccess: () => {
            toast.success("Specialist successfully edited");
            queryClient.invalidateQueries({ queryKey: ["specialists"] });
        },
        onError: err => toast.error(err.message),
    });

    return { isEditing, editSpecialist };
}
