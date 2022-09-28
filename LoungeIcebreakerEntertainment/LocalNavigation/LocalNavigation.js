import React from "react";

import styled from "styled-components";

import { handleChangeIcons } from "../utils/handleChangeIcons";
import { enumConverter } from "../utils/enumConverter";

import colors from "../../../styles/colors";
import fonts from "../../../styles/fonts";

import {boxPaddingVertical, boxPaddingHorizontal} from "../../Box";
import {ParagraphStyles} from "../../elements/Paragraph";

const NavLink = styled.div`
    ${ParagraphStyles};
    align-items: center;
    border-radius: 4px;
    color: ${props => props.current ? colors.grey[8] : colors.grey[7]};
    cursor: pointer;
    display: flex;
    flex-direction: column;
    flex: auto;
    font-weight: ${fonts.fontWeight.medium};
    margin-bottom: 0;
    padding: .25em;
    width: ${(props) => props.navItemWidth};
    
    &:hover, :focus {
        background: ${props => props.current ? colors.grey[1] : colors.grey[0]};
        color: ${colors.grey[7]};
        outline: none;

        & span {
            fill: ${props => !props.current && colors.grey[5]};
        }
    }
`;

const Nav = styled.div`
    display: flex;
    padding: ${boxPaddingVertical/2}em ${boxPaddingHorizontal}em;
    border-bottom: 1px solid ${colors.grey[1]};
`;

function Component({ navChanger, navContent, navPos, setNavPos, numberOfNavItems }) {
    const navItemWidth = ((100/numberOfNavItems)+'%');
    const onClick = (item, setNavPos) => {
        navChanger(item, setNavPos);
    };

    const onKeyPress = ( e, item, setNavPos ) => {
        const enterOrSpace =
            e.key === "Enter" ||
            e.key === " " ||
            e.key === "Spacebar" ||
            e.which === 13 ||
            e.which === 32;
        if (enterOrSpace) {
            e.preventDefault();
            onClick(item, setNavPos);
        }
    };
    return (
        <Nav>
            {Object.keys(navContent).map((item, index) => {
                let current = navPos.toUpperCase() === item;
                return (
                    <NavLink 
                        current={current} 
                        aria-label={current ? `Content open on ${enumConverter(item)} view` : `Open ${enumConverter(item)} content view`}
                        onClick={() => onClick(item, setNavPos)}
                        onKeyPress={(e) => onKeyPress(e, item, setNavPos)}
                        tabIndex={0}
                        role={'button'}
                        navItemWidth={navItemWidth}
                        key={'LOCALNAV_'+index}
                    >
                        {handleChangeIcons(item, current)}
                        {enumConverter(item)}
                    </NavLink>
                );
            })}
        </Nav>
    );
}

export default Component;