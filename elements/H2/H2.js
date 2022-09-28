// External imports, installed libraries, etc
import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

// Internal data, functions, custom hooks, etc
import fonts from '../../../styles/fonts';

// Internal components, images, etc
// NA ATM

export const H2Styles = css`
	color: ${props => props.color ? props.color : fonts.color};
	font-size: 20px;
	font-weight: ${fonts.fontWeight.medium};
	margin-bottom: ${props => props.marginbottom ? props.marginbottom : '1.3'}rem;
`;

const H2 = styled.h2`
	${H2Styles};
`;

function Component({ className, children, color, marginBottom}) {
	return (
		<H2 className={className} color={color} marginbottom={marginBottom}>
			{children}
		</H2>
	);
}

export default Component;

Component.propTypes = {
	marginbottom: PropTypes.number,
};
