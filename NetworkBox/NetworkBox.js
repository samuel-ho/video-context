// External imports, installed libraries, etc
import React, {useContext} from "react";
import styled from "styled-components";

// Internal data, functions, custom hooks, etc
import colors from '../../styles/colors';
import { NavigationContext } from '../NavigationContext/NavigationContext.js';
import { toggleSidebar } from "../NavBar/NavBar";

// Internal components, images, etc
import _Box from "../Box";
import UserImage from '../UserImage';
import ConnectionIcon from "../Assets/ConnectionIcon";
import breakpoints from "../../styles/breakpoints";
import _GreenStatusDot from "../Assets/GreenStatusDot";
import Paragraph from '../elements/Paragraph';
import Info from '../Assets/GameSamplerIcons/infoIcon.svg';

const GreenStatusDot = styled(_GreenStatusDot)`
  margin: 0em 1em 0.3em 0.6em;
`;

const HelperTag = styled.span`
  display: flex;
  margin-left: 0.5em;
`;

const InfoIcon = styled.img`
    margin-right: 8px;
    margin-top: 5px;
`;

const NetworkRow = styled.div`
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: .5em;
  padding: 8px 12px;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover, :focus {
    background: ${colors.grey[1]};
  }
`;

const Box = styled(_Box)`  
  align-items: center;
  margin-bottom: 1em;

  @media (max-width: ${breakpoints.mdDown}px) {
    max-width: 100%
  }
`;

const UserDetailsContainer = styled.span`
  display: flex;
  align-items: center;
`;

const Name = styled.div`
  margin-top: -0.2em;
`;

const LastChatTitle = styled.span`
  font-size: 20px;
  margin-left: 0.3em;
`;

const TitleArea = styled.div`
  margin-bottom: 0.5em;
`;

const NetworkBox = () => {
    const { isOpen, setIsOpen, sidebarView, setSidebarView, profileId, setProfileId, currUser, previousChatGroup } = useContext(NavigationContext);
    
    const onClick = (isOpen, setIsOpen, sidebarView, newProfileView, setSidebarView, setProfileId, profileId, userId) => {
      toggleSidebar(isOpen, setIsOpen, sidebarView, newProfileView, setSidebarView, setProfileId, profileId, userId);
    };

    const onKeyPress = ( e, isOpen, setIsOpen, sidebarView, newProfileView, setSidebarView, setProfileId, profileId, userId ) => {
        const enterOrSpace =
            e.key === "Enter" ||
            e.key === " " ||
            e.key === "Spacebar" ||
            e.which === 13 ||
            e.which === 32;
        if (enterOrSpace) {
            e.preventDefault();
            onClick(isOpen, setIsOpen, sidebarView, newProfileView, setSidebarView, setProfileId, profileId, userId);
        }
    };

    return (
      <Box>
        <TitleArea>
          <LastChatTitle>Your last chat</LastChatTitle>
        </TitleArea>
        <HelperTag>
          <InfoIcon src={Info} height={14}/>
          <Paragraph marginBottom={'0'}><small>Click on the + icon to share your contact details with another user!</small></Paragraph>
        </HelperTag>
        {previousChatGroup.map((user) => {
          if (user.id !== currUser.id) {
            return (
              <NetworkRow key={`NETWORKBOX_` + user.id} 
                onClick={() => {onClick(isOpen, setIsOpen, sidebarView, 'profile', setSidebarView, setProfileId, profileId, user.id);}}
                onKeyPress={(e) => {onKeyPress(e, isOpen, setIsOpen, sidebarView, 'profile', setSidebarView, setProfileId, profileId, user.id);}}
                tabIndex="0"
                role={'button'}
                title={`Connect with ${user.name}, open sidebar profile`}
                aria-label={`Connect with ${user.name}, open sidebar profile`}
              >
                <UserDetailsContainer>
                  <UserImage height={50} width={50} userName={user.name} src={user.picture} />
                  <GreenStatusDot />
                  <Name>{user.name}</Name>
                </UserDetailsContainer>
                <ConnectionIcon />
              </NetworkRow>
            )
          }
          return("");
        })}
      </Box>
    )
};

export default NetworkBox;
