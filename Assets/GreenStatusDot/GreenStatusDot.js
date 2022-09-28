import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";

import colors from '../../../styles/colors';

const GreenStatusDot = styled.div`
  background: ${colors.green.statusDot};
  border-radius: 100%;
  height: ${props => props.width}px;
  width: ${props => props.width}px;
`;

const Component = ({ width, className }) => {
	return (
		<GreenStatusDot width={width} className={className} aria-label="Green status indicator" />
	);
}

export default Component;

Component.defaultProps = {
	width: 8,
};

Component.propTypes = {
	width: PropTypes.number,
};
