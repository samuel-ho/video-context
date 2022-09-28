import React, {useState, useContext, useEffect} from "react";
import styled from 'styled-components';
import Emoji from 'react-emoji-render';

import { NavigationContext } from '../NavigationContext/NavigationContext.js';
import useProfileDetails from "../../hooks/getProfileDetails/useProfileDetails";

import { StyledBox, ProfileImageWrapper, GreenStatusDot, Name, TopArea, BottomArea, ContactInfo, Info, InfoStrong } from "../SideBarOwnProfile";

import Box from '../Box';
import UserImage from "../UserImage"; 
import HomeIcon from '../Assets/ProfileIcons/HomeIcon'; 
import MajorIcon from '../Assets/ProfileIcons/MajorIcon'; 
import EmailIcon from '../Assets/ProfileIcons/EmailIcon'; 
import OtherContactIcon from '../Assets/ProfileIcons/OtherContactIcon'; 
import SideBarShare from '../SideBarShare'; 
import Paragraph from '../elements/Paragraph';

const AdaptedStyledBox = styled(StyledBox)`
    margin-bottom: 1em;
`;

const NotMetUserYetBox = styled(Box)`
    align-items: center;
    display: flex;
    flex-direction: row;
`;

const ShrugEmoji = styled(Emoji)`
    font-size: 2em;
    padding-right: .5em;
`;

const SideBarProfile = () => {
    const imageSize = 150;
    const imageSurroungingBorder = '.5em';

    const { currUser, profileId, previousChatGroup } = useContext(NavigationContext);
    const { picture, name, major, town, email, isFollowing, otherContact, isLoading} = useProfileDetails(profileId, currUser.id);
    const [allowSharing, setAllowSharing] = useState(false)
    const [currUserDetails] = useState({
        id: currUser.id,
        name: currUser.name,
        picture: currUser.picture
    });

    useEffect(() => {
        if (previousChatGroup.some(e => e.id === profileId)) {
            setAllowSharing(true)
        }
    }, [previousChatGroup, allowSharing, profileId]);
       
    return (
        <>
            <AdaptedStyledBox imageSize={imageSize} imageSurroungingBorder={imageSurroungingBorder}>
                <TopArea>
                    <ProfileImageWrapper imageSize={imageSize} imageSurroungingBorder={imageSurroungingBorder}>
                        <UserImage height={150} width={150} src={picture} userName={name} />
                    </ProfileImageWrapper>
                    <GreenStatusDot /> 
                    <Name>{name}</Name> 
                </TopArea>
                
                <BottomArea>
                    <ContactInfo>
                        <HomeIcon ariaHidden={"true"}/>
                        <Info>From <InfoStrong>{town}</InfoStrong></Info>
                    </ContactInfo>
                
                    <ContactInfo>
                        <MajorIcon ariaHidden={"true"}/>
                        <Info>Major <InfoStrong>{major}</InfoStrong></Info>
                    </ContactInfo>

                    {isFollowing && (
                        <>
                            <ContactInfo>
                                <EmailIcon ariaHidden={"true"}/>
                                <Info><InfoStrong>{email}</InfoStrong></Info>
                            </ContactInfo>
                        
                            <ContactInfo>
                                <OtherContactIcon ariaHidden={"true"}/>
                                <Info><InfoStrong>{otherContact}</InfoStrong></Info>
                            </ContactInfo>
                        </>
                    )}
                </BottomArea>
            </AdaptedStyledBox>

            <div>
                {allowSharing ? (
                    <SideBarShare profileId={profileId} name={name} currUserDetails={currUserDetails} isLoading={isLoading} isFollowing={isFollowing} />
                ) : (
                    <NotMetUserYetBox>
                        <ShrugEmoji text=":shrug:" aria-hidden={"true"}/>
                        <Paragraph marginBottom={'0'}>You’ve not yet met {name} in a chat, you are not able to connect with them yet.</Paragraph>
                    </NotMetUserYetBox>
                )}
            </div>
        </>
    )
};

export default SideBarProfile;