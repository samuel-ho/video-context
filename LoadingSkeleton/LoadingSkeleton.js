// External imports, installed libraries, etc
import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

// Internal data, functions, custom hooks, etc
import colors from '../../styles/colors';
import breakpoints from "../../styles/breakpoints";

// Internal components, images, etc
// NA ATM

const LoadingSkeleton = styled.div`
    background: ${colors.grey[2]};
    border-radius: ${(props) => props.borderRadius ? (`${props.borderRadius}%`) : '10px'};
    width: ${(props) => (props.width) ? (`${props.width}px`) : '100%'};
    height: ${(props) => (props.height) ? (props.height) : '35'}px;
    margin-bottom: ${(props) => (`${props.marginbottom}em`)};
    ${props => props.className === "dissapearOnSml" && `
    @media (max-width: ${breakpoints.mdDown}px) {
        display: none;
    }
    `}
    overflow: hidden;
    position: relative;
`;

const animation = keyframes`
    0% { transform: translateX(-100%); }
    100% { transform: translateX(+100%);}
`;

const AnimatedBackground = styled.div`
    animation-name: ${animation};
    animation-duration: 2s;
    animation-iteration-count: infinite;
    background: linear-gradient(110deg, transparent 30%, rgba(0,0,0,.05), transparent 70%);
    transform: translateX(-100%);
    height: 100%;
    top: 0;
    width: 100%;
`;


function Component({ className, marginBottom, width, height, borderRadius }) {
    return (
        <LoadingSkeleton className={className} marginbottom={marginBottom} width={width} height={height} borderRadius={borderRadius}>
            <AnimatedBackground />
        </LoadingSkeleton>
    );
}

export default Component;

Component.propTypes = {
    marginBottom: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    borderRadius: PropTypes.number,
};
