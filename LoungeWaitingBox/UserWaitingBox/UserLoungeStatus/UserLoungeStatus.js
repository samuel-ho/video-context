// External imports, installed libraries, etc
import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import fonts from "../../../../styles/fonts";

import Button from "../../../elements/Button";
import Paragraph from "../../../elements/Paragraph";
import _LoadingDots from "../../../LoadingDots/LoadingDots";
import { H4Styles } from "../../../elements/H4";
import { formatTime } from "../../LoungeUtils/LoungeUtils";

const UserStatus = styled(Paragraph)`
  ${H4Styles}
  margin-bottom: ${props => props.marginBottom ? props.marginBottom : 0}em;
`;

const MainUserStatusTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MainDescUserStatus = styled.div`    
  align-items: center;
  display: inline-flex;
  margin-bottom: ${props => props.marginBottom ? props.marginBottom : 0}em;
`;

const LoadingDots = styled(_LoadingDots)`
  margin-left: .7em;
`;

export const TimerText = styled.span`
font-weight: ${fonts.fontWeight.bold};
padding-left: 0;
`;

const WaitingTimer = ({ isReady, timeLeft }) => {
  return isReady && <TimerText>{timeLeft}</TimerText>;
};

export const Component = ({ isReady, userId, setReadiness, readyHandler, timeLeft, setIsLeaveDisabled, hideButton }) => {
  useEffect(() => {
    isReady && setIsLeaveDisabled(hideButton)
  }, [isReady, hideButton, setIsLeaveDisabled]);

  return (
    <>
      <MainUserStatusTextWrapper>
        {!isReady ? (
          <>
            <MainDescUserStatus>
              <UserStatus>Join a chat when you're ready</UserStatus>
              <LoadingDots />
            </MainDescUserStatus>
            <UserStatus>
              <small>Next chat starts in <TimerText>{formatTime(timeLeft)}</TimerText></small>
            </UserStatus>
          </>
        ) : (
            <>
            
              <MainDescUserStatus marginbottom={.25}>
                <UserStatus>Connecting you with a new group in <WaitingTimer isReady={isReady} timeLeft={formatTime(timeLeft)} /></UserStatus>
                <LoadingDots />
              </MainDescUserStatus>
              {!hideButton && (
                <Button
                  styleas={"link"}
                  color={"#D1373D"}
                  onClick={() => readyHandler(userId, setReadiness, isReady)}>
                  Cancel Joining
                </Button>
              )}
            </>
          )}
      </MainUserStatusTextWrapper>
    </>
  );
};

export default Component;

Component.propTypes = {
  isReady: PropTypes.bool,
  userId: PropTypes.string,
  setReadiness: PropTypes.func,
  readyHandler: PropTypes.func,
  timeLeft: PropTypes.any,
  setIsLeaveDisabled: PropTypes.func,
  hideButton: PropTypes.bool
};