import React from "react";
import styled from "styled-components";
import _Emoji from 'react-emoji-render';

import MutedText from "../Assets/MutedText";

import colors from "../../../../styles/colors";
import fonts from "../../../../styles/fonts";

import { favoritesListItems } from "../../constants";

const ColoredNumber = styled.span`
    color: ${colors.blue[6.5]};
    font-weight: ${fonts.fontWeight.bold};
    width: 1.25em;
    display: inline-block;
`;

const Li = styled.li`
    color: ${colors.grey[7]};
    padding-bottom: .9em;
`;

const HotRightNow = styled.div`
    color: ${colors.grey[7]};
`;

const Emoji = styled(_Emoji)`
    padding-right: 0.5em;
`;

function Component() {
    return (
        <>
            <MutedText marginBottom={1}>Top icebreakers</MutedText>
            <ol>
                {favoritesListItems.map((item, index) => {
                    return <Li key={"FAVORITE_IB_"+index}><ColoredNumber>{index + 1}</ColoredNumber> {item}</Li>
                })}
            </ol>
            <MutedText marginBottom={1}>Hot right now</MutedText>
            <HotRightNow><Emoji text=":fire:" />USPS - Changes</HotRightNow>
        </>
    );
}

export default Component;