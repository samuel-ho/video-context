import React from 'react';
import PropTypes from 'prop-types';

import colors from '../../../styles/colors';

const AudioOnIcon = ({ width, height, foregroundColor, className, label, uniqueId }) => {
	const labelId = `${uniqueId()}label`;
	return (
		<svg className={className} width={width} height={height} viewBox="0 0 24 24" aria-labelledby={labelId}>
			<title id={labelId} lang="en">{label}</title>
			<path d="M0 0h24v24H0z" fill="none"/>
			<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill={foregroundColor}/>
		</svg>
	);
}

export default AudioOnIcon;

AudioOnIcon.defaultProps = {
	width: 18,
	height: 18,
	foregroundColor: colors.green[5],
};

AudioOnIcon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	foregroundColor: PropTypes.string,
};
