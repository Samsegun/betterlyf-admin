import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmStatus = styled.div`
    width: 40rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    & p {
        color: var(--color-grey-500);
        margin-bottom: 1.2rem;
    }

    & div {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }
`;

function ConfirmStatus({
    resourceName,
    status,
    onConfirm,
    disabled,
    onCloseModal,
}) {
    return (
        <StyledConfirmStatus>
            <Heading as='h3'>
                {status} {resourceName}
            </Heading>
            <p>
                Are you sure you want to {status} this {resourceName}?
            </p>

            <div>
                <Button
                    variation='secondary'
                    disabled={disabled}
                    onClick={onCloseModal}>
                    Cancel
                </Button>
                <Button
                    variation='primary'
                    disabled={disabled}
                    onClick={onConfirm}>
                    {status}
                </Button>
            </div>
        </StyledConfirmStatus>
    );
}

export default ConfirmStatus;
