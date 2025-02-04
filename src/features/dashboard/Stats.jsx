// import styled from "styled-components";
import { HiOutlineBriefcase, HiOutlineCalendarDays } from "react-icons/hi2";
import { FaUserMd } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import Stat from "./Stat";
// import { breakpoints } from "../../styles/breakpoints";
// import { formatCurrency } from "../../utils/helpers";

// const StyledStats = styled.div`
//     grid-area: stats;
// `;

function Stats({ bookings, specialists }) {
    // 1.
    const numBookings = bookings.length;
    const pendingBookings = bookings.filter(
        booking => booking.status === "pending"
    ).length;
    const confirmedBookings = bookings.filter(
        booking => booking.status === "confirmed"
    ).length;
    const numSpecialists = specialists.length;

    return (
        <>
            <Stat
                title='Bookings'
                color='blue'
                icon={<HiOutlineBriefcase />}
                value={numBookings}
            />
            <Stat
                title='Specialists'
                color='green'
                icon={<FaUserMd />}
                value={numSpecialists}
            />
            <Stat
                title='Pending Bookings'
                color='yellow'
                icon={<HiOutlineCalendarDays />}
                value={pendingBookings}
            />
            <Stat
                title='Confirmed Bookings'
                color='indigo'
                icon={<GiConfirmed />}
                value={confirmedBookings}
            />
        </>
    );
}

export default Stats;
