import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
    return (
        <TableOperations>
            <Filter
                filterField='status'
                options={[
                    { value: "all", label: "All" },
                    { value: "pending", label: "Pending" },
                    { value: "confirmed", label: "Confirmed" },
                    { value: "completed", label: "Completed" },
                    { value: "cancelled", label: "Cancelled" },
                    { value: "no-show", label: "No Show" },
                ]}
            />

            <SortBy
                options={[
                    {
                        value: "appointmentDate-desc",
                        label: "Sort by date (recent first)",
                    },
                    {
                        value: "appointmentDate-asc",
                        label: "Sort by date (earlier first)",
                    },
                ]}
            />
        </TableOperations>
    );
}

export default BookingTableOperations;
