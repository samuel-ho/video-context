import React from 'react';
import PropTypes from 'prop-types';

const ConnectionsIcon = ({ width, height, foregroundColor, className, ariaHidden = false }) => 
{
	return (
		<svg className={className} width={width} height={height} viewBox="0 0 12 10" fill="none" aria-hidden={ariaHidden}>
            <path d="M4.8 10V6.47059H7.2V10H10.2V5.29412H12L6 0L0 5.29412H1.8V10H4.8Z" fill={foregroundColor}/>
        </svg>
	);
}

export default ConnectionsIcon;

ConnectionsIcon.defaultProps = {
	width: 14,
	height: 12,
	foregroundColor: '#0000ff',
};

ConnectionsIcon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	foregroundColor: PropTypes.string,
};
