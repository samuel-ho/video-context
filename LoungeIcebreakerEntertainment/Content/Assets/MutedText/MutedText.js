import React from "react";
import styled from "styled-components";

import colors from "../../../../../styles/colors";

import {ParagraphStyles} from "../../../../elements/Paragraph";

const MutedText = styled.span`
    ${ParagraphStyles};
    display: block;
    color: ${colors.grey[7]};
    margin-bottom: ${props => props.marginbottom ? props.marginbottom : 0}em;
`;

function Component({ children, marginBottom }) {

    return (
        <MutedText marginbottom={marginBottom}>
            <small>{children}</small>
        </MutedText>
    )
}

export default Component;