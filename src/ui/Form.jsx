import styled, { css } from "styled-components";
import { breakpoints } from "../styles/breakpoints";
// import { breakpoints } from "../styles/breakpoints";

const Form = styled.form`
    ${props =>
        props.type === "regular" &&
        css`
            padding: 2.4rem 4rem;

            /* Box */
            background-color: var(--color-grey-0);
            border: 1px solid var(--color-grey-100);
            border-radius: var(--border-radius-md);
        `}

    ${props =>
        props.type === "modal" &&
        css`
            width: 250px;
            height: 80vh;

            ${breakpoints.tablet} {
                width: 500px;
            }

            ${breakpoints.laptop} {
                width: 80rem;
                height: auto;
            }
        `}
    
   
    overflow-y: scroll;
    font-size: 1.4rem;

    ${breakpoints.laptop} {
        overflow-y: hidden;
    }
`;

Form.defaultProps = {
    type: "regular",
};

export default Form;
