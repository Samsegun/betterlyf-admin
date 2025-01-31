import { useQuery } from "@tanstack/react-query";
// import { subDays } from "date-fns";
// import { useSearchParams } from "react-router-dom";
import { getStatsSpecialists } from "../../services/apiSpecialists";

export function useStatsSpecialists() {
    // const [searchParams] = useSearchParams();

    // const numDays = !searchParams.get("last")
    //     ? 7
    //     : Number(searchParams.get("last"));
    // const queryDate = subDays(new Date(), numDays).toISOString();

    const { isLoading, data: specialists } = useQuery({
        queryFn: () => getStatsSpecialists(),
        queryKey: ["specialists"],
    });

    return { isLoading, specialists };
}
