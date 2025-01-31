import styled from "styled-components";
import { format, isToday } from "date-fns";
import { HiEye, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { parsedTime } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { useDeleteBooking } from "./useDeleteBooking";

const Patient = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
    text-transform: capitalize;
`;

const Stacked = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    text-transform: capitalize;

    & span:first-child {
        font-weight: 500;
    }

    & span:last-child {
        color: var(--color-grey-500);
        font-size: 1.2rem;
    }
`;

const TimeSlot = styled.div`
    font-family: "Sono";
    font-weight: 500;
`;

function BookingRow({
    booking: {
        id: bookingId,
        created_at,
        fullName,
        status,
        timeSlot,
        appointmentDate,
        specialists: { fullName: specialistName, specialization },
    },
}) {
    const navigate = useNavigate();
    // const { checkout, isCheckingOut } = useCheckout();
    const { deleteBooking, isDeleting } = useDeleteBooking();

    const statusToTagName = {
        pending: "yellow",
        confirmed: "indigo",
        completed: "green",
        cancelled: "red",
        "no-show": "silver",
    };

    return (
        <Table.Row>
            <Patient>{fullName}</Patient>

            <Stacked>
                <span>{specialistName}</span>
                <span>{specialization}</span>
            </Stacked>

            <Stacked>
                <span>
                    {isToday(new Date(appointmentDate))
                        ? "Today"
                        : formatDistanceFromNow(appointmentDate)}{" "}
                </span>
                <span>{format(new Date(appointmentDate), "MMM dd yyyy")}</span>
            </Stacked>

            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

            <TimeSlot>{parsedTime(timeSlot)}</TimeSlot>

            <Modal>
                <Menus.Menu>
                    <Menus.Toggle id={bookingId} />
                    <Menus.List id={bookingId}>
                        <Menus.Button
                            icon={<HiEye />}
                            onClick={() => navigate(`/bookings/${bookingId}`)}>
                            See details
                        </Menus.Button>

                        <Modal.Open opens='delete'>
                            <Menus.Button icon={<HiTrash />}>
                                Delete booking
                            </Menus.Button>
                        </Modal.Open>
                    </Menus.List>
                </Menus.Menu>

                <Modal.Window name='delete'>
                    <ConfirmDelete
                        resourceName='booking'
                        disabled={isDeleting}
                        onConfirm={() => deleteBooking(bookingId)}
                    />
                </Modal.Window>
            </Modal>
        </Table.Row>
    );
}

export default BookingRow;
