import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
// import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import { useSpecialists } from "./useSpecialists";
import SpecialistRow from "./SpecialistRow";
import Pagination from "../../ui/Pagination";

function SpecialistTable() {
    const { isLoading, specialists, count } = useSpecialists();
    // const [searchParams] = useSearchParams();

    if (isLoading) return <Spinner />;
    if (!specialists.length) return <Empty resourceName='specialists' />;

    // 1) FILTER
    // const filterValue = searchParams.get("specialization") || "all";

    // let filteredSpecialists;
    // if (filterValue === "all") filteredSpecialists = specialists;
    // if (filterValue === "general-practitioner")
    //     filteredSpecialists = specialists.filter(
    //         specialist => specialist.specialization === "general practitioner"
    //     );
    // if (filterValue === "dentist")
    //     filteredSpecialists = specialists.filter(
    //         specialist => specialist.specialization === "dentist"
    //     );
    // if (filterValue === "gynecologist")
    //     filteredSpecialists = specialists.filter(
    //         specialist => specialist.specialization === "gynecologist"
    //     );
    // if (filterValue === "pediatrician")
    //     filteredSpecialists = specialists.filter(
    //         specialist => specialist.specialization === "pediatrician"
    //     );
    // if (filterValue === "ophthalmologist")
    //     filteredSpecialists = specialists.filter(
    //         specialist => specialist.specialization === "ophthalmologist"
    //     );
    // if (filterValue === "physiotherapist")
    //     filteredSpecialists = specialists.filter(
    //         specialist => specialist.specialization === "physiotherapist"
    //     );

    // // 2) SORT
    // const sortBy = searchParams.get("sortBy") || "fullName-asc";
    // const [field, direction] = sortBy.split("-");
    // const modifier = direction === "asc" ? 1 : -1;
    // // const sortedSpecialists = filteredSpecialists.sort(
    // //     (a, b) => (a[field] - b[field]) * modifier
    // // );

    // // Create a new array to trigger a re-render
    // const sortedSpecialists = [...filteredSpecialists].sort((a, b) => {
    //     if (typeof a[field] === "string") {
    //         // Use localeCompare for strings (like names)
    //         return a[field].localeCompare(b[field]) * modifier;
    //     } else {
    //         // Use subtraction for numbers
    //         return (a[field] - b[field]) * modifier;
    //     }
    // });

    return (
        <Menus>
            <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
                <Table.Header>
                    <div></div>
                    <div>Name</div>
                    <div>Specialization</div>
                    <div>Price</div>
                    <div>Location</div>
                    <div></div>
                </Table.Header>

                <Table.Body
                    // data={sortedSpecialists}
                    data={specialists}
                    render={specialist => (
                        <SpecialistRow
                            key={specialist.id}
                            specialist={specialist}
                        />
                    )}
                />

                <Table.Footer>
                    <Pagination count={count} />
                </Table.Footer>
            </Table>
        </Menus>
    );
}

export default SpecialistTable;
