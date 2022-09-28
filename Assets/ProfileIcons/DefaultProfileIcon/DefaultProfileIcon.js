import React from 'react';
import PropTypes from 'prop-types';

import colors from "../../../../styles/colors";

const DefaultProfileIcon = ({ width, height, foregroundColor, className }) => 
{
	return (
		<svg className={className} fill={foregroundColor} width={`${width}px`} height={`${height}px`} viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
	);
}

export default DefaultProfileIcon;

DefaultProfileIcon.defaultProps = {
	width: 48,
	height: 48,
    foregroundColor: colors.grey[7],
};

DefaultProfileIcon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
    foregroundColor: PropTypes.string,
};