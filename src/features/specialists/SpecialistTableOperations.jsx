import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function SpecialistTableOperations() {
    return (
        <TableOperations>
            <Filter
                filterField='specialization'
                options={[
                    { value: "all", label: "All" },
                    {
                        value: "general practitioner",
                        label: "G.P",
                    },
                    { value: "dentist", label: "Dentist" },
                    { value: "gynecologist", label: "Gynecologist" },
                    { value: "pediatrician", label: "Pediatrician" },
                    { value: "ophthalmologist", label: "Ophthalmologist" },
                    { value: "physiotherapist", label: "Physiotherapist" },
                ]}
            />

            <SortBy
                options={[
                    { value: "fullName-asc", label: "Sort by name (A-Z)" },
                    { value: "fullName-desc", label: "Sort by name (Z-A)" },
                    {
                        value: "specialization-asc",
                        label: "Sort by specialization (A-Z)",
                    },
                    {
                        value: "specialization-desc",
                        label: "Sort by specialization (Z-A)",
                    },
                    {
                        value: "price-desc",
                        label: "Sort by price (high first)",
                    },
                    {
                        value: "price-asc",
                        label: "Sort by price (low first)",
                    },
                ]}
            />
        </TableOperations>
    );
}

export default SpecialistTableOperations;
