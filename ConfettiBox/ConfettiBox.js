import React from "react";
import styled from "styled-components";

import { ReactComponent as _Confetti } from "./assets/leftconfetti.svg";
import Box from "../Box";

const ContentBox = styled(Box)`
    display: flex;
    margin-bottom: -80px;
    min-height: 70px;
    overflow: hidden;
    position: relative;
`;

const Confetti = styled(_Confetti)`
    left: ${props => props.position === 'left' && '-20px'};
    right: ${props => props.position === 'right' && '0'};
    top: ${props => props.position === 'left' ? '10px' : '0'};
    transform: ${props => props.position === 'left' && 'rotate(263deg)'};
    position: absolute;
`;

function Component({ children, className, marginBottom }) {
    return (
        <ContentBox className={className} marginBottom={marginBottom} hasShadow={false} background={"#f6f6f6"}>
            <Confetti position={'left'} aria-hidden="true"/>
            {children}
            {/* <Confetti position={'right'} aria-hidden="true"/> */}
        </ContentBox>
    );
}

export default Component;