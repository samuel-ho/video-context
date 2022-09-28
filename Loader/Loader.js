// External imports, installed libraries, etc
import React from 'react';
import styled from 'styled-components';
import { loader, animate, shadow, colourAnimate } from './loaderKeyFrames';

// Internal data, functions, custom hooks, etc
import SrOnly from '../SrOnly';

const LoadingWrapper = styled.div`
    position: absolute;
    top: calc(50% - 20px);
    left: calc(50% - 20px);
    animation: ${loader};
`;

const LoadingBox = styled.div`
    width: 50px;
    height: 50px;
    animation: ${animate} .5s linear infinite , ${colourAnimate} 1.5s linear infinite ;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 3px;
    
`;

const Shadow = styled.div`
    width: 50px;
    height: 5px;
    background: #000;
    opacity: 0.1;
    position: absolute;
    top: 59px;
    left: 0;
    border-radius: 50%;
    animation: ${shadow} .5s linear infinite;
`

const Loader = () => {

    return (
    <>
        <LoadingWrapper>
            <SrOnly>Loading</SrOnly>
            <Shadow />
            <LoadingBox />
        </LoadingWrapper>
    </>
  );
};

export default Loader;
