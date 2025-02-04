import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";
import { breakpoints } from "../styles/breakpoints";

// const StyledAppLayout = styled.div`
//     display: grid;
//     grid-template-columns: 26rem 1fr;
//     grid-template-rows: auto 1fr;
//     height: 100vh;
// `;
const StyledAppLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr auto;
    grid-template-areas:
        "sidebar"
        "header"
        "main";

    height: 100vh;

    ${breakpoints.laptop} {
        grid-template-columns: 26rem 1fr;
        grid-template-rows: auto 1fr;
        grid-template-areas:
            "sidebar header"
            "sidebar main";
    }
`;

const Main = styled.main`
    background-color: var(--color-grey-50);
    padding: 4rem 4.8rem 6.4rem;
    overflow: scroll;
    grid-area: main;
`;

const Container = styled.div`
    max-width: 120rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
`;

function AppLayout() {
    return (
        <StyledAppLayout>
            <Header />
            <Sidebar />
            <Main>
                <Container>
                    <Outlet />
                </Container>
            </Main>
        </StyledAppLayout>
    );
}

export default AppLayout;
