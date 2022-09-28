// External imports, installed libraries, etc
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Internal data, functions, custom hooks, etc
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import breakpoints from '../../styles/breakpoints';
import useWindowSize from '../../hooks/useWindowSize';

// Internal components, images, etc

const Wrapper = styled.span`
	background: ${props => props.loungeType === 'open' ? 'rgba(0,0,0,.07)' : 'rgba(0,0,0,0.65)'};
	border-radius: 2px;
	color: ${props => props.loungeType === 'open' ? colors.grey[8] : colors.white};
	display: inline-block;
	font-weight: ${fonts.fontWeight.medium};
	font-size: .8em;
	line-height: initial;
	padding: 6px 10px;
`;

const Count = styled.span`
	font-weight: ${fonts.fontWeight.bold};

	@media (min-width: ${breakpoints.smUp}px) {
		padding-right: ${props => props.countOnly ? 0 : 4}px;
	}
`;

const isLoungeOpen = (openingTime, nowDate) => {
	if (openingTime > nowDate && nowDate < 1) {
		return false;
	}
	return true;
}

const getCountContent = (count, openingTime, isMobile, countOnly) => {
	const nowDate = Date.now();
	const noun = (count > 1 || count === 0) ? 'Guests' : ((count === 1 && 'Guest'));
	const isOpen = isLoungeOpen(openingTime, nowDate);

	if ( countOnly ) {
		return (
			<>
				<Count title={`${count} ${noun}`} countOnly={countOnly}>{count}</Count>
			</>
		);
	}
	if (noun && isOpen) {
		return (
			<>
				<Count title={`${count} ${noun}`}>{count}</Count> {!isMobile && (noun)}
			</>
		);
	}
	if (!isOpen && openingTime > nowDate) {
		return ('Opening soon');
	}
	return ('Closed');
}

const Component = ({ count, openingTime, loungeType, countOnly, className }) => {
	const { width: currentWidth } = useWindowSize();
	const [width, setWidth] = useState(currentWidth);
	const isMobile = width < breakpoints.smDown;

	const countContent = getCountContent(count, openingTime, isMobile, countOnly);

	useEffect(() => {
		if (currentWidth !== width) {
			setWidth(currentWidth);
		}
	}, [currentWidth, width]);

	return (
		<Wrapper className={className} loungeType={loungeType}>
			{countContent}
		</Wrapper>
	);
}

export default Component;
