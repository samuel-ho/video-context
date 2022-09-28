// External imports, installed libraries, etc
import React from 'react';
import styled from 'styled-components';

// Internal data, functions, custom hooks, etc

// Internal components, images, etc

interface LiProps {
}
const Li = styled.li<LiProps>`
	display: inline-block;

	&:not(:first-child) {
		padding-left: 1em;
	}
`;

interface Props {
	children?: any;
	className?: any;
};
const CrumbListItem = ({ className, children }: Props) => {
	return (
		<Li className={className}>{children}</Li>
	);
}

export default CrumbListItem;