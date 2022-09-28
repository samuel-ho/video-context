import React from 'react';
import PropTypes from 'prop-types';

const EmailIcon = ({ width, height, foregroundColor, className, ariaHidden}) => 
{
	return (
		<svg className={className} width={width} height={height} aria-hidden={ariaHidden} viewBox="0 0 24 24">
            <path d="M22 17V8C22 8 12.9 14.35 12.015 14.6795C11.145 14.365 2 8 2 8V17C2 18.25 2.265 18.5 3.5 18.5H20.5C21.7645 18.5 22 18.2805 22 17ZM21.9855 6.2355C21.9855 5.325 21.72 5 20.5 5H3.5C2.245 5 2 5.39 2 6.3L2.015 6.44C2.015 6.44 11.0495 12.66 12.015 13C13.035 12.605 22 6.3 22 6.3L21.9855 6.2355Z" fill={foregroundColor}/>
		</svg>
	);
}

export default EmailIcon;

EmailIcon.defaultProps = {
	width: 20,
	height: 20,
	foregroundColor: '#8C939D',
};

EmailIcon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	foregroundColor: PropTypes.string,
};