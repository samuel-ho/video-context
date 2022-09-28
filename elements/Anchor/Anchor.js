// External imports, installed libraries, etc
import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

// Internal data, functions, custom hooks, etc
import fonts from '../../../styles/fonts';

// Internal components, images, etc
import { ButtonStyles } from '../Button';

export const AnchorStyles = css`
	color: ${props => props.color && props.color};
	display: ${props => props.marginbottom > 0 && 'inline-block'};
	font-family: ${fonts.fontFamily};
	font-size: inherit;
	font-weight: ${fonts.fontWeight.bold};
	margin-bottom: ${props => props.marginbottom && props.marginbottom+`em`};
	text-decoration: none;
	transition: background-color 0.3s;
	position: relative;

	&:hover {
		text-decoration: underline;
	}

	&:focus {
		text-decoration: underline;
	}
`

const AnchorTag = styled.a`
	${props => props.styleas === 'link' && AnchorStyles};
	${props => props.styleas === 'button' && ButtonStyles};
`;

const Component = ({ children, className, styleas, href, rel, target, title, onClick, marginBottom, color, variant, ariaLabel}) => {

	return (
		<AnchorTag className={className}
				   styleas={styleas}	    
				   href={href} 
				   target={target} 
				   rel={target === '_blank' && rel}
				   title={title} 
				   onClick={onClick} 
				   marginbottom={marginBottom} 
				   color={color}
				   variant={variant}
				   aria-label={ariaLabel}>
			{children}
		</AnchorTag>
	);
}

export default Component;

Component.defaultProps = {
	href: '#',
	target: '_blank',
	rel: 'noopener noreferrer',
	styleas: 'link',

	// Button default props
	color: 'blue',
	variant: 'solid'
};

Component.propTypes = {
	children: PropTypes.any,
	styleas: PropTypes.oneOf(['link', 'button']),
	href: PropTypes.string.isRequired,
	target: PropTypes.string,
	title: PropTypes.string,
	marginbottom: PropTypes.number,
	variant: PropTypes.oneOf(['solid', 'hollow']),
};
