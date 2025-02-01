import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useStatsSpecialists } from "./useStatsSpecialists";
import TodayActivity from "./TodayActivity";
import BookingsChart from "./BookingsChart";
import SummaryChart from "./SummaryChart";

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

function DashboardLayout() {
    const { bookings, isLoading: isLoading1, numDays } = useRecentBookings();
    const { specialists, isLoading: isLoading2 } = useStatsSpecialists();

    if (isLoading1 || isLoading2) return <Spinner />;

    return (
        <StyledDashboardLayout>
            <Stats bookings={bookings} specialists={specialists} />

            <TodayActivity />

            <SummaryChart bookings={bookings} />

            <BookingsChart bookings={bookings} numDays={numDays} />
        </StyledDashboardLayout>
    );
}

export default DashboardLayout;
