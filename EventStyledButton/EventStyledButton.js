// External imports, installed libraries, etc
import React from 'react';
import styled from 'styled-components';

// Internal data, functions, custom hooks, etc
import buttonColors from '../elements/Button/buttonColors';

// Internal components, images, etc
import LongRightArrow from '../Assets/LongRightArrow';

const Span = styled.span`
	align-items: center;
	background: ${'linear-gradient(140deg,'+buttonColors.orange.top+','+buttonColors.orange.bottom+')'};
	border-radius: 100%;
	color: ${buttonColors.orange.color};
	display: inline-flex;
    justify-content: center;
	height: 50px;
	min-height: 50px;
	min-width: 50px;
	width: 50px;
`;

const EventStyledButton = ( { className } ) => {
	return (
		<Span className={className} aria-hidden="true">
			<LongRightArrow height={22}/>
		</Span>
	);
}

export default EventStyledButton;