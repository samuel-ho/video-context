import React from 'react';
import PropTypes from 'prop-types';

const ReceivedArrow = ({ width, height, foregroundColor, className, ariaHidden }) => 
{
	return (
		<svg className={className} width={width} height={height} aria-hidden={ariaHidden} viewBox="1 2 13 11">
			<path fill={foregroundColor} 
				  d="M13.4425 4.20032L7.55321 10.0896L10.0736 12.61L3.36098 12.6016L3.35258 5.88898L5.87296 8.40936L11.7623 2.52007L13.4425 4.20032Z"/>
		</svg>
	);
}

export default ReceivedArrow;

ReceivedArrow.defaultProps = {
	width: 18,
	height: 18,
	foregroundColor: '#303031',
};

ReceivedArrow.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	foregroundColor: PropTypes.string,
};
