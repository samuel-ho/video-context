// External imports, installed libraries, etc
import React, { useContext } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import styled from 'styled-components';
import { useHistory } from "react-router-dom"

// Internal data, functions, custom hooks, etc
import buttonColors from '../elements/Button/buttonColors';
import colors from '../../styles/colors';
import breakpoints from '../../styles/breakpoints';
import sideBarToggle from '../../components/SideBarToggle/SideBarToggle';
import { NavigationContext } from '../NavigationContext/NavigationContext.js';
import {SetUserContext} from "./setUserContext";
import uniqueId from "../../utils/uniqueId";

// Use if want to only clear user state only(ie. Logout)
import clearUserLoungeStates from "../../hooks/leaveLounge/leaveLounge"

// Use if want to redirect to clear user state but remain on page (ie. return to HomePage)
import UseLeaveLounge from "../../hooks/leaveLounge/useLeaveLounge"

// Internal components, images, etc
import SideBar from '../../components/SideBar';
import Link from '../elements/Link';
import TFlogo from '../../components/Assets/LogoIcon';
import InstitutionIcon from '../Assets/InstitutionIcon';
import LogoutIcon from '../Assets/NavIcons/LogoutIcon';
import AccountIcon from '../Assets/NavIcons/AccountIcon';
import ConnectionIcon from '../Assets/NavIcons/ConnectionsIcon';
import SvgWrapper from '../SvgWrapper';


const navWidthDesktop = 56;

const Nav = styled.nav`
  align-items: center;
  background: ${colors.grey[1]};
  display: flex;
  height: 50px; 
  min-width: ${navWidthDesktop}px;
  position: fixed;
  width: 100%;
  z-index: 4;
  top: 0;

  @media (min-width: ${breakpoints.smUp}px) { 
    align-items: flex-start;
    height: auto;
    max-width: ${navWidthDesktop}px;
    flex-basis: ${navWidthDesktop}px;
    position: relative;
    
    &::after {
      bottom: auto;
      display: block;
      width: 4px;
      height: 100%;
      left: auto;
      top: 0;
      right: -4px;
    };
  } 
`;

//    ${'linear-gradient(45deg,' + buttonColors.orange.top + ',' + buttonColors.orange.bottom + ')'};
const NavContentWrapper = styled.div`
  background: ${colors.grey[1]};
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;

  &::after {
    background: #E0E0E1;
    content: '';
    bottom: -4px;
    display: block;
    height: 4px;
    left: 0;
    position: absolute;
    width: 100%;
  }

  @media (min-width: ${breakpoints.smUp}px) {
    align-items: stretch;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100vh - 40px);
    max-width: ${navWidthDesktop}px;
    padding: 20px 0;
    position: fixed;
    width: ${navWidthDesktop}px;
    
    &::after {
      bottom: auto;
      box-shadow: 2px 0px 4px #E0E0E1;
      display: block;
      width: 4px;
      height: 100%;
      left: auto;
      top: 0;
      right: -4px;
    }
  }
`;

const NavLogoWrapper = styled.div`
  align-items: center;
  display: flex; 
  flex-direction: row;
  @media (min-width: ${breakpoints.smUp}px) {
    flex-direction: column;
  }
`;

const NavLogo = styled.span`
  align-items: center;
  margin-right: 10px;
  text-align: center;
  @media (min-width: ${breakpoints.smUp}px) {
    display: block;
    margin-bottom: 1rem;
    margin-right: 0;
    width: ${navWidthDesktop}px;
  }
`;

const ClientLogoImg = styled.img`
  border-radius: 2px;
  max-width: 38px;
  width: 100%;
`;

const NavIconsWapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;

  @media (min-width: ${breakpoints.smUp}px) {
    flex-direction: column;
  }
`;

const NavItem = styled.button`
  text-align: center;
  margin-right: 10px;

  &:last-of-type {
    margin-right: 0;
  }

  @media (min-width: ${breakpoints.smUp}px) {
    margin-bottom: 1rem;
    margin-right: 0;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;

const LogoutWrapper = styled.span`
  @media (max-width: ${breakpoints.smDown}px) {
    display: inline-block;
    transform: rotateY(180deg);
  }
`;

const ConnectionWrapper = styled.span`
    position: relative;
    
    &::after {
      border-radius: 100%;
      background: ${colors.primary[0]};
      content: '';
      display: block;
      height: 8px;
      position: absolute;
      right: -6px;
      top: -12px;
      width: 8px;
    }
`;

export const toggleSidebar = (isOpen, setIsOpen, sidebarView, newSidebarView, setSidebarView, setProfileId, profileId, newProfileId) => {
  sideBarToggle({ isOpen, setIsOpen, sidebarView, newSidebarView, setSidebarView, setProfileId, profileId, newProfileId });
};

const NavBar = ({ auth0IsAuthenticated }) => {
  const { logout } = useAuth0();
  const { isOpen, setIsOpen, sidebarView, setSidebarView, profileId, setProfileId, currUser } = useContext(NavigationContext);
  const history = useHistory();
  
  return (
    <>
      <Nav>
        <NavContentWrapper>
          <NavLogoWrapper>
            <Link 
            to={'/'} 
            title="Home page" 
            onClick={() =>  {
              UseLeaveLounge(currUser.id, history);
            }}
            ariaLabel="Home page"
            >
              <NavLogo><TFlogo width={36} height={36} uniqueId={uniqueId} label="Home page" /></NavLogo>
            </Link>
            <NavLogo><InstitutionIcon /></NavLogo>
          </NavLogoWrapper>
          <NavIconsWapper>
            {auth0IsAuthenticated && (
              <>
              <SetUserContext />
                <NavItem 
                  title={'Connections'}
                  aria-label={'Connections'}
                  onClick={() => {toggleSidebar(isOpen, setIsOpen, sidebarView, 'connection', setSidebarView, setProfileId, profileId, currUser.id);}}>
                  <ConnectionWrapper>
                    <ConnectionIcon/>
                  </ConnectionWrapper>
                </NavItem>
                <NavItem
                  title={'My profile'}
                  aria-label={'My profile'} 
                  onClick={() => {toggleSidebar(isOpen, setIsOpen, sidebarView, 'ownProfile', setSidebarView, setProfileId, profileId, currUser.id);}}>
                  <SvgWrapper>
                    <AccountIcon uniqueId={uniqueId} label="My profile"/>
                  </SvgWrapper>
                </NavItem>
                <NavItem 
                  title={'Logout'}
                  aria-label={'Logout'}
                  onClick={() => { clearUserLoungeStates(currUser.id).then(() => {logout({returnTo: window.location.origin})} )} }>
                  <LogoutWrapper>
                    <LogoutIcon uniqueId={uniqueId} label="Logout"/>
                  </LogoutWrapper>
                </NavItem>
              </>
            )}
          </NavIconsWapper>
        </NavContentWrapper>
      </Nav>
      <SideBar/>
    </>
  );
};

export default NavBar;
