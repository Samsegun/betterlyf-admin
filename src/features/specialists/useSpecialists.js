import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getSpecialists } from "../../services/apiSpecialists";
import { PAGE_SIZE } from "../../utils/constants";

export function useSpecialists() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    // FILTER
    const filterValue = searchParams.get("specialization");
    const filter =
        !filterValue || filterValue === "all"
            ? null
            : { field: "specialization", value: filterValue };
    // { field: "totalPrice", value: 5000, method: "gte" };

    // SORT
    // const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
    const sortByRaw = searchParams.get("sortBy") || "fullName-asc";
    const [field, direction] = sortByRaw.split("-");
    const sortBy = { field, direction };

    // PAGINATION
    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));

    // QUERY
    const {
        isLoading,
        data: { data: specialists, count } = {},
        error,
    } = useQuery({
        queryKey: ["specialists", filter, sortBy, page],
        queryFn: () => getSpecialists({ filter, sortBy, page }),
    });

    // PRE-FETCHING
    const pageCount = Math.ceil(count / PAGE_SIZE);

    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["specialists", filter, sortBy, page + 1],
            queryFn: () => getSpecialists({ filter, sortBy, page: page + 1 }),
        });

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["specialists", filter, sortBy, page - 1],
            queryFn: () => getSpecialists({ filter, sortBy, page: page - 1 }),
        });

    return { isLoading, error, specialists, count };
}
