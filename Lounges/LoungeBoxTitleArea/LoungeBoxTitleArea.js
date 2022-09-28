// External imports, installed libraries, etc
import React from 'react';
import styled from 'styled-components';

// Internal data, functions, custom hooks, etc

// Internal components, images, etc

const LoungeBoxTitleArea = styled.div`
    margin-bottom: 1em;
`;

const Component = ({ children }) => {
    return (
        <LoungeBoxTitleArea>
            {children}
        </LoungeBoxTitleArea>
    );
}

export default Component;