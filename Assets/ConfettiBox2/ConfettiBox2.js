import React from "react";
import styled, { keyframes } from "styled-components";

import { ReactComponent as _Confetti } from "./assets/leftconfetti.svg";
import Box from "../../Box";

const move = keyframes`
    0% { top: -22px; left: 1050px; }
    45% { top: -22px; left: 0; }
    75% { top: -22px; left: 0; }
    100% { top: -22px; left: 1050px; }
`;
//0% and 100% => { top: -22px; left: 1050px; }

const move2 = keyframes`
    0% { top: 400px; }
    55% { top: 100px; }
    75% { top: -1000px; }
    100% { top: -22px; }
`;

function getRandomColor(){
    const colorValues = ["#BA7CAD", "#01B6A2", "#2A60EA", "#F47B3D", "#F2B102", "#EF4165"];
    const random = [Math.floor(Math.random() * colorValues.length)];
    return (colorValues[random]);
  }

const ContentBox2 = styled(Box)`
    box-shadow: 0px 10px 15px rgba(0, 0, 0, .10);
    display: flex;
    margin-bottom: ${props => props.marginBottom};
    animation: ${move} 4s forwards;
    min-height: 70px;
    background-color: ${getRandomColor()};
    overflow: hidden;
    position: relative;
    visibility: ${props => props.visibility};
    }
`;

export const Confetti = styled(_Confetti)`
    left: ${props => props.position === 'left' && '-20px'};
    right: ${props => props.position === 'right' && '0'};
    top: ${props => props.position === 'left' ? '10px' : '0'};
    transform: ${props => props.position === 'left' && 'rotate(263deg)'};
    animation: ${move2} 2s;
    position: absolute;
`;

export const ConfettiBox2 = ({ children, className, marginBottom, showConfettiBox2}) => {
    
    if (showConfettiBox2 == true){
        
        return (
            <ContentBox2 className={className} marginBottom={marginBottom} visibility={'visible'}>
                {/* <Confetti position={'left'} aria-hidden="true"/> */}
                    {children}
                {/* <Confetti position={'right'} aria-hidden="true"/> */}
            </ContentBox2>
        );
    } else if (showConfettiBox2 == false){
        
        return (
            <ContentBox2 className={className} marginBottom={marginBottom} visibility={'hidden'}>
                {/* <Confetti position={'left'} aria-hidden="true"/> */}
                    {children}
                {/* <Confetti position={'right'} aria-hidden="true"/> */}
            </ContentBox2>
        );
    }
 }

//export default Component;
