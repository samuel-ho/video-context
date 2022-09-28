// External imports, installed libraries, etc
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { boxPaddingHorizontal, boxPaddingVertical, boxBorderRadius} from "../../Box";
import EventTime from "../../EventTime";
import EventDate from "../../EventDate";
import LoungeGuestCounter from "../../LoungeGuestsCounter";

import _EventBox from "../../EventBox";

const Top = styled.div`
  align-items: flex-start;
  background-image: ${(props) => 'url("' + props.backgroundimage + '")'};
  background-size: 100%;
  background-position-y: center;
  border-top-left-radius: ${boxBorderRadius};
  border-top-right-radius: ${boxBorderRadius};
  box-shadow: inset 0 -125px 60px -50px #000000; /* Solid backup */
  box-shadow: inset 0 -100px 50px -40px rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: flex-end;
  min-height: 132px;
  padding: ${boxPaddingVertical*1.45}rem ${boxPaddingHorizontal*1.45}rem;
`;

const EventTimeDateArea = styled.div`
  display: flex;
  flex-grow: 1;
`;

const EventBox = styled(_EventBox)`
	align-items: center;
	display: flex;
	justify-content: center;
	padding: 8px 13px 8px 13px;

	&:first-child{
		margin-right: 10px;
	} 
`;

export const LoungeTopDetails = ({ lounge, guests}) => {
  return (
      <Top backgroundimage={lounge.banner}>
        {lounge.isEvent && (
          <EventTimeDateArea>
            <EventBox><EventDate startDate={lounge.startDate} /></EventBox>
            <EventBox><EventTime startDate={lounge.startDate} endDate={lounge.endDate} /></EventBox>
          </EventTimeDateArea>
        )}
        <LoungeGuestCounter
          count={guests ? guests.length : 0}
          openingTime={lounge.startDate}
          endTime={lounge.endDate}
        />
      </Top>
  );
};

export default LoungeTopDetails;

LoungeTopDetails.propTypes = {
  isReady: PropTypes.bool,
  readyHandler: PropTypes.func,
  timeLeft: PropTypes.any,
  setReadiness: PropTypes.func,
  userId: PropTypes.string,
  picture: PropTypes.string,
  name: PropTypes.string,
};