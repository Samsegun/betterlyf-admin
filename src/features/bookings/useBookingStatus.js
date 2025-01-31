import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useBookingStatus() {
    const queryClient = useQueryClient();

    const { mutate: changeBookingStatus, isLoading: isChangingBookingStatus } =
        useMutation({
            mutationFn: ({ bookingId, status }) =>
                updateBooking(bookingId, {
                    status: status,
                }),

            onSuccess: data => {
                toast.success(`Booking #${data.id} updated to ${data.status}`);
                queryClient.invalidateQueries({ active: true });
            },

            onError: () =>
                toast.error("There was an error while updating staus"),
        });

    return { changeBookingStatus, isChangingBookingStatus };
}
