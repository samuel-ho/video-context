// External imports, installed libraries, etc
import React from 'react';
import styled, { css } from 'styled-components';

// Internal data, functions, custom hooks, etc
import fonts from '../../../styles/fonts';

// Internal components, images, etc
// NA ATM

export const H3Styles = css`
	color: ${props => props.color ? props.color : fonts.color};
	font-size: 22px;
	font-weight: ${fonts.fontWeight.medium};
	margin-bottom: 1.3rem;
`;

const H3 = styled.h3`
	${H3Styles};
`;

function Component({ className, children, color }) {
	return (
		<H3 className={className} color={color}>
			{children}
		</H3>
	);
}

export default Component;
