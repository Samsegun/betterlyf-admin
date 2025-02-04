import styled from "styled-components";
import { breakpoints } from "../styles/breakpoints";

const ButtonGroup = styled.div`
    display: flex;
    gap: 1.2rem;

    ${breakpoints.tablet} {
        justify-content: flex-end;
    }
`;

export default ButtonGroup;
