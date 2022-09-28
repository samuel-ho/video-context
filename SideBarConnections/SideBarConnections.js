// External imports, installed libraries, etc
import React from 'react';

// Internal data, functions, custom hooks, etc

// Internal components, images, etc
import SharedConnections from '../SharedConnections';
import ReceivedConnections from '../NavigationContext/ReceivedContacts';

const SideBarConnections = ({ showReceived }) => {
    return (
        <>
            {
                showReceived === true ? <ReceivedConnections /> : <SharedConnections />
            }
        </>
    )
};

export default SideBarConnections;