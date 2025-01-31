import { NavList, StyledNavLink } from "./MainNav";
import {
    HiOutlineCalendarDays,
    HiOutlineHome,
    HiOutlineAcademicCap,
} from "react-icons/hi2";

function RegularNav() {
    return (
        <NavList>
            <li>
                <StyledNavLink to='/user-dashboard'>
                    <HiOutlineHome />
                    <span>Home</span>
                </StyledNavLink>
            </li>
            <li>
                <StyledNavLink to='/bookings-user'>
                    <HiOutlineCalendarDays />
                    <span>My Bookings</span>
                </StyledNavLink>
            </li>
            <li>
                <StyledNavLink to='/specialists-user'>
                    <HiOutlineAcademicCap />
                    <span>My Profile</span>
                </StyledNavLink>
            </li>
        </NavList>
    );
}

export default RegularNav;
