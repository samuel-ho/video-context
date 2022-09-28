// External imports, installed libraries, etc
import React from 'react';
import styled, { css } from 'styled-components';

// Internal data, functions, custom hooks, etc
import fonts from '../../../styles/fonts';

// Internal components, images, etc
// NA ATM

export const H4Styles = css`
	color: ${props => props.color ? props.color : fonts.color};
	font-size: 18px;
	font-weight: ${fonts.fontWeight.medium};
	margin-bottom: 0.5em;
`;

const H4 = styled.h4`
	${H4Styles};
`;

function Component({ className, children, color }) {
	return (
		<H4 className={className} color={color}>
			{children}
		</H4>
	);
}

export default Component;
