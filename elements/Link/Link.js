// External imports, installed libraries, etc
import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Internal data, functions, custom hooks, etc

// Internal components, images, etc
import { AnchorStyles } from '../Anchor';
import { ButtonStyles } from '../Button';

const LinkComponent = styled(Link)`
	${props => props.styleas === 'button' && ButtonStyles};
	${props => props.styleas === 'link' && AnchorStyles};
`;

const Component = ({ children, className, styleas, to, title, onClick, fontFamily, marginBottom, color, variant, ariaLabel }) => {
	return (
		<LinkComponent className={className} 
					   styleas={styleas}	
					   to={to} 
					   title={title} 
					   onClick={onClick} 
					   fontFamily={fontFamily}
					   marginbottom={marginBottom} 
					   color={color}
					   variant={variant}
					   aria-label={ariaLabel}>
			{children}
		</LinkComponent>
	);
}

export default Component;

Component.defaultProps = {
	to: '#',
	styleas: 'link',

	// Button default props
	color: 'blue',
	variant: 'solid'
};

Component.propTypes = {
	children: PropTypes.any,
	styleas: PropTypes.oneOf(['link', 'button']),
	to: PropTypes.string.isRequired,
	title: PropTypes.string,
	marginBottom: PropTypes.number,
	color: PropTypes.string,
	variant: PropTypes.oneOf(['solid', 'hollow']),
};
