import React from "react";
import styled from "styled-components";

import { ReactComponent as Like } from "./like.svg";

import Colors from "../../../../styles/colors";

const LikeButton = styled.button`
    background: ${Colors.blue.gradient.top};
    border-radius: 2em;
    padding: 0.5em 1em;
    margin: 0em 0.5em;
    display: inline-block;
    cursor: pointer;
    outline: none;
    &:active {
        padding: .6em 0.9em .2em;
        background-color: #6A92FB;
    }
    &:hover {
        background-color: #173dad;
    }
`;

function Component({ onClick }) {
    return (
        <LikeButton onClick={onClick}>
            <Like aria-label={'Up vote'}/>
        </LikeButton>
    );
}

export default Component;