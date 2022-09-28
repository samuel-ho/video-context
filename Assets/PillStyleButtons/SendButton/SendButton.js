import React from "react";
import styled from "styled-components";

import { ReactComponent as Send } from "./send.svg";

import Colors from "../../../../styles/colors";

const SendButton = styled.button`
    background: ${Colors.blue.gradient.top};
    border-radius: 2em;
    padding: 0.5em 1em;
    margin: 0em 0.5em;
    display: inline-block;
    cursor: pointer;
    &:active {
        padding: 0.4em 0.9em;
        margin: 0.1em 0.5em;
    }
    ${props => props.floatRight && `align-self: flex-end;`}
`;

function Component({ onClick, floatRight, type}) {
    return (
        <SendButton 
            type={type}
            onClick={onClick} 
            floatRight={floatRight}>
            <Send aria-label="Submit"/>
        </SendButton>
    );
}

export default Component;