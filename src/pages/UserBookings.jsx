import Heading from "../ui/Heading";
import Row from "../ui/Row";
import SpecialistTableOperations from "../features/specialists/SpecialistTableOperations";
import SpecialistTable from "../features/specialists/SpecialistTable";
import AddSpecialist from "../features/specialists/AddSpecialist";

function UserBookings() {
    return (
        <>
            <Row type='vertical'>
                <Heading as='h1'>Specialist Bookings</Heading>
                {/* <SpecialistTableOperations /> */}
            </Row>

            <Row>
                <p>My Bookings</p>
                {/* <SpecialistTable />
                <AddSpecialist /> */}
            </Row>
        </>
    );
}

export default UserBookings;
