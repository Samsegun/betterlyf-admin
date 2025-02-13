import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
// import { breakpoints } from "../../styles/breakpoints";

const StyledSalesChart = styled(DashboardBox)`
    /* grid-area: bookings; */
    grid-column: 1 / -1;

    /* Hack to change grid line colors */
    & .recharts-cartesian-grid-horizontal line,
    & .recharts-cartesian-grid-vertical line {
        stroke: var(--color-grey-300);
    }
`;

function BookingsChart({ bookings, numDays }) {
    const { isDarkMode } = useDarkMode();

    const allDates = eachDayOfInterval({
        start: subDays(new Date(), numDays - 1),
        end: new Date(),
    });

    const data = allDates.map(date => {
        return {
            label: format(date, "MMM dd"),
            confirmed: bookings.filter(
                booking =>
                    isSameDay(date, new Date(booking.created_at)) &&
                    booking.status === "confirmed"
            ).length,
            pending: bookings.filter(
                booking =>
                    isSameDay(date, new Date(booking.created_at)) &&
                    booking.status === "pending"
            ).length,
        };
    });

    const colors = isDarkMode
        ? {
              confirmed: { stroke: "#4f46e5", fill: "#4f46e5" },
              pending: { stroke: "#22c55e", fill: "#22c55e" },
              text: "#e5e7eb",
              background: "#18212f",
          }
        : {
              confirmed: { stroke: "#4f46e5", fill: "#c7d2fe" },
              pending: { stroke: "#16a34a", fill: "#dcfce7" },
              text: "#374151",
              background: "#fff",
          };

    return (
        <StyledSalesChart>
            <Heading as='h2'>
                Bookings from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
                {format(allDates.at(-1), "MMM dd yyyy")}{" "}
            </Heading>

            <ResponsiveContainer height={300} width='100%'>
                <AreaChart data={data}>
                    <XAxis
                        dataKey='label'
                        tick={{ fill: colors.text }}
                        tickLine={{ stroke: colors.text }}
                    />
                    <YAxis
                        tick={{ fill: colors.text }}
                        tickLine={{ stroke: colors.text }}
                    />
                    <CartesianGrid strokeDasharray='4' />
                    <Tooltip
                        contentStyle={{ backgroundColor: colors.background }}
                    />
                    <Area
                        dataKey='confirmed'
                        type='monotone'
                        stroke={colors.confirmed.stroke}
                        fill={colors.confirmed.fill}
                        strokeWidth={2}
                        name='Confirmed'
                    />
                    <Area
                        dataKey='pending'
                        type='monotone'
                        stroke={colors.pending.stroke}
                        fill={colors.pending.fill}
                        strokeWidth={2}
                        name='Pending'
                    />
                </AreaChart>
            </ResponsiveContainer>
        </StyledSalesChart>
    );
}

export default BookingsChart;
