import React from 'react';
import PropTypes from 'prop-types';

const ConnectionIcon = ({ width, height, foregroundColor, className, ariaHidden}) => 
{
	return (
		<svg viewBox="0 0 11 9" className={className} width={width} height={height} fill="none" aria-hidden={ariaHidden}>
			<rect x="5" y="2" width="1" height="5" fill={foregroundColor}/>
			<rect x="8" y="4" width="1" height="5" transform="rotate(90 8 4)" fill={foregroundColor}/>
			<rect x="0.5" y="0.5" width="10" height="8" rx="1.5" stroke={foregroundColor}/>
		</svg>

	);
}

export default ConnectionIcon;

ConnectionIcon.defaultProps = {
	width: 14,
	height: 11,
	foregroundColor: '#2A66FF',
};

ConnectionIcon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	foregroundColor: PropTypes.string,
};
