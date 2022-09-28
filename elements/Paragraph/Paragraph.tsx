// External imports, installed libraries, etc
import React from 'react';
import styled, { css } from 'styled-components';

// Internal data, functions, custom hooks, etc
import fonts from '../../../styles/fonts';

// Internal components, images, etc
// NA ATM

interface ParagraphProps {
	marginbottom?: any;
	textalign?: any;
}
export const ParagraphStyles = css<ParagraphProps>`
	color: ${(props:any) => props.color || fonts.color};
	font-family: ${fonts.fontFamily};
	font-size: 16px;
	line-height: ${fonts.lineHeight};
	margin-bottom: ${(props:any) => (props.marginbottom) ? (props.marginbottom+'em'): ('1.25em')};
  text-align: ${(props:any) => (props.textalign)};
  font-weight: 500;
`;

const Paragraph = styled.p`
	${ParagraphStyles}
`;

type Props = {
	className?: any; 
	children?: any; 
	color?: any; 
	marginBottom?: any; 
	textalign?: any;
	ariaHidden?: any;
};
const Component = ({ ariaHidden, className, children, color, marginBottom, textalign }: Props) => {
	return (
		<Paragraph 
			aria-hidden={ariaHidden}
			color={color} 
			className={className} 
			marginbottom={marginBottom} 
			textalign={textalign}
		>
			{children}
		</Paragraph>
	);
}

export default Component;