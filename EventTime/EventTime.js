// External imports, installed libraries, etc
import React from "react";
import styled from "styled-components";
import moment from "moment";

// Internal data, functions, custom hooks, etc
import fonts from "../../styles/fonts";

// Internal components, images, etc
import SrOnly from "../SrOnly";

const Time = styled.div`
  color: #000000;
  font-size: 0.8em;
  font-weight: ${fonts.fontWeight.medium};
  white-space: nowrap;
  &:first-child {
    margin-bottom: 10px;
  }
`;

const Component = ({ startDate, endDate }) => {
	const startTime = moment(startDate).format('h:mm A')
	const endTime = moment(endDate).format('h:mm A')

	function removeFirstZero(time) {
		return time[0] === "0" ? time.slice(1) : time;
	}

	return (
		<div>
			<Time startTime={startTime}>
				<SrOnly>The event starts at </SrOnly>
				{removeFirstZero(startTime)}
			</Time>
			<Time endTime={endTime}>
				<SrOnly>The event ends at </SrOnly>
				{removeFirstZero(endTime)}
			</Time>
		</div>
	);
};

export default Component;
