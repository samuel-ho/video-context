// External imports, installed libraries, etc
import React from 'react';
import styled, { css } from 'styled-components';

// Internal data, functions, custom hooks, etc
// NA ATM

// Internal components, images, etc
// NA ATM

export const SrOnlyStyles = css`
	position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space: nowrap;
    clip-path: inset(50%);
    border: 0;
`;

const SrOnly = styled.span<any>`
	${SrOnlyStyles};
`;

interface ComponentProps {
    children?: any;
    className?: any;
}
function Component({ className, children }: ComponentProps) {
	return (
		<SrOnly className={className}>
			{children}
		</SrOnly>
	);
}

export default Component;
