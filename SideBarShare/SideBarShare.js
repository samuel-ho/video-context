import React, { useState, useEffect } from "react";
import styled from "styled-components";

import colors from '../../styles/colors';
import UseSharedContacts from '../../hooks/getSharedContacts/useSharedContacts';
import { shareContactDetails } from "../../hooks/shareContactDetails/shareContactDetails";

import Box, { boxPaddingHorizontal, boxPaddingVertical, boxBorderRadius} from '../Box';
import Button from '../elements/Button';
import ConnectionIcon from "../Assets/ConnectionIcon";
import DoubleTicks from '../Assets/SidebarIcons/DoubleTicks/DoubleTicks';

const FlexBox = styled(Box)`  
    align-items: center;
    display: flex;
    padding: ${boxPaddingVertical*1.2}rem ${boxPaddingHorizontal}rem;
`;

const ShareButton = styled(Button)`
    background: ${colors.white};
    border-color: transparent;
    border-radius: ${boxBorderRadius};
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    color: ${colors.blue.gradient.top};
    text-align: left;
    padding: ${boxPaddingVertical*1.2}rem ${boxPaddingHorizontal}rem;

    &:hover, :focus {
        background: ${colors.white};
        border-color: transparent;
        color: ${colors.blue.gradient.top};
        text-decoration: underline;
    }
`;

const YouveSharedYourDetails = ({name}) => {
    return (
        <FlexBox>
            <span>You've shared your contact details with {name}</span>
            <DoubleTicks/>
        </FlexBox>
    )
}

const ShareSideBar = ({ name, profileId, currUserDetails, isLoading }) => {
    const [isClicked, setIsClicked] = useState(false);
    const [hasSharedDetailsBefore, setHasSharedDetailsBefore] = useState(false);
    const sharedContacts =  UseSharedContacts(profileId);

    const handleClick = () => {
        setIsClicked(true);
        shareContactDetails(profileId, currUserDetails)
    }

    useEffect(() => {
        setHasSharedDetailsBefore(
            sharedContacts.followers && sharedContacts.followers.some(e => e.id === currUserDetails.id)
        ) 
        setIsClicked(false);
    }, [sharedContacts.followers, profileId, currUserDetails.id]);

    return (
        !isLoading && !hasSharedDetailsBefore ? (
                !isClicked ? (
                    <ShareButton onClick={() => handleClick()}>
                        <span>Share your contact details with {name}</span>
                        <ConnectionIcon />
                    </ShareButton>
                ) : (
                    <YouveSharedYourDetails name={name} />
                )
            ) : (
                <YouveSharedYourDetails name={name} />
            )
        
    );
};

export default ShareSideBar;