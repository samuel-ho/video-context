import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import useOwnProfileDetails from "../../hooks/getOwnProfileDetails/useOwnProfileDetails";

import Box, { boxPaddingHorizontal, boxPaddingVertical } from '../Box';
import UserImage from "../UserImage"; 
import _GreenStatusDot from '../Assets/GreenStatusDot';
import HomeIcon from '../Assets/ProfileIcons/HomeIcon'; 
import MajorIcon from '../Assets/ProfileIcons/MajorIcon'; 
import EmailIcon from '../Assets/ProfileIcons/EmailIcon'; 
import OtherContactIcon from '../Assets/ProfileIcons/OtherContactIcon';  

export const StyledBox = styled(Box)`
    margin-top: ${props => props.imageSize && (`calc(${props.imageSize/2}px + ${props.imageSurroungingBorder})`)};
    padding: 0;
`;

export const ProfileImageWrapper = styled.span`
    margin-top: ${props => props.imageSize && (`calc(-${props.imageSize/2}px - ${props.imageSurroungingBorder})`)};
    background: ${colors.white};
    padding: ${props => props.imageSurroungingBorder};
    display: inline-block;
    border-radius: 100%;
`;

export const GreenStatusDot = styled(_GreenStatusDot)`
    margin: 0 auto .5em;
`;

export const Name = styled.span`
    font-size: 1.2em;
    font-weight: ${fonts.fontWeight.bold}; 
    text-align: center;
`;

export const TopArea = styled.div` 
    border-bottom: 0.01em solid #D3D3D3;
    padding: 0 ${boxPaddingHorizontal}em ${boxPaddingVertical}em;
    text-align: center; 
`;

export const BottomArea = styled.div` 
    padding: ${boxPaddingVertical}em ${boxPaddingHorizontal}em;
`;

export const ContactInfo = styled.div`
    align-items: center;
    display: flex;
    margin-bottom: .8em;

    &:last-of-type {
        margin-bottom: 0;
    }
`;

export const Info = styled.span`
    padding-left: .5em;
`;

export const InfoStrong = styled.span`
    font-weight: ${fonts.fontWeight.medium};
`;

const SideBarProfile = ( ) => {
    const imageSize = 150;
    const imageSurroungingBorder = '.5em';
    
    const { user } = useAuth0();
    const { picture, name, major, town, email, otherContact} = useOwnProfileDetails(user.email);
    
    return (
        <StyledBox imageSize={imageSize} imageSurroungingBorder={imageSurroungingBorder}>
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

                <ContactInfo>
                    <EmailIcon ariaHidden={"true"}/>
                    <Info><InfoStrong>{email}</InfoStrong></Info>
                </ContactInfo>
                {otherContact ?                 
                <ContactInfo>
                    <OtherContactIcon ariaHidden={"true"}/>
                    <Info><InfoStrong>{otherContact}</InfoStrong></Info>
                </ContactInfo>
                : null    
                }
            </BottomArea>
        </StyledBox>
    )
};

export default SideBarProfile;