// External imports, installed libraries, etc
import React from 'react';
import styled from 'styled-components';

// Internal data, functions, custom hooks, etc

// Internal components, images, etc

const Wrapper = styled.span`
	> svg {
		display: inline-block;
		vertical-align: middle;
	}
`;

const SvgWrapper = ({ children }) => {
	return (
		<Wrapper>
			{children}
		</Wrapper>
	);
}

export default SvgWrapper;
