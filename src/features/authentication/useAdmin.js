import { useQuery } from "@tanstack/react-query";
import { checkAdminStatus } from "../../services/apiAuth";

export function useAdmin() {
    const { isLoading, data } = useQuery({
        queryKey: ["admin"],
        queryFn: checkAdminStatus,
    });

    return { isLoading, isAdmin: data };
}
