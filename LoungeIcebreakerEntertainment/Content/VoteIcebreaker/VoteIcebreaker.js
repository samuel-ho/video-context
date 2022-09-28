import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

import fonts from "../../../../styles/fonts";

import ConfettiBox from "../../../ConfettiBox";
import { ConfettiBox2 } from "../../../Assets/ConfettiBox2/ConfettiBox2";
import LikeDislikeGroup from "../Assets/LikeDislikeGroup";
import MutedText from "../Assets/MutedText"
import Paragraph from "../../../elements/Paragraph";
const iceBreakers = require("../../../../icebreakers.json");

const fadeIn = keyframes`
    0% {opacity:0}
    100% {opacity:1}  
`;

const InsideText = styled(Paragraph)`
    align-self: center;
    animation: ${fadeIn} 400ms ease-in-out 500ms both;
    display: inline-block;
    flex: 1 1;
    font-size: .87em;
    font-weight: ${fonts.fontWeight.bold};
    margin-bottom: 0;
    text-align: center;
`;


function Component() {
    const { icebreakers } = iceBreakers;

    const [booster, setBooster] = useState({
        position: Math.floor(Math.random() * iceBreakers.icebreakers.length),
        booster: icebreakers[Math.floor(Math.random() * iceBreakers.icebreakers.length)],
        clicks: 0,
    });

    const [showConfettiBox2, setShowConfettiBox2] = useState(false);
    
    //useEffect(() => {
        //setTimeout(()=>{
           // setShowConfettiBox2(false);
        //}, 2500);
    //});
    
    //console.log("Rendering again");
    return (
        <>
            {/**Add some conditional rendering here to decide if we want to show / not show thank you message along with our curr icebreaker */}
            <MutedText marginBottom={1}>Vote for your favorite icebreakers.</MutedText>
            <ConfettiBox marginBottom="1.5em">
                <InsideText>{booster.booster}</InsideText>
            </ConfettiBox>
            <LikeDislikeGroup booster={booster} setBooster={setBooster} showConfettiBox2={showConfettiBox2} setShowConfettiBox2={setShowConfettiBox2} />
        </>
    );
}

export default Component;