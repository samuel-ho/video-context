import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import FocusTrap from 'focus-trap-react';

import breakpoints from '../../styles/breakpoints';
import colors from '../../styles/colors';
import closeSideBar from '../SideBarToggle/closeSideBar.js';

import SideBarConnections from '../SideBarConnections';
import SideBarProfile from '../SideBarProfile';
import Button from '../elements/Button';
import CloseButton from '../Assets/SidebarIcons/closeButton.svg';

const Wrapper = styled.div`
    background: ${colors.grey[2]};
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    box-shadow: ${props => props.isOpen && '0px 4px 10px rgba(0, 0, 0, 0.1)'};
    display: flex;
    flex-direction:  column;
    height: calc(100% - 54px);
    max-width: 400px;
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
    overflow-y: scroll;
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

const Sidebar = ({ isOpen, sidebarView, setIsOpen, setSidebarView }) => {
    const [activeTrap, setActiveTrap] = useState(false);

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
                            <CloseSideBar onClick={() => {
                                closeSideBar({ setIsOpen, setSidebarView });
                            }}>
                                <img src={CloseButton} alt="Close" />
                            </CloseSideBar>
                        </Top>
                        <Main>
                            {sidebarView === 'connection' && (
                                <SideBarConnections />
                            )}
                            {sidebarView === 'profile' && (
                                <SideBarProfile id={1} />
                            )}
                        </Main>
                        <Bottom>
                            <Button styleas={'link'}
                                color={'red'}
                                onClick={() => {
                                    closeSideBar({ setIsOpen, setSidebarView });
                                }}
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