// import styled from "styled-components";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import BookingDataBox from "./BookingDataBox";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";

// const Box = styled.div`
//     /* Box */
//     background-color: var(--color-grey-0);
//     border: 1px solid var(--color-grey-100);
//     border-radius: var(--border-radius-md);
//     padding: 2.4rem 4rem;
// `;

function ViewBooking() {
    const { booking, isLoading } = useBooking();

    const moveBack = useMoveBack();

    if (isLoading) return <Spinner />;

    const { id: bookingId } = booking;

    return (
        <>
            <Row type='horizontal'>
                <Heading as='h1'>Booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <ButtonGroup>
                <Button variation='secondary' onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default ViewBooking;
