// External imports, installed libraries, etc
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom"
import moment from 'moment';

import useWindowSize from '../../../hooks/useWindowSize';
import {handleLeaveLounge} from "../LoungeUtils/LoungeUtils";

import Button from "../../elements/Button"
import Paragraph from "../../elements/Paragraph";
import UserImage from "../../UserImage/UserImage";
import { H4Styles } from "../../elements/H4";

const MainUserStatus = styled.div`
  align-items: center;
  display: flex;
`;

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

const UserImageWrapper = styled.div`
  margin-right: 1.7em;
`;

const MainContent = styled.div`
  text-align: center;
  padding: ${props => !props.isReady ? '2em 0' : '2em 0 0'};
`;

const JoinParagraph = styled(Paragraph)`
  max-width: 675px;
  margin: 0 auto .5em;

  :last-of-type {
    margin-bottom: 1.5em;
  }
`;

const ClosedLounge = ({ lounge, user }) => {
  const { width: currentWidth } = useWindowSize();
  const [width, setWidth] = useState(currentWidth);
  const mobileViewDownSize = 430;
  const isMobile = width < mobileViewDownSize;
  const history = useHistory();
  const startTime = moment(lounge.startDate).format('D MMMM HH:mm')
  const endTime = moment(lounge.endDate).format('HH:mm')

  useEffect(() => {
    if (currentWidth !== width) {
      setWidth(currentWidth);
    }
  }, [currentWidth, width]);

  return (
    <>
        <MainUserStatus>
            {!isMobile && (
                <UserImageWrapper>
                <UserImage src={user.picture} userName={user.name} height={70} width={70} />
                </UserImageWrapper>
            )}
            <MainUserStatusTextWrapper>
                <MainDescUserStatus>
                <UserStatus>Lounge is closed</UserStatus>
                </MainDescUserStatus>
            </MainUserStatusTextWrapper>
        </MainUserStatus>
        <MainContent >
            <JoinParagraph>This lounge is open {startTime} to {endTime} </JoinParagraph>
            <Button
                onClick={() => handleLeaveLounge(user.id, history)}>
                Leave Lounge
            </Button>
        </MainContent>
    </>
  );
};

export default ClosedLounge;

ClosedLounge.propTypes = {
  lounge: PropTypes.object, 
  user: PropTypes.object
};
