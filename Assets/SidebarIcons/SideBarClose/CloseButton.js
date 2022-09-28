import React from 'react';
import PropTypes from 'prop-types';

const CloseButton = ({ width, height, foregroundColor, className, label, uniqueId }) => {
	const labelId = `${uniqueId()}label`;
	return (
		<svg className={className} width={width} height={height} viewBox="0 0 36 36" aria-labelledby={labelId}>
			<title id={labelId} lang="en">{label}</title>
			<path fill={foregroundColor} 
				  d="M10.5 25.5L12.6 23.4L8.7 19.5L24 19.5L24 16.5L8.7 16.5L12.6 12.6L10.5 10.5L3 18L10.5 25.5Z"/>
		</svg>
	);
}

export default CloseButton;

CloseButton.defaultProps = {
	width: 36,
	height: 36,
	foregroundColor: '#303031',
};

CloseButton.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	foregroundColor: PropTypes.string,
};
