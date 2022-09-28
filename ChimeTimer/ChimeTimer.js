// External imports, installed libraries, etc
import React from "react";
import styled from "styled-components";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

// Internal data, functions, custom hooks, etc
import colors from "../../styles/colors";
import breakpoints from "../../styles/breakpoints";
import fonts from "../../styles/fonts";

// Internal components, images, etc

const ChimeTimer = styled.div`
  background: ${colors.grey[2]};
  border-radius: 2px;
  color: ${colors.grey[8]};
  font-size: .75em;
  font-weight: ${fonts.fontWeight.medium};
  text-align: center;
  padding: 6px;

  @media (min-width: ${breakpoints.mdUp}px) {
    background: ${colors.grey[3]};
    font-size: .9em;
    padding: 0.6em 0.75em;
  }
`;

const TimerDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  font-size: .85rem;
  font-weight: ${fonts.fontWeight.bold};
  @media (min-width: ${breakpoints.mdUp}px) {
    font-size: 1rem;
  `;

const Time = styled.span`
  margin-left: 6px;
  font-size: .85rem;
  font-weight: ${fonts.fontWeight.bold};
  display: block;
  @media (min-width: ${breakpoints.mdUp}px) {
    font-size: 1rem;
  }
`;

const CircleTimerHeader = styled.h1`
  margin-right: 8px;
`;

const formatTime = (timeLeft) => {
  let mins = Math.floor(timeLeft / 60);
  let secs = timeLeft % 60;

  if (secs < 10) secs = "0" + secs;

  return mins > 0 ? (
    <>
      {mins}:{secs}
    </>
  ) : (
    <>{"00:" + secs}</>
  );
};

const Component = ({ className, timeLeft }) => {
  if (timeLeft > 60){

  return (
    <ChimeTimer className={className}>
      Chat ends in <Time>{formatTime(timeLeft)}</Time>
      </ChimeTimer>
    );
  }
  return (
    <TimerDiv>
      <CircleTimerHeader>Chat ends in</CircleTimerHeader>
      <CountdownCircleTimer isPlaying size={60} strokeWidth={4} duration={60} colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}>
        {formatTime(timeLeft)}
      </CountdownCircleTimer>
    </TimerDiv>
  );
}


export default Component;
