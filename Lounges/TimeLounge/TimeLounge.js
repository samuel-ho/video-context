// External imports, installed libraries, etc
import React from "react";
import styled from "styled-components";

// Internal data, functions, custom hooks, etc
import colors from "../../../styles/colors";

// Internal components, images, etc
import _Link from "../../elements/Link";
import Box, { boxPaddingHorizontal, boxPaddingVertical } from "../../Box";
import LoungeGuestCounter from "../../LoungeGuestsCounter";
import EventStyledButton from "../../EventStyledButton";
import { H3Styles } from "../../elements/H3";
import _EventBox from "../../EventBox";
import EventDate from "../../EventDate";
import EventTime from "../../EventTime";
import SrOnly from '../../SrOnly';

const EventBox = styled(_EventBox)`
	align-items: center;
	display: flex;
	justify-content: center;
	padding: 8px 13px 8px 13px;
	&:first-child{
		margin-right: 10px;
	} 
`;

const Lounge = styled(Box)`
	background-image: ${(props) => 'url("' + props.backgroundimage + '")'};
	background-size: cover;
	background-position-y: center;
	box-shadow: inset 0 -125px 60px -50px #000000; /* Solid backup */
	box-shadow: inset 0 -100px 50px -40px rgba(0, 0, 0, 0.9);
`;

const Link = styled(_Link)`
  display: inline-block;
  padding-top: 10px;
  transition: transform 0.4s;
  width: 100%;

  &:hover,
  :focus {
    transform: translateY(-10px);
    text-decoration: none;
  } 
`;

const TopDetails = styled.div`
  display: flex;
  padding-bottom: 180px;
`;

const TopDetailsLeft = styled.div`
  display: flex;
  flex-grow: 1;
`;

const BottomDetails = styled.div`
  align-items: flex-end;
  bottom: ${boxPaddingVertical}rem;
  display: flex;
  width: calc(100% - ${boxPaddingHorizontal * 2}rem);
  position: absolute;`;

const LoungeTitle = styled.div`
  ${H3Styles};
  color: ${colors.white};
  flex-grow: 1;
  margin-bottom: 0;
  padding-right: 0.75rem;
  word-break: break-all;`;

const TimeLounge = ({ lounge }) => {
	return (
		<Link to={"/lounge?id=" + lounge.id}>
			<Lounge className="lounge" backgroundimage={lounge.banner}>
				<BottomDetails>
					<LoungeTitle>
						<span aria-hidden="true">{lounge.name.substring(0, 40)}
							{lounge.name.length > 40 && "..."}</span>
						<SrOnly>{lounge.name}</SrOnly>
					</LoungeTitle>
					<EventStyledButton />
				</BottomDetails>
				<TopDetails>
					<TopDetailsLeft>
						<EventBox>
							<EventDate startDate={lounge.startDate} />
						</EventBox>
						<EventBox>
							<EventTime
								startDate={lounge.startDate}
								endDate={lounge.endDate}
							/>
						</EventBox>
					</TopDetailsLeft>
					<div>
						<LoungeGuestCounter
							count={lounge.guestCount}
							openingTime={lounge.startDate}
							loungeType={"timed"}
						/>
					</div>
				</TopDetails>
			</Lounge>
		</Link>
	);
};

export default TimeLounge;
