import styled from "styled-components";

import {
    HiOutlineCalendarDays,
    HiOutlineHome,
    HiOutlineHomeModern,
    HiOutlineUsers,
} from "react-icons/hi2";

import { StyledNavLink } from "./MainNav";
import { breakpoints } from "../styles/breakpoints";

// Hamburger
export const StyledHamburger = styled.button`
    background-color: var(--color-grey-0);
    outline: none;
    border: none;

    &:focus {
        outline: none;
    }

    ${breakpoints.laptop} {
        display: none;
    }
`;

export const MobileNavList = styled.ul`
    margin-top: 3rem;

    display: flex;
    flex-direction: column;
    gap: 2.5rem;
`;

export function MobileNav() {
    return (
        <MobileNavList>
            <li>
                <StyledNavLink to='/dashboard'>
                    <HiOutlineHome />
                    <span>Home</span>
                </StyledNavLink>
            </li>
            <li>
                <StyledNavLink to='/bookings'>
                    <HiOutlineCalendarDays />
                    <span>Bookings</span>
                </StyledNavLink>
            </li>
            <li>
                <StyledNavLink to='/specialists'>
                    <HiOutlineHomeModern />
                    <span>Specialists</span>
                </StyledNavLink>
            </li>

            <li>
                <StyledNavLink to='/users'>
                    <HiOutlineUsers />
                    <span>On-board User</span>
                </StyledNavLink>
            </li>
        </MobileNavList>
    );
}
