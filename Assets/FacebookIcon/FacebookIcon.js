import React from 'react';
import PropTypes from 'prop-types';

const LogoIcon = ({ width, height, foregroundColor, className }) => 
{
	return (
		<svg className={className} width={width} height={height} viewBox="0 0 24 24">
			<path fill={foregroundColor} 
				  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-3 7h-1.924c-.615 0-1.076.252-1.076.889v1.111h3l-.238 3h-2.762v8h-3v-8h-2v-3h2v-1.923c0-2.022 1.064-3.077 3.461-3.077h2.539v3z"/>
		</svg>
	);
}

export default LogoIcon;

LogoIcon.defaultProps = {
	width: 30,
	height: 30,
	foregroundColor: '#fff',
};

LogoIcon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	foregroundColor: PropTypes.string,
};
