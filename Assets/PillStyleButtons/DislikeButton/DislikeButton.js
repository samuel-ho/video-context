import React from "react";
import styled from "styled-components";

import { ReactComponent as Dislike } from "./dislike.svg";

import colors from "../../../../styles/colors";

const DislikeButton = styled.button`
    background: ${colors.red.gradient.top};
    border-radius: 2em;
    padding: .7em 1em .3em;
    margin: 0em 0.5em;
    display: inline-block;
    cursor: pointer;
    outline: none;
    &:active {
        padding: .6em 0.9em .2em;
        background-color: #F47B73;
    }
    &:hover {
        background-color: #a61f16;
    }
`;

function Component({ onClick }) {
    return (
        <DislikeButton onClick={onClick}>
            <Dislike aria-label={'Down vote'}/>
        </DislikeButton >
    );
}

export default Component;