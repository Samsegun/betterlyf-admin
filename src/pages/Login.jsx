import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import { breakpoints } from "../styles/breakpoints";

const LoginLayout = styled.main`
    min-height: 100vh;
    display: grid;
    grid-template-columns: 320px;
    align-content: center;
    justify-content: center;
    gap: 3.2rem;
    background-color: var(--color-grey-50);

    ${breakpoints.tablet} {
        grid-template-columns: 48rem;
    }
`;

const LogoWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

function Login() {
    return (
        <LoginLayout>
            <LogoWrapper>
                <Logo />
            </LogoWrapper>
            <Heading as='h4'>Log in to your account</Heading>
            <LoginForm />
        </LoginLayout>
    );
}

export default Login;
