import React from 'react';
import PropTypes from 'prop-types';

const LogoIcon = ({ width, height, className, label, uniqueId }) => {
	return (
		<svg className={className} width={width} height={height} viewBox="0 0 50 50" fill="none">
			<title lang="en">{label}</title>
			<g clipPath="url(#clip0)">
				<circle cx="7.06331" cy="29.5219" r="6" transform="rotate(-15 7.06331 29.5219)" fill="#DC4E66"/>
				<circle cx="42.8016" cy="19.9458" r="6" transform="rotate(-15 42.8016 19.9458)" fill="#50B3A4"/>
				<circle cx="11.8516" cy="11.6533" r="6" transform="rotate(45 11.8516 11.6533)" fill="#E47F4A"/>
				<circle cx="38.0156" cy="37.8173" r="6" transform="rotate(45 38.0156 37.8173)" fill="#5386C2"/>
				<circle cx="29.7218" cy="6.86373" r="6" transform="rotate(105 29.7218 6.86373)" fill="#F2BE44"/>
				<circle cx="20.1437" cy="42.602" r="6" transform="rotate(105 20.1437 42.602)" fill="#AE7EA5"/>
			</g>
			<defs>
				<clipPath id="clip0">
					<rect width={50} height={50} fill="transparent"/>
				</clipPath>
			</defs>
		</svg>
		
	);
}

export default LogoIcon;

LogoIcon.defaultProps = {
	height: 50,
	width: 50,
};

LogoIcon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	foregroundColor: PropTypes.string,
};
