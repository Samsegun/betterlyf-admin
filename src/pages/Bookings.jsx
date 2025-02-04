import styled from "styled-components";

import Heading from "../ui/Heading";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import { breakpoints } from "../styles/breakpoints";

const StyledPageHeading = styled.section`
    display: flex;

    flex-direction: column;
    gap: 1.6rem;

    ${breakpoints.laptop} {
        flex-direction: row;
        justify-content: space-between;
    }
`;

function Bookings() {
    return (
        <>
            <StyledPageHeading>
                <Heading as='h1'>All bookings</Heading>
                <BookingTableOperations />
            </StyledPageHeading>

            <BookingTable />
        </>
    );
}

export default Bookings;
