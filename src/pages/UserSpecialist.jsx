import Heading from "../ui/Heading";
import Row from "../ui/Row";
import SpecialistTableOperations from "../features/specialists/SpecialistTableOperations";
import SpecialistTable from "../features/specialists/SpecialistTable";
import AddSpecialist from "../features/specialists/AddSpecialist";

function UserSpecialist() {
    return (
        <>
            <Row type='vertical'>
                <Heading as='h1'>Specialist Profile</Heading>
                {/* <SpecialistTableOperations /> */}
            </Row>

            <Row>
                <p>My Specialist Profile</p>
                {/* <SpecialistTable />
                <AddSpecialist /> */}
            </Row>
        </>
    );
}

export default UserSpecialist;
