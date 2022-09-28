// External imports, installed libraries, etc
import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom"

import UseLeaveLounge from "../../../hooks/leaveLounge/useLeaveLounge"
import colors from "../../../styles/colors";

import _GreenStatusDot from "../../Assets/GreenStatusDot";
import SrOnly from '../../SrOnly';
import Button from "../../elements/Button";
import Paragraph, {ParagraphStyles} from "../../elements/Paragraph";
import { H2Styles } from "../../elements/H2";

const TitleAreaWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;

  @media (min-width: 730px) { 
    flex-direction: row;
  }
`;

const TitleWrapper= styled.div`
  flex-grow: 1;
`;

const LoungeTitle = styled.h1`
  ${H2Styles}
  margin-bottom: .6rem;
`;

const LoungeStatus = styled.div`
  ${ParagraphStyles};
  align-items: center;
  display: flex;
  margin-bottom: .7rem;
`;

const GreenStatusDot = styled(_GreenStatusDot)`
  margin-right: 6px;
`;

const MainTop = styled.div`
  border-bottom: 1px solid ${colors.grey[3]};
  margin-bottom: 1em;
`;

const LeaveLoungeButton = styled(Button)`
  margin-bottom: 1em;
  outline: none;

  @media (min-width: 900px) { 
    margin-bottom: 0;
  }
`;

export const Component = ({ lounge, user, isLeaveDisabled}) => {
  const [loungeDescIsExtended, setLoungeDescIsExtended] = useState(false);
  const history = useHistory();

  return (
        <MainTop>
          <TitleAreaWrapper>
            <TitleWrapper>
              <LoungeTitle>{lounge.name}</LoungeTitle>
              <LoungeStatus><GreenStatusDot /> Lounge open</LoungeStatus>
            </TitleWrapper>
            <div>
              <LeaveLoungeButton 
                color={"red"} 
                disabled={isLeaveDisabled}
                onClick={() =>  {
                  UseLeaveLounge(user.id, history);
                }}
              >
                Leave Lounge
              </LeaveLoungeButton>
            </div>
          </TitleAreaWrapper>
          {lounge.description && (
            lounge.description.length < 149 ? (
              <Paragraph aria-hidden="true">{lounge.description}</Paragraph>
            ) : (
              loungeDescIsExtended ? (
                <Paragraph aria-hidden="true">{lounge.description}</Paragraph>
              ) : (
                <Paragraph aria-hidden="true">{lounge.description.substring(0, 150)}{lounge.description.length > 150 && "... "}
                <Button styleas={'link'} onClick={() => {setLoungeDescIsExtended(true)}}>read more</Button></Paragraph>
              )
            )
          )}
          <SrOnly>{lounge.description}</SrOnly>
        </MainTop>
  );
};

export default Component;

Component.propTypes = {
  isReady: PropTypes.bool,
  readyHandler: PropTypes.func,
  timeLeft: PropTypes.any,
  setReadiness: PropTypes.func,
  userId: PropTypes.string,
  picture: PropTypes.string,
  name: PropTypes.string,
};