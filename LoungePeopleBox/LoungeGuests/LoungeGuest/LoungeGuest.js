import React from "react";
import styled from "styled-components";

import UserImage from "../../../UserImage";
import { ParagraphStyles } from "../../../elements/Paragraph";
import GreenStatusDot from "../../../Assets/GreenStatusDot";
import SrOnly from '../../../SrOnly';

const LoungeGuest = styled.div`
    align-items: center;
    display: inline-flex; 
    flex-direction: column;
    text-align: center;
`;

const ProfilePicture = styled(UserImage)`
    margin-bottom: .5em;
`;

const Name = styled.span`
    ${ParagraphStyles}
    margin-bottom: 0.5em;
`;

const Component = ({ picture, name }) => {
    return picture && name ? (
        <LoungeGuest>
            <ProfilePicture height={50} width={50} userName={name} src={picture} ariaHidden="true"/>
            <Name ariaHidden="true"><small>{name.substring(0, 15)}{name.length > 15 && "..."}</small></Name>
            <SrOnly>{name}</SrOnly>
            <GreenStatusDot />
        </LoungeGuest >
    ) : null
}

export default Component;