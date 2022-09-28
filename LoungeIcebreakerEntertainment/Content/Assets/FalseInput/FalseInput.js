import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

import fonts from "../../../../../styles/fonts"
import colors from "../../../../../styles/colors";

import SendButton from "../../../../Assets/PillStyleButtons/SendButton"


const ANIMATION_DELAY = 4000;

const Input = styled.input`
    border-radius: 0.2em;
    border: 1px solid ${colors.grey[2]};
    display: inline-block;
    flex: 0 0 30px;
    font-family: ${fonts.fontFamily};
    margin-bottom: 1em;
    padding: 0.25em 1em;

    &::placeholder {
        color: ${colors.grey[7]};
    }  
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-content: stretch;
`;

const Animation = keyframes`
    0% {opacity: 0};
    50% {opacity: 1};
    100% {opacity: 0};
`;

const Group = styled.div`
    display: inline-flex;
`;

const SuccessText = styled.span`
    align-content: flex-start;
    display: flex;
    width: -webkit-fill-available;
    color: ${colors.grey[7]};
    font-size: 12px;
    animation: ${Animation} ${ANIMATION_DELAY}ms ease-in-out 200ms both;
`;

function Component() {
    const [inputState, setInputState] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        const { length } = inputState;
        if (length) {
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
            }, ANIMATION_DELAY)
        }
        setInputState("");
    }

    const changeHandler = (value) => {
        setInputState(value)
    }

    return (
        <Form onSubmit={submitHandler}>
            <Input
                type="text"
                value={inputState}
                onChange={e => changeHandler(e.target.value)}
                placeholder="Enter your suggestion"
            />
            <Group>
                {(showSuccess) ? <SuccessText key={"success_sent"}>Suggestion sent, thank you!</SuccessText> : <SuccessText key="success_empty"></SuccessText>}
                <SendButton type="submit" floatRight={true} />
            </Group>
        </Form>
    )
}

export default Component;