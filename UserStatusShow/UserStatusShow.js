import React from "react";
import styled from "styled-components";
import Emoji from 'react-emoji-render';

import breakpoints from '../../styles/breakpoints';

import _Box from '../Box';
import SrOnly from '../SrOnly';
import _GreenStatusDot from '../Assets/GreenStatusDot';

const Box = styled(_Box)`
    text-align: center;
    
    @media (min-width: ${breakpoints.smUp}px) { 
        padding-top: 2em;
        padding-bottom: 2em;
    }
`;

const GreenStatusDot = styled(_GreenStatusDot)`
    display: inline-block;
    margin-right: 4px;
`;

const OrderedList = styled.ol`
    display: flex;
    flex-direction: column;
    
    @media (min-width: ${breakpoints.smUp}px) { 
        flex-direction: row;
        justify-content: space-between;
    }
`;

const StatusItem = styled.li`
    display: inline;
    margin-right: 10px;
    padding: 1em 0;

    &:last-child { 
        margin-right: 0;
    }

    @media (min-width: ${breakpoints.smUp}px) { 
        padding: 0 1em;
    }
`;

const UserStatusShow = ( { marginBottom } ) => {
    return (
        <Box marginBottom={marginBottom}>
            <OrderedList>
                <StatusItem><Emoji text={':fire:'} aria-label="Fire emoji" /> 50<span aria-hidden="true">+</span><SrOnly> plus</SrOnly> chats</StatusItem>
                <StatusItem><Emoji text={':tada:'} aria-label="Party popper emoji" /> 30<span aria-hidden="true">+</span><SrOnly> plus</SrOnly> chats</StatusItem>
                <StatusItem><Emoji text={':sparkles:'} aria-label="Sparckle emoji" /> 20<span aria-hidden="true">+</span><SrOnly> plus</SrOnly> chats</StatusItem>
                <StatusItem><GreenStatusDot/> New users</StatusItem>
            </OrderedList>
        </Box>
    )
};

export default UserStatusShow;