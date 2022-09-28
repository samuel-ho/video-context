// External imports, installed libraries, etc
import React, { useContext }from "react";
import styled from 'styled-components';

// Internal data, functions, custom hooks, etc
import useSharedContacts from '../../hooks/getSharedContacts/useSharedContacts';
import { NavigationContext } from '../NavigationContext/NavigationContext.js';
import {toggleSidebar} from '../NavBar/NavBar';

// Internal components, images, etc
import Box from '../Box';
import UserImage from '../UserImage';
import Paragraph from '../elements/Paragraph';

const FlexedBox = styled(Box)`
    cursor: pointer;
    align-items: center;
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
`;

const Span = styled.span`
    margin-left: 10px;
`;

const SharedConnections = () => {
    const { currUser, isOpen, setIsOpen, sidebarView, setSidebarView, profileId, setProfileId } = useContext(NavigationContext);
    const sharedContacts = useSharedContacts(currUser.id);

    return (
        <>
            {sharedContacts && (
                sharedContacts.following && (
                    (sharedContacts.following.length > 0) ? (
                        sharedContacts.following.map((contact, index) => {
                            const keyID = `contact_${index}`;
                            return (
                                <div
                                    role="button"
                                    tabIndex="0"
                                    onClick={() => {
                                        toggleSidebar(isOpen, setIsOpen, sidebarView, 'profile', setSidebarView, setProfileId, profileId, contact.id);
                                    }}
                                    key={keyID}
                                >
                                    <FlexedBox>
                                        <UserImage src={contact.picture}/>
                                        <Span>{contact.name}</Span>
                                    </FlexedBox>
                                </div>
                            )
                        })
                    ) : ( 
                        <Box>
                            <Paragraph>You haven't shared your contact details with anyone yet.</Paragraph>
                            <Paragraph marginBottom={'0'}>Join some chats to make new connections!</Paragraph>
                        </Box>
                    )
                )
            )}
        </>
    )
};

export default SharedConnections;

   