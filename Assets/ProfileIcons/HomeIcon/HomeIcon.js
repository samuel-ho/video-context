import React from 'react';
import PropTypes from 'prop-types';

const HomeIcon = ({ width, height, foregroundColor, className, ariaHidden }) => 
{
	return (
		<svg className={className} width={width} height={height} aria-hidden={ariaHidden} viewBox="0 0 24 24">
        <path d="M11.7 1C7.443 1 4 4.443 4 8.7C4 14.475 11.7 23 11.7 23C11.7 23 19.4 14.475 19.4 8.7C19.4 4.443 15.957 1 11.7 1ZM11.7 11.45C10.9707 11.45 10.2712 11.1603 9.75546 10.6445C9.23973 10.1288 8.95 9.42935 8.95 8.7C8.95 7.97065 9.23973 7.27118 9.75546 6.75546C10.2712 6.23973 10.9707 5.95 11.7 5.95C12.4293 5.95 13.1288 6.23973 13.6445 6.75546C14.1603 7.27118 14.45 7.97065 14.45 8.7C14.45 9.42935 14.1603 10.1288 13.6445 10.6445C13.1288 11.1603 12.4293 11.45 11.7 11.45V11.45Z" fill={foregroundColor}/>
		</svg>
	);
}

export default HomeIcon;

HomeIcon.defaultProps = {
	width: 20,
	height: 20,
	foregroundColor: '#8C939D',
};

HomeIcon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	foregroundColor: PropTypes.string,
};