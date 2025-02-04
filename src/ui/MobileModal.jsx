import {
    cloneElement,
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";

import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { breakpoints } from "../styles/breakpoints";

const StyledMobileModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    background-color: var(--color-grey-0);
    border-top-right-radius: var(--border-radius-lg);
    border-bottom-right-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
    padding: 3.2rem 4rem;
    transition: all 0.5s;

    ${breakpoints.laptop} {
        display: none;
    }
`;

const MobileOverlay = styled.div`
    position: fixed;
    inset: 0;
    background-color: var(--backdrop-color);
    backdrop-filter: blur(4px);
    z-index: 999;
    transition: all 0.5s;
`;

const Button = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;
    position: absolute;
    top: 1.2rem;
    right: 1.9rem;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        /* Sometimes we need both */
        /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
        color: var(--color-grey-500);
    }
`;

const MobileModalContext = createContext();

function MobileModal({ children }) {
    const [openName, setOpenName] = useState("");
    const location = useLocation();

    const close = () => setOpenName("");
    const open = setOpenName;

    // Close modal when route changes
    useEffect(() => {
        close();
    }, [location.pathname]);

    return (
        <MobileModalContext.Provider value={{ openName, close, open }}>
            {children}
        </MobileModalContext.Provider>
    );
}

function MobileOpen({ children, opens: opensWindowName }) {
    const { open } = useContext(MobileModalContext);

    return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function MobileWindow({ children, name }) {
    const { openName, close } = useContext(MobileModalContext);
    const ref = useOutsideClick(close);

    if (name !== openName) return null;

    return createPortal(
        <MobileOverlay>
            <StyledMobileModal ref={ref}>
                <Button onClick={close}>
                    <HiXMark />
                </Button>

                <div>{cloneElement(children, { onCloseModal: close })}</div>
            </StyledMobileModal>
        </MobileOverlay>,
        document.body
    );
}

MobileModal.MobileOpen = MobileOpen;
MobileModal.MobileWindow = MobileWindow;

export default MobileModal;
