// External imports, installed libraries, etc
import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import colors from "../../styles/colors";

import _Box, { boxPaddingHorizontal, boxPaddingVertical, boxBorderRadius } from "../Box";
import UserWaitingBox from "./UserWaitingBox";
import ClosedLounge from "./ClosedLounge";
import LoungeTopDetails from "./LoungeTopDetails";
import LoungeInfoDetails from "./LoungeInfoDetails";

const LoungeWaitingBox = styled(_Box)`  
  padding: 0;
`;

const Main = styled.div`
  background: ${colors.white};
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  border-bottom-left-radius: ${boxBorderRadius};
  border-bottom-right-radius: ${boxBorderRadius};
  margin-top: -32px;
  padding: ${boxPaddingVertical * 1.45}rem ${boxPaddingHorizontal * 1.45}rem;
`;

export const Component = ({ lounge, loungeId, isReady, user, setReadiness, readyHandler, timeLeft, totalWaveTime, hasEventStarted, marginBottom, randomGroup, guests, notEnoughUsers}) => {
  const [isLeaveDisabled, setIsLeaveDisabled] = useState(false);
  return (
    <LoungeWaitingBox marginBottom={marginBottom}>
      <LoungeTopDetails lounge={lounge} guests={guests} />
      <Main>
        <LoungeInfoDetails
          lounge={lounge}
          user={user}
          isLeaveDisabled={isLeaveDisabled}
        />
        
        {!hasEventStarted ? (
          <ClosedLounge
            lounge={lounge}
            user={user}
          />
        ) : (
          <UserWaitingBox
          loungeId={loungeId} 
          isReady={isReady}
          setReadiness={setReadiness}
          readyHandler={readyHandler}
          timeLeft={timeLeft}
          user={user}
          totalWaveTime={totalWaveTime}
          setIsLeaveDisabled={setIsLeaveDisabled}
          randomGroup={randomGroup}
          notEnoughUsers={notEnoughUsers}
          /> 
        )}
      </Main>
    </LoungeWaitingBox>
  );
};

export default Component;

Component.propTypes = {
  loungeId: PropTypes.string,
  isReady: PropTypes.bool,
  readyHandler: PropTypes.func,
  timeLeft: PropTypes.any,
  totalWaveTime: PropTypes.number,
  setReadiness: PropTypes.func,
  picture: PropTypes.string,
  name: PropTypes.string,
};