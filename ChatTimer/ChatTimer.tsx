// External imports, installed libraries, etc
import React from 'react';
import styled from 'styled-components';

// Internal data, functions, custom hooks, etc
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import breakpoints from '../../styles/breakpoints';

// Internal components, images, etc

const Wrapper = styled.span`
	background: rgba(0,0,0,.07);
	border-radius: 2px;
	color: ${colors.grey[8]};
	display: inline-block;
	font-weight: ${fonts.fontWeight.medium};
	font-size: 1.2em;
	padding: .6em .75em;
`;

const Count = styled.span`
	font-weight: ${fonts.fontWeight.bold};

	@media (min-width: ${breakpoints.smUp}) {
		padding-right: 4px;
	}
`;


const getCountContent = ({endsAt}: ComponentProps) => {
	const nowTime = new Date();

	if (nowTime < endsAt) {
		return (
			<>
			<Count>15:00</Count>
			</>
		);
	}
	return ('Ended');
}


const Component = ({ className, endsAt }: ComponentProps) => {
	const countContent = getCountContent(endsAt);

	return (
		<Wrapper className={className}>
			{countContent}
		</Wrapper>
	);
}

export default Component;

interface ComponentProps {
	children?: any;
	className?: string;
	endsAt?: any;
}