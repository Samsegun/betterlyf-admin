import Heading from "../ui/Heading";
import Row from "../ui/Row";
import SpecialistTableOperations from "../features/specialists/SpecialistTableOperations";
import SpecialistTable from "../features/specialists/SpecialistTable";
import AddSpecialist from "../features/specialists/AddSpecialist";

function Specialists() {
    return (
        <>
            <Row type='vertical'>
                <Heading as='h1'>All specialists</Heading>
                <SpecialistTableOperations />
            </Row>

            <Row>
                <SpecialistTable />
                <AddSpecialist />
            </Row>
        </>
    );
}

export default Specialists;
