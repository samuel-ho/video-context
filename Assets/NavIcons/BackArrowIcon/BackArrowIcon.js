import React from 'react';
import PropTypes from 'prop-types';

const ConnectionsIcon = ({ width, height, foregroundColor, className, ariaHidden = false}) => 
{
	return (
		<svg className={className} width={width} height={height} viewBox="0 0 12 8" fill="none" aria-hidden={ariaHidden}>
            <path d="M6.23438 4C4.90937 4 3.70937 4.495 2.78437 5.3L1.83938 4.355C1.52438 4.04 0.984375 4.26 0.984375 4.705V7.5C0.984375 7.775 1.20937 8 1.48438 8H4.27938C4.72438 8 4.94938 7.46 4.63438 7.145L3.67937 6.19C4.37437 5.61 5.25938 5.25 6.23938 5.25C7.81938 5.25 9.18438 6.17 9.83438 7.5C9.96938 7.78 10.2894 7.92 10.5844 7.82C10.9394 7.705 11.1194 7.3 10.9594 6.96C10.0994 5.21 8.30938 4 6.23438 4Z"  fill={foregroundColor}/>
        </svg>
	);
}

export default ConnectionsIcon;

ConnectionsIcon.defaultProps = {
	width: 18,
	height: 18,
	foregroundColor: '#D1373D',
};

ConnectionsIcon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	foregroundColor: PropTypes.string,
};
