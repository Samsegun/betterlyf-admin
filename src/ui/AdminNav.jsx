import { NavList, StyledNavLink } from "./MainNav";
import {
    HiOutlineCalendarDays,
    // HiOutlineCog6Tooth,
    HiOutlineHome,
    HiOutlineHomeModern,
    HiOutlineUsers,
} from "react-icons/hi2";

function AdminNav() {
    return (
        <NavList>
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
            {/* <li>
                <StyledNavLink to='/settings'>
                    <HiOutlineCog6Tooth />
                    <span>Settings</span>
                </StyledNavLink>
            </li> */}
        </NavList>
    );
}

export default AdminNav;
