import React from 'react';
import PropTypes from 'prop-types';

const ConnectionsIcon = ({ width, height, foregroundColor, className, label, uniqueId}) => {

	const labelId = `${uniqueId}label`;
	return (
		<svg className={className} width={width} height={height} viewBox="0 0 26 26" aria-labelledby={labelId} fill="none" xmlns="http://www.w3.org/2000/svg">
			<title id={labelId} lang="en">{label}</title>
      <path d="M5.24992 9.97732C5.24992 12.3048 7.00575 14.0606 9.33325 14.0606C11.6608 14.0606 13.4166 12.3048 13.4166 9.97732C13.4166 7.64982 11.6608 5.89398 9.33325 5.89398C7.00575 5.89398 5.24992 7.64982 5.24992 9.97732ZM22.1666 9.33332H19.8333V12.8333H16.3333V15.1666H19.8333V18.6666H22.1666V15.1666H25.6666V12.8333H22.1666V9.33332ZM4.66659 22.1666H16.3333V21C16.3333 17.7835 13.7164 15.1666 10.4999 15.1666H8.16659C4.95009 15.1666 2.33325 17.7835 2.33325 21V22.1666H4.66659Z" fill={foregroundColor}/>
		</svg>
	);
}

export default ConnectionsIcon;

ConnectionsIcon.defaultProps = {
	width: 26,
	height: 26,
	foregroundColor: '#828287',
};

ConnectionsIcon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	foregroundColor: PropTypes.string,
};
