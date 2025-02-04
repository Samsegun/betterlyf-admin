import styled from "styled-components";
import { HiMenu } from "react-icons/hi";

import Logo from "./Logo";
import AdminNav from "./AdminNav";
import { MobileNav, StyledHamburger } from "./MobileMenu";
import MobileModal from "./MobileModal";
import { breakpoints } from "../styles/breakpoints";

const StyledSidebar = styled.aside`
    background-color: var(--color-grey-0);
    padding: 2.5rem 2.4rem;
    border-right: 1px solid var(--color-grey-100);
    grid-area: sidebar;

    display: flex;
    justify-content: space-between;
    align-items: center;

    ${breakpoints.laptop} {
        flex-direction: column;
        justify-content: flex-start;

        gap: 3.2rem;
        padding: 3.2rem 2.4rem;
    }
`;

function Sidebar() {
    return (
        <StyledSidebar>
            <Logo />

            <MobileModal>
                <MobileModal.MobileOpen opens='mobile'>
                    <StyledHamburger>
                        <HiMenu size={36} />
                    </StyledHamburger>
                </MobileModal.MobileOpen>

                <MobileModal.MobileWindow name='mobile'>
                    <MobileNav />
                </MobileModal.MobileWindow>
            </MobileModal>

            <AdminNav />
        </StyledSidebar>
    );
}

export default Sidebar;
