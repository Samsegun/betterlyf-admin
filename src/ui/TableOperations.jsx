import styled from "styled-components";
import { breakpoints } from "../styles/breakpoints";

const TableOperations = styled.div`
    display: flex;

    flex-direction: column;
    align-items: start;
    gap: 1.6rem;

    ${breakpoints.laptop} {
        flex-direction: row;
        align-items: center;
    }
`;

export default TableOperations;
