// External imports, installed libraries, etc
import React, {useContext} from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';

// Internal data, functions, custom hooks, etc
import colors from "../../../styles/colors";
import { NavigationContext } from '../../NavigationContext/NavigationContext.js';
import {toggleSidebar} from "../../NavBar/NavBar";

// eslint-disable-next-line

import breakpoints from "../../../styles/breakpoints";

// Internal components, images, etc
import _UserImage from "../../UserImage";
import ConnectionIcon from "../../Assets/ConnectionIcon";

const ChatRoster = styled.div<ComponentProps>`
  border-radius: 6px;
  cursor: pointer;
  display: inline-block;
  margin-bottom: 4px;
  padding: 8px;
  width: calc(50% - 16px);

  @media (min-width: ${breakpoints.lgUp}px) {
    width: ${(props) => {
    switch (props.numberOfParticipants - 1) {
      case 5:
        return `calc(${100 / 3}% - 16px)`;
      case 4:
        return `calc(${100 / 3}% - 16px)`;
      case 3:
        return `calc(${100 / 3}% - 16px)`;
      case 2:
        return `calc(${100 / 2}% - 16px)`;
      case 1:
        return `calc(${100}% - 16px)`;
      default:
        return `calc(${100}% - 16px)`;
    }
    }};
  }

  &:hover, :focus {
    background: ${colors.grey[1]};
  }
`;

const Flex = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

interface UserImageProps {
  height?: any;
  width?: any;
  src?: any;
  userName?: any;
  alt?: any;
  ariaHidden: any;
}
const UserImage = styled(_UserImage) <UserImageProps>`
  margin-bottom: 8px;
`;

const Name = styled.div`
  margin-bottom: 8px;
`;

interface ComponentProps {
  children?: any;
  className?: any;
  tabIndex?: any;
  id?: string;
  name?: string;
  picture?: string;
  numberOfParticipants: number;
}
const Component = ({ id, className, name, picture, numberOfParticipants }: ComponentProps) => {
  const { isOpen, setIsOpen, sidebarView, setSidebarView, profileId, setProfileId} = useContext(NavigationContext);
  return (
    <ChatRoster
      role="button"
      tabIndex="0"
      aria-pressed="false"
      className={className}
      aria-label={"Connect with " + name}
      title={"Connect with " + name}
      numberOfParticipants={numberOfParticipants}
      onClick={() => {
        toggleSidebar(isOpen, setIsOpen, sidebarView, 'profile', setSidebarView, setProfileId, profileId, id )}}
    >
      <Flex>
        <UserImage src={picture} userName={name} ariaHidden={"true"}/>
        <Name>{name}</Name>
        <ConnectionIcon className="" ariaHidden="true" />
      </Flex>
    </ChatRoster>
  );
};

export default Component;
Component.propTypes = {
  isOpen: PropTypes.any,
  setIsOpen: PropTypes.any, 
  sidebarView: PropTypes.any, 
  newSidebarView: PropTypes.any, 
  setSidebarView: PropTypes.any, 
  setProfileId: PropTypes.any, 
  profileId: PropTypes.any, 
  newProfileId: PropTypes.any
};
