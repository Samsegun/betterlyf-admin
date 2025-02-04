import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
// import { breakpoints } from "../../styles/breakpoints";

const ChartBox = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    grid-column: 3 / span 2;

    padding: 2.4rem 3.2rem;

    & > *:first-child {
        margin-bottom: 1.6rem;
    }

    & .recharts-pie-label-text {
        font-weight: 600;
    }
`;

const startDataLight = [
    {
        status: "No-Show",
        value: 0,
        color: "#ef4444",
    },
    {
        status: "Cancelled",
        value: 0,
        color: "#f97316",
    },
    {
        status: "Pending",
        value: 0,
        color: "#eab308",
    },
    {
        status: "Confirmed",
        value: 0,
        color: "#84cc16",
    },
    {
        status: "Completed",
        value: 0,
        color: "#22c55e",
    },
];

const startDataDark = [
    {
        status: "No-Show",
        value: 0,
        color: "#b91c1c",
    },
    {
        status: "Cancelled",
        value: 0,
        color: "#c2410c",
    },
    {
        status: "Pending",
        value: 0,
        color: "#a16207",
    },
    {
        status: "Confirmed",
        value: 0,
        color: "#4d7c0f",
    },
    {
        status: "Completed",
        value: 0,
        color: "#15803d",
    },
];

function prepareData(startData, bookings) {
    // A bit ugly code, but sometimes this is what it takes when working with real data 😅

    function incArrayValue(arr, field) {
        return arr.map(obj =>
            obj.status === field ? { ...obj, value: obj.value + 1 } : obj
        );
    }

    // be mindful of Status starting with uppercase!
    const data = bookings
        .reduce((arr, cur) => {
            const status = cur.status;
            if (status === "pending") return incArrayValue(arr, "Pending");
            if (status === "confirmed") return incArrayValue(arr, "Confirmed");
            if (status === "cancelled") return incArrayValue(arr, "Cancelled");
            if (status === "completed") return incArrayValue(arr, "Completed");
            if (status === "no-show") return incArrayValue(arr, "No-Show");
            return arr;
        }, startData)
        .filter(obj => obj.value > 0);

    return data;
}

function SummaryChart({ bookings }) {
    const { isDarkMode } = useDarkMode();
    const startData = isDarkMode ? startDataDark : startDataLight;
    const data = prepareData(startData, bookings);

    return (
        <ChartBox>
            <Heading as='h2'>Bookings status summary</Heading>
            <ResponsiveContainer width='100%' height={240}>
                <PieChart>
                    <Pie
                        data={data}
                        nameKey='status'
                        dataKey='value'
                        innerRadius={85}
                        outerRadius={110}
                        cx='40%'
                        cy='50%'
                        paddingAngle={3}>
                        {data.map(entry => (
                            <Cell
                                fill={entry.color}
                                stroke={entry.color}
                                key={entry.status}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                        verticalAlign='middle'
                        align='right'
                        width='30%'
                        layout='vertical'
                        iconSize={15}
                        iconType='circle'
                    />
                </PieChart>
            </ResponsiveContainer>
        </ChartBox>
    );
}

export default SummaryChart;
