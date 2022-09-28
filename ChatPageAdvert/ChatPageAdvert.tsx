// External imports, installed libraries, etc
import React from 'react';
import styled from 'styled-components';

// Internal data, functions, custom hooks, etc

// Internal components, images, etc
import _Box from '../../Box';
import AdvertImage from './ChatPageAd.png';

const Box = styled<any>(_Box)`
    max-width: 300px;
    overflow: hidden;
    padding: 0;

    & img {
        display: block;
        width: 100%;
    }
`;

const Advert = () => {
    return (
        <Box>
            <img src={AdvertImage} alt="Thirty Friends Home Page" />
        </Box>

    );
}

export default Advert;