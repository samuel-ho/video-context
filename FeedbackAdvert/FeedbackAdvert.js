// External imports, installed libraries, etc
import React from 'react';
import styled from 'styled-components';

// Internal data, functions, custom hooks, etc

// Internal components, images, etc
import Anchor from '../elements/Anchor';
import _Box from '../Box';
import AdvertImage from './tf-ad-3.png';
import SrOnly from '../SrOnly';

const Box = styled(_Box)`
    overflow: hidden;
    padding: 0;

    & img {
        display: block;
        width: 100%;
    }
`;

const FeedbackAdvert = ({marginBottom}) => {
    return (
        <Anchor href="https://docs.google.com/forms/d/e/1FAIpQLSdZrmYKy0aziVQIsnrIEaHPOI_jKCPYHLFxee14AyCQj7AclA/viewform" title="Thirty Friends Home Page" ariaLabel={"Thirty Friends Home Page"}>
            <Box marginBottom={marginBottom}>
                <img src={AdvertImage} alt=""/>
                <SrOnly>Make <strong>new</strong> and <strong>real</strong> connections.</SrOnly>
            </Box>
        </Anchor>
    );
}

export default FeedbackAdvert;