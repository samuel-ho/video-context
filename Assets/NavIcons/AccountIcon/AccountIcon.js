import React from 'react';
import PropTypes from 'prop-types';

const AccountIcon = ({ width, height, foregroundColor, className, label, uniqueId }) => {
    const labelId = `${uniqueId}label`;

	return (
  <svg className={className} width={width} height={height} viewBox="1 0 26 26" aria-labelledby={labelId} fill="none" xmlns="http://www.w3.org/2000/svg">
  <title id={labelId} lang="en">{label}</title> 
  <path d="M13.9999 2.33331C7.67542 2.33331 2.33325 7.67548 2.33325 14C2.33325 20.3245 7.67542 25.6666 13.9999 25.6666C20.3244 25.6666 25.6666 20.3245 25.6666 14C25.6666 7.67548 20.3244 2.33331 13.9999 2.33331ZM13.9999 8.16665C16.0148 8.16665 17.4999 9.65065 17.4999 11.6666C17.4999 13.6826 16.0148 15.1666 13.9999 15.1666C11.9863 15.1666 10.4999 13.6826 10.4999 11.6666C10.4999 9.65065 11.9863 8.16665 13.9999 8.16665ZM8.04292 19.5673C9.08942 18.0273 10.8348 17.0006 12.8333 17.0006H15.1666C17.1663 17.0006 18.9104 18.0273 19.9569 19.5673C18.4659 21.1633 16.3508 22.1666 13.9999 22.1666C11.6491 22.1666 9.53392 21.1633 8.04292 19.5673Z" fill={foregroundColor}/>
  </svg>

	);
}

export default AccountIcon;

AccountIcon.defaultProps = {
	width: 26,
	height: 26,
	foregroundColor: '#828287',
};

AccountIcon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	foregroundColor: PropTypes.string,
};
