import { useQuery } from "@tanstack/react-query";
import { getTodaysActivity } from "../../services/apiBookings";

export function useTodayActivity() {
    const { isLoading, data: activities } = useQuery({
        queryFn: getTodaysActivity,
        queryKey: ["today-activity"],
    });

    return { activities, isLoading };
}
