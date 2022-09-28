// External imports, installed libraries, etc
import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

// Internal data, functions, custom hooks, etc
import fonts from '../../styles/fonts';

// Internal components, images, etc
import SrOnly from "../SrOnly";

const Date = styled.div`
	color: #000000;
	font-weight: ${fonts.fontWeight.bold};
	margin-bottom: 5px;
`;

const Month = styled.div`
	color: #000000;
	font-size: .8em;
	font-weight: ${fonts.fontWeight.medium};
`;

const Component = ({ startDate }) => {
	const date = moment(startDate).format('DD');
	const month = moment(startDate).format('MMMM');
	return (
			<div>
				<SrOnly>The event is on</SrOnly> 
				<Date date={date}>
					{date}
				</Date>
				<Month>
					<SrOnly>{month}</SrOnly>
					<span aria-hidden="true">{month.substring(0, 3)}</span>
				</Month>
			</div>
	);

}

export default Component;


