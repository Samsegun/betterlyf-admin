import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import Empty from "../../ui/Empty";
import { useBookingStatus } from "./useBookingStatus";
import ConfirmStatus from "../../ui/ConfirmStatus";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const { booking, isLoading } = useBooking();
    const { deleteBooking, isDeleting } = useDeleteBooking();
    const { changeBookingStatus, isChangingBookingStatus } = useBookingStatus();

    const moveBack = useMoveBack();
    const navigate = useNavigate();

    if (isLoading) return <Spinner />;
    if (!booking) return <Empty resourceName='booking' />;

    const { status, id: bookingId } = booking;

    const statusToTagName = {
        pending: "yellow",
        confirmed: "indigo",
        completed: "green",
        cancelled: "red",
        "no-show": "silver",
    };

    return (
        <>
            <Row type='horizontal'>
                <HeadingGroup>
                    <Heading as='h1'>Booking #{bookingId}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status.replace("-", " ")}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <ButtonGroup>
                {status === "pending" && (
                    <>
                        <Modal>
                            <Modal.Open opens='confirm'>
                                <Button variation='confirm'>
                                    Confirm booking
                                </Button>
                            </Modal.Open>

                            <Modal.Window name='confirm'>
                                <ConfirmStatus
                                    resourceName='booking'
                                    status='confirm'
                                    disabled={isChangingBookingStatus}
                                    onConfirm={() =>
                                        changeBookingStatus(
                                            { bookingId, status: "confirmed" },
                                            {
                                                onSettled: () => navigate(-1),
                                            }
                                        )
                                    }
                                />
                            </Modal.Window>
                        </Modal>

                        <Modal>
                            <Modal.Open opens='cancelled'>
                                <Button variation='secondary'>
                                    Cancel booking
                                </Button>
                            </Modal.Open>

                            <Modal.Window name='cancelled'>
                                <ConfirmStatus
                                    resourceName='booking'
                                    status='cancel'
                                    disabled={isChangingBookingStatus}
                                    onConfirm={() =>
                                        changeBookingStatus(
                                            { bookingId, status: "cancelled" },
                                            {
                                                onSettled: () => navigate(-1),
                                            }
                                        )
                                    }
                                />
                            </Modal.Window>
                        </Modal>
                    </>
                )}

                {status === "confirmed" && (
                    <>
                        <Modal>
                            <Modal.Open opens='completed'>
                                <Button variation='primary'>
                                    Complete booking
                                </Button>
                            </Modal.Open>

                            <Modal.Window name='completed'>
                                <ConfirmStatus
                                    resourceName='booking'
                                    status='complete'
                                    disabled={isChangingBookingStatus}
                                    onConfirm={() =>
                                        changeBookingStatus(
                                            { bookingId, status: "completed" },
                                            {
                                                onSettled: () => navigate(-1),
                                            }
                                        )
                                    }
                                />
                            </Modal.Window>
                        </Modal>

                        <Modal>
                            <Modal.Open opens='no-show'>
                                <Button variation='secondary'>No Show!</Button>
                            </Modal.Open>

                            <Modal.Window name='no-show'>
                                <ConfirmStatus
                                    resourceName='booking'
                                    status='No-show'
                                    disabled={isChangingBookingStatus}
                                    onConfirm={() =>
                                        changeBookingStatus(
                                            { bookingId, status: "no-show" },
                                            {
                                                onSettled: () => navigate(-1),
                                            }
                                        )
                                    }
                                />
                            </Modal.Window>
                        </Modal>
                    </>
                )}

                <Modal>
                    <Modal.Open opens='delete'>
                        <Button variation='danger'>Delete booking</Button>
                    </Modal.Open>

                    <Modal.Window name='delete'>
                        <ConfirmDelete
                            resourceName='booking'
                            disabled={isDeleting}
                            onConfirm={() =>
                                deleteBooking(bookingId, {
                                    onSettled: () => navigate(-1),
                                })
                            }
                        />
                    </Modal.Window>
                </Modal>

                <Button variation='secondary' onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;
