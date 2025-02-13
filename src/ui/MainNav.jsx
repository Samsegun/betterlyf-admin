import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAdmin } from "../features/authentication/useAdmin";
import Spinner from "./Spinner";
import AdminNav from "./AdminNav";
import RegularNav from "./RegularNav";
import { breakpoints } from "../styles/breakpoints";

export const NavList = styled.ul`
    display: none;

    ${breakpoints.laptop} {
        display: flex;
        flex-direction: column;
    }
    gap: 0.8rem;
`;

export const StyledNavLink = styled(NavLink)`
    &:link,
    &:visited {
        display: flex;

        justify-content: flex-start;
        align-items: center;
        gap: 1.2rem;

        color: var(--color-grey-600);
        font-size: 1.6rem;
        font-weight: 500;
        padding: 1.2rem 2.4rem;
        transition: all 0.3s;
    }

    /* This works because react-router places the active class on the active NavLink */
    &:hover,
    &:active,
    &.active:link,
    &.active:visited {
        color: var(--color-grey-800);
        background-color: var(--color-grey-50);
        border-radius: var(--border-radius-sm);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-400);
        transition: all 0.3s;
    }

    &:hover svg,
    &:active svg,
    &.active:link svg,
    &.active:visited svg {
        color: var(--color-brand-600);
    }
`;

function MainNav() {
    const { isLoading, isAdmin } = useAdmin();

    if (isLoading) return <Spinner />;

    console.log(isAdmin);

    return <nav>{isAdmin ? <AdminNav /> : <RegularNav />}</nav>;
}

export default MainNav;
