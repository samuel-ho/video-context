// External imports, installed libraries, etc
import React, { useContext } from "react";
import styled from 'styled-components';

// Internal data, functions, custom hooks, etc
import useSharedContacts from '../../../hooks/getSharedContacts/useSharedContacts';
import { NavigationContext } from '../NavigationContext.js';
import { toggleSidebar } from '../../NavBar/NavBar';

// Internal components, images, etc
import Box from '../../Box';
import UserImage from '../../UserImage';
import Paragraph from '../../elements/Paragraph';

const FlexedBox = styled(Box)`
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
`;

const Span = styled.span`
    margin-left: 10px;
`;

const ReceivedConnections = () => {
    const { currUser, isOpen, setIsOpen, sidebarView, setSidebarView, profileId, setProfileId } = useContext(NavigationContext);
    const sharedContacts = useSharedContacts(currUser.id);
    return (
        <>
            {sharedContacts && (
                sharedContacts.followers && (
                    (sharedContacts.followers.length > 0) ? (
                        sharedContacts.followers.map((contact, index) => {
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
                                        <UserImage src={contact.picture} />
                                        <Span>{contact.name}</Span>
                                    </FlexedBox>
                                </div>
                            )
                        })
                    ) : ( 
                        <Box>
                            <Paragraph>You haven't been sent any contact details from others on the platform.</Paragraph>
                            <Paragraph marginBottom={'0'}>Join some chats to make new connections!</Paragraph>
                        </Box>
                    )
                )
            )}
        </>
    )
};

export default ReceivedConnections;