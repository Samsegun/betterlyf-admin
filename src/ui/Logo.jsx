import styled from "styled-components";
// import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
    text-align: center;
    display: flex;
    /* flex-direction: column; */
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    font-weight: 600;
    font-size: 2rem;
`;

const Img = styled.img`
    /* height: 9.6rem;
    width: auto; */
    height: 4rem;
    width: 4rem;
    border-radius: 50%;

    @media (min-width: 768px) {
        height: 6rem;
        width: 6rem;
    }

    @media (min-width: 1280px) {
        height: 7rem;
        width: 7rem;
    }
`;

function Logo() {
    // const { isDarkMode } = useDarkMode();

    // const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png";
    const src = "/logo.png";

    return (
        <StyledLogo>
            <Img src={src} alt='Logo' />
            <span>BetterLyf</span>
        </StyledLogo>
    );
}

export default Logo;
