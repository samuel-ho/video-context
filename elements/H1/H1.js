// External imports, installed libraries, etc
import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

// Internal data, functions, custom hooks, etc
import fonts from '../../../styles/fonts';

// Internal components, images, etc
// NA ATM

export const H1Styles = css`
	color: ${props => props.color ? props.color : fonts.color};
	font-size: 24px;
	font-weight: ${fonts.fontWeight.medium};
	margin-bottom: ${props => props.marginbottom ? props.marginbottom : '3'}rem;
`;

const H1 = styled.h1`
	${H1Styles};
`;

const Component = ({ className, children, color, marginBottom }) => {
	return (
		<H1 className={className} color={color} marginbottom={marginBottom}>
			{children}
		</H1>
	);
}

export default Component;

Component.propTypes = {
	marginbottom: PropTypes.number,
};
