// External imports, installed libraries, etc
import React from 'react';
import { Grid as _Grid } from 'react-flexbox-grid';
import styled from 'styled-components';

// Internal data, functions, custom hooks, etc
import breakpoints from '../../styles/breakpoints';

// Internal components, images, etc
// NA ATM

interface GridProps {
	width?: number;
	marginbottom?: number | undefined;
}
const Grid = styled(_Grid) <GridProps>`
	padding: 0 12px;

	margin-bottom: ${props => props?.marginbottom && `${props?.marginbottom}px;`};

	@media (min-width: ${breakpoints.smUp}px) {
		padding: 0 1.5em;
		width: ${props => props.width}px;
	}

	@media (min-width: ${breakpoints.mdUp}px) {
		padding: 0 2.25em;
	}

	@media only screen and (min-width: 576px) and (max-width: 1199.8px) {
		width: initial;
	}
`;

type Props = {
	className?: any;
	children: any;
	width?: number;
	fluid?: boolean;
	marginBottom?: number;
};
function Container({ children, className, fluid, width, marginBottom }: Props) {
	return (
		<Grid fluid={fluid} className={className} width={width} marginbottom={marginBottom}>
			{children}
		</Grid>
	);
}

export default Container;
