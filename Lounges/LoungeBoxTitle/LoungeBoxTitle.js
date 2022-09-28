// External imports, installed libraries, etc
import React from 'react';
import styled from 'styled-components';

// Internal data, functions, custom hooks, etc

// Internal components, images, etc
import { ParagraphStyles } from '../../elements/Paragraph';

const LoungeBoxTitle = styled.span`
    ${ParagraphStyles}
    align-items: center;
    display: flex;
    margin-bottom: 0;
`;

const Component = ({ children }) => {
    return (
        <LoungeBoxTitle>
            {children}
        </LoungeBoxTitle>
    );
}

export default Component;