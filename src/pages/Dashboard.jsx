import DashboardLayout from "../features/dashboard/DashboardLayout";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import Heading from "../ui/Heading";
import styled from "styled-components";
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

function Dashboard() {
    return (
        <>
            <StyledPageHeading>
                <Heading as='h1'>Dashboard</Heading>
                <DashboardFilter />
            </StyledPageHeading>

            <DashboardLayout />
        </>
    );
}

export default Dashboard;
