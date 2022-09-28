// External imports, installed libraries, etc
import React from 'react';
import styled from 'styled-components';

// Internal data, functions, custom hooks, etc
// NA ATM

// Internal components, images, etc
// NA ATM


const Img = styled.img`
	max-width: 100%;
`;

function Component({ ...props }) {
	return <Img {...props} />;
}

export default Component;
