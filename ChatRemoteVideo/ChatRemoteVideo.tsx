// External imports, installed libraries, etc
import React from 'react';
import styled from 'styled-components';

// Internal data, functions, custom hooks, etc

// Internal components, images, etc
import _Box from '../Box';

interface ComponentProps {
	children?: any;
	className?: string;
	marginBottom?: number;
}

const ChatRemoteVideo = styled(_Box)`
	overflow: hidden;
	padding: 0 0;
`;

const Component = ({ children, className, marginBottom }: ComponentProps) => {
	return (
		<ChatRemoteVideo className={className} marginBottom={marginBottom}>
			{children}
		</ChatRemoteVideo>
	);
}

export default Component;