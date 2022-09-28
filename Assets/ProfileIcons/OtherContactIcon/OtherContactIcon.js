import React from 'react';
import PropTypes from 'prop-types';

const OtherContactIcon = ({ width, height, foregroundColor, className, ariaHidden }) => 
{
	return (
		<svg className={className} width={width} height={height} aria-hidden={ariaHidden} viewBox="0 0 24 24">
        <path d="M21 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V7H2V9H4V11H2V13H4V15H2V17H4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H21C21.2652 22 21.5196 21.8946 21.7071 21.7071C21.8946 21.5196 22 21.2652 22 21V3C22 2.73478 21.8946 2.48043 21.7071 2.29289C21.5196 2.10536 21.2652 2 21 2V2ZM13 4.999C14.648 4.999 16 6.35 16 7.999C15.9971 8.79385 15.6801 9.55533 15.1182 10.1175C14.5562 10.6796 13.7948 10.9968 13 11C11.353 11 10 9.647 10 7.999C10 6.35 11.353 4.999 13 4.999ZM19 18H7V17.25C7 15.031 9.705 12.75 13 12.75C16.295 12.75 19 15.031 19 17.25V18Z" fill={foregroundColor}/>
		</svg>
	);
}

export default OtherContactIcon;

OtherContactIcon.defaultProps = {
	width: 20,
	height: 20,
	foregroundColor: '#8C939D',
};

OtherContactIcon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	foregroundColor: PropTypes.string,
};