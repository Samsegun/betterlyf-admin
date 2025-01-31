import styled from "styled-components";
import { Link } from "react-router-dom";

import Tag from "../../ui/Tag";
import Button from "../../ui/Button";

const StyledTodayItem = styled.li`
    display: grid;
    /* grid-template-columns: 9rem 2rem 1fr 7rem 9rem; */
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
    align-items: center;

    font-size: 1.4rem;
    padding: 0.8rem 0;
    border-bottom: 1px solid var(--color-grey-100);

    &:first-child {
        border-top: 1px solid var(--color-grey-100);
    }
`;

const Guest = styled.div`
    font-weight: 500;
    text-transform: capitalize;
`;

function TodayItem({ activity }) {
    const {
        id,
        status,
        patients: { users },
        specialists: { fullName: specialistName },
    } = activity;
    const patientName = users.fullName.split(" ").at(0) || "User";

    return (
        <StyledTodayItem>
            {status === "confirmed" && <Tag type='green'>Confirmed</Tag>}
            {status === "pending" && <Tag type='blue'>Pending</Tag>}

            <div>
                <Guest>{patientName}</Guest>
                booked Dr. <Guest>{specialistName}</Guest>
            </div>

            <Button
                size='small'
                variation='primary'
                as={Link}
                to={`/view/${id}`}>
                View Booking
            </Button>
        </StyledTodayItem>
    );
}

export default TodayItem;
