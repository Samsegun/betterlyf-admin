import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
    HiOutlineChatBubbleBottomCenterText,
    HiOutlineCheckCircle,
    HiOutlineCalendarDays,
} from "react-icons/hi2";
import { IoIosPricetag } from "react-icons/io";

import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";

import {
    formatCurrency,
    formatDistanceFromNow,
    parsedTime,
} from "../../utils/helpers";

const StyledBookingDataBox = styled.section`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);

    overflow: hidden;
`;

const Header = styled.header`
    background-color: var(--color-brand-500);
    padding: 2rem 4rem;
    color: #e0e7ff;
    font-size: 1.8rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
        height: 3.2rem;
        width: 3.2rem;
    }

    & div:first-child {
        display: flex;
        align-items: center;
        gap: 1.6rem;
        font-weight: 600;
        font-size: 1.8rem;
    }

    & span {
        font-family: "Sono";
        font-size: 2rem;
        margin-left: 4px;
        text-transform: capitalize;
    }
`;

const Section = styled.section`
    padding: 3.2rem 4rem 1.2rem;
`;

const Patient = styled.div`
    display: flex;
    align-items: center;
    /* gap: 1.2rem; */
    gap: 2rem;
    margin-bottom: 1.6rem;
    color: var(--color-grey-500);

    & p:first-of-type {
        font-weight: 500;
        color: var(--color-grey-700);
        text-transform: capitalize;
    }
`;

const Price = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.6rem 3.2rem;
    border-radius: var(--border-radius-sm);
    margin-top: 2.4rem;

    & p:last-child {
        text-transform: uppercase;
        font-size: 1.4rem;
        font-weight: 600;
    }

    svg {
        height: 2.4rem;
        width: 2.4rem;
        color: currentColor !important;
    }
`;

const Footer = styled.footer`
    padding: 1.6rem 4rem;
    font-size: 1.2rem;
    color: var(--color-grey-500);
    text-align: right;
`;

// A purely presentational component
function BookingDataBox({ booking }) {
    const {
        created_at,
        patients: {
            users: { fullName, email, imageUrl },
        },
        specialists: { fullName: specialistName, price },
        appointmentDate,
        purposeOfVisit,
        timeSlot,
    } = booking;

    return (
        <StyledBookingDataBox>
            <Header>
                <div>
                    <HiOutlineCalendarDays />
                    <p>
                        Booking with Dr.<span>{specialistName}</span>
                    </p>
                </div>

                <p>
                    {format(new Date(appointmentDate), "EEE, MMM dd yyyy")} (
                    {isToday(new Date(appointmentDate))
                        ? "Today"
                        : formatDistanceFromNow(appointmentDate)}
                    )
                </p>
            </Header>

            <Section>
                <Patient>
                    {imageUrl && (
                        <Flag src={imageUrl} alt={`avatar of ${fullName}`} />
                    )}
                    <p>
                        <span>patient name: </span>{" "}
                        <span>{fullName || " N/A"}</span>
                    </p>
                    <span>&bull;</span>
                    <p>{email}</p>
                </Patient>

                {purposeOfVisit && (
                    <DataItem
                        icon={<HiOutlineChatBubbleBottomCenterText />}
                        label='Purpose of Visit:'>
                        {purposeOfVisit}
                    </DataItem>
                )}

                <DataItem icon={<HiOutlineCheckCircle />} label='Time Slot'>
                    {parsedTime(timeSlot)}
                </DataItem>

                <Price>
                    <DataItem icon={<IoIosPricetag />} label={`Booking price:`}>
                        {formatCurrency(price)}
                    </DataItem>
                </Price>
            </Section>

            <Footer>
                <p>
                    Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
                </p>
            </Footer>
        </StyledBookingDataBox>
    );
}

export default BookingDataBox;
