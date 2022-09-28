import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components';
import FocusTrap from 'focus-trap-react';

import breakpoints from '../../styles/breakpoints';
import colors from '../../styles/colors';
import closeSideBar from '../SideBarToggle/closeSideBar.js';
import uniqueId from "../../utils/uniqueId";

import SideBarConnections from '../SideBarConnections';
import SideBarProfile from '../SideBarProfile';
import SideBarOwnProfile from '../SideBarOwnProfile';
import Button from '../elements/Button';
import SideBarClose from '../Assets/SidebarIcons/SideBarClose';
import { NavigationContext } from '../NavigationContext/NavigationContext.js';
import ConnectionToggle from "../ConnectionToggle";

const Wrapper = styled.div`
    background: ${colors.grey[2]};
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    box-shadow: ${props => props.isOpen && '0px 4px 10px rgba(0, 0, 0, 0.25)'};
    display: flex;
    flex-direction:  column;
    height: calc(100% - 54px);
    max-width: 400px;
    margin-left: 0px;
    top: 54px;
    width: calc(100% - 1em);
    transition: transform .4s; 
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-400px)'};
    position: fixed;
    z-index: 3;
    @media (min-width: ${breakpoints.smUp}px) { 
        height: 100%;
        top: 0;
        transform: ${props => props.isOpen ? 'translateX(59px)' : 'translateX(-400px)'};
    }
`;

const Top = styled.div`
    padding: 1em;
`;

const Main = styled.div` 
    overflow-x: hidden;
    padding: 0 1em 1em;  

    &::-webkit-scrollbar {
        display: none;
    }
`;

const Bottom = styled.div`
    text-align: center;
    padding: 1em;
`;

const CloseSideBar = styled.button`
    float: right;
`;

const Sidebar = () => {
    const [activeTrap, setActiveTrap] = useState(false);
    const { isOpen, setIsOpen, sidebarView, setSidebarView, setProfileId } = useContext(NavigationContext);
    const [showReceived, setShowReceived] = useState(true);
    
    useEffect(() => {
        if (isOpen) {
            setActiveTrap(true);
        } else {
            setActiveTrap(false);
        }
    }, [isOpen]);

    return (
        <FocusTrap
            active={activeTrap}
            focusTrapOptions={{
                allowOutsideClick: () => true,
                onDeactivate: () => {
                    setActiveTrap(false);
                },
            }}
        >
            <Wrapper isOpen={isOpen}>
                {isOpen && (
                    <>
                        <Top>
                            <CloseSideBar 
                                onClick={() => {
                                    closeSideBar({ setIsOpen, setSidebarView, setProfileId });
                                }}
                                title='Close sidebar'
                                aria-label={'Close sidebar'}
                            >
                                <SideBarClose uniqueId={uniqueId} label="Close sidebar"/>
                            </CloseSideBar>
                            {sidebarView === 'connection' && (
                                <ConnectionToggle setShowReceived={setShowReceived} showReceived={showReceived} />
                            )}
                        </Top>
                        <Main>
                            {sidebarView === 'connection' && (
                                <SideBarConnections showReceived={showReceived} />
                            )}
                            {sidebarView === 'profile' && (
                                <SideBarProfile />
                            )}
                            {sidebarView === 'ownProfile' && (
                                <SideBarOwnProfile />
                            )}
                        </Main>
                        <Bottom>
                            <Button styleas={'link'}
                                color={'#D60710'}
                                onClick={() => {
                                    closeSideBar({ setIsOpen, setSidebarView, setProfileId });
                                }}
                                ariaLabel={'Close sidebar'}
                            >
                                Close
                            </Button>
                        </Bottom>
                    </>
                )}
            </Wrapper>
        </FocusTrap>
    )
};

export default Sidebar;