import styled from "styled-components";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import SpecialistTableOperations from "../features/specialists/SpecialistTableOperations";
import SpecialistTable from "../features/specialists/SpecialistTable";
import AddSpecialist from "../features/specialists/AddSpecialist";

const StyledPageHeading = styled.section`
    display: flex;

    flex-direction: column;
    gap: 1.6rem;
`;

function Specialists() {
    return (
        <>
            <StyledPageHeading>
                <Heading as='h1'>All specialists</Heading>
                <SpecialistTableOperations />
            </StyledPageHeading>

            <Row>
                <SpecialistTable />
                <AddSpecialist />
            </Row>
        </>
    );
}

export default Specialists;
