// External imports, installed libraries, etc
import React from 'react';
import styled from 'styled-components';

// Internal data, functions, custom hooks, etc
import fonts from '../../styles/fonts';

import breakpoints from "../../styles/breakpoints";

// Internal components, images, etc
import { H1Styles } from '../elements/H1';
import Box from '../Box';
import _Paragraph from '../elements/Paragraph';

const ErrorTitle = styled.span`
    ${H1Styles}
    @media (max-width: ${breakpoints.smDown}px) {
        font-size: 26px;
    }
    display: inline-block;
    font-weight: ${fonts.fontWeight.bold};
`;

const Paragraph = styled(_Paragraph)`
    white-space:pre-wrap;
    line-height: 120%;
`;

const ErrorContainer = styled(Box)`
	align-items: center;
	display: flex;
    justify-content: center;
	height: ${props => props.height && props.height + 'px'};
    margin-bottom: ${props => props.marginBottom && `${props.marginBottom}px;`}
`;

const Component = ({ className, title, message, children, height, marginBottom }) => {
    return (
        <ErrorContainer className={className} height={height} marginBottom={marginBottom}>
            <div>
                <ErrorTitle marginBottom={1.2}>{title}</ErrorTitle>
                <Paragraph>{message}</Paragraph>
                {children}
            </div>
        </ErrorContainer>
    );
}

export default Component;