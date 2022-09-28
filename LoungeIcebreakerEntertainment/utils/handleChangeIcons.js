import React from "react";
import styled from "styled-components";

import { ReactComponent as Favorite } from "../LocalNavigation/Icons/favorites.svg";
import { ReactComponent as Suggest } from "../LocalNavigation/Icons/suggest.svg";
import { ReactComponent as Vote } from "../LocalNavigation/Icons/vote.svg";

import colors from "../../../styles/colors";

export const Icon = styled.span`
    align-items: center;
    padding-bottom: 0.75em;
    &:first-child {
        ${props => props.current ? `fill: ${colors.blue[6.5]};` : `fill: ${colors.grey[2]};`}
    }
`;

// Span and conditional return based on prop.

export const handleChangeIcons = (navLink, current) => {
    switch (navLink) {
        case "FAVORITES":
            return <Icon current={current} aria-hidden="true"><Favorite /></Icon>;
        case "SUGGEST":
            return <Icon current={current} aria-hidden="true"><Suggest /></Icon>;
        case "VOTE":
            return <Icon current={current} aria-hidden="true"><Vote /></Icon>;
        default:
            return <Icon current={true} aria-hidden="true"><Vote /></Icon>;
    }
};