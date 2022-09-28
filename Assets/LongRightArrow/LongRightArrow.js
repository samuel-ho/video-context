import React from 'react';
import PropTypes from 'prop-types';

const LongRightArrow = ({ width, height, foregroundColor, className }) => 
{
	return (
		<svg className={className} width={width} height={height} viewBox="0 0 18 18">
            <path d="M7.10258 16.1026L9 18L18 9L9 0L7.10258 1.89742L12.8633 7.65812H0V10.3419H12.8633L7.10258 16.1026Z" fill={foregroundColor}/>
		</svg>
	);
}

export default LongRightArrow;

LongRightArrow.defaultProps = {
	height: 24,
	foregroundColor: '#fff',
};

LongRightArrow.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	foregroundColor: PropTypes.string,
};
