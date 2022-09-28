import React, {useContext} from "react";
import styled from "styled-components"; 

import { NavigationContext } from '../../NavigationContext/NavigationContext.js';
import {toggleSidebar} from "../../NavBar/NavBar";
import breakpoints from "../../../styles/breakpoints";
import colors from "../../../styles/colors";

import LoungeGuest from "./LoungeGuest";

const LoungeGuests = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-height: 287px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`;
const GuestButton = styled.div`  
    align-items: center;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    margin-bottom: 1.3em;
    padding: .4em;
    width: calc(50% - .8em);

    &:hover, :focus {
        background: ${colors.grey[1]};
    }

    @media (min-width: ${breakpoints.smUp}px) { 
        width: calc(33% - .8em);
    }
    @media (min-width: ${breakpoints.mdUp}px) { 
        width: calc(20% - .8em);
    }
`;  

const Component = ({ guests }) => {
    const { isOpen, setIsOpen, sidebarView, setSidebarView, profileId, setProfileId, currUser} = useContext(NavigationContext); 
 
    const onClick = ( id ) => {
        let profileToShow = currUser.id === id ? "ownProfile" : "profile"
        toggleSidebar(isOpen, setIsOpen, sidebarView, profileToShow, setSidebarView, setProfileId, profileId, id) 
    };

    const onKeyPress = ( e, id ) => {
        const enterOrSpace =
            e.key === "Enter" ||
            e.key === " " ||
            e.key === "Spacebar" ||
            e.which === 13 ||
            e.which === 32;
        if (enterOrSpace) {
            e.preventDefault();
            onClick(id);
        }
    };

    return (
        <LoungeGuests>
            {guests && (
                guests.map(({ picture, name, id }, index) => { 
                    return (
                        <GuestButton 
                            role="button"
                            onClick={() => {onClick(id)}}
                            onKeyPress={(e) => {onKeyPress(e, id)}}
                            tabIndex={0}
                            title={`${name}, open sidebar profile`}
                            aria-label={`${name}, open sidebar profile`}
                            key={`LOUNGEGUESTS_${index}`}>
                            <LoungeGuest picture={picture} name={name} />
                        </GuestButton>
                    )
                })
            )}
        </LoungeGuests>
    );
}

export default Component;