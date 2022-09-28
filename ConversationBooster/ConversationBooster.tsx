// External imports, installed libraries, etc
import React from "react";
import styled from "styled-components";

// Internal components, images, etc
import _Box from "../Box";
import { ParagraphStyles } from "../elements/Paragraph";
import _Button from "../elements/Button";
import _SVGWrapper from "../SvgWrapper";

import { ReactComponent as Logo } from "./autorenew.svg";

import fonts from "../../styles/fonts";

/**
 * @param {JSX.element} children : The question being pulled into the component from a hook in parent component.
 * @param {string} className : Class name for box component.
 * @param {number} marginBottom : The margin in pixels at the bottom of the box component.
 * @param {function} clickHandler : Brought in from parent, has to randomise through the array.
 * @param {number} clicks : The number of clicks which is passed down as a state from parent.
 */

const Question = styled.span`
  ${ParagraphStyles}
  display: flex;
  margin-bottom: 1.5em;
  height: 4em;
  align-items: center;
  justify-content: center;
  font-size: 0.8em;
  font-weight: ${fonts.fontWeight.bold};
  text-align: center;
  padding: 1em 0em;
`;

export const Button = styled<any>(_Button)`
  font-size: 10px;
`;


export const Box = styled<any>(_Box)`
  text-align: center;
`;
export const SvgWrapper = styled<any>(_SVGWrapper)``;

interface ConversationBoosterIconProps {
  src: string;
}
export const ConversationBoosterIcon = styled<any>(Logo) <
  ConversationBoosterIconProps
  >`
  fill: white;
  margin-right: 0.5em;
  width: 12px;
  height: 12px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;  
    margin-bottom: 0.5em;
`;

const Component = ({
  children,
  className,
  clickHandler,
  clicks,
  booster,
  setBooster
}: ComponentProps): JSX.Element => {
  return (
    <>
      <Question className={className}>{children}</Question>
      <ButtonWrapper>
        <Button onClick={(e: Event) => clickHandler(booster, setBooster, e, true)}>
          <SvgWrapper>
            <ConversationBoosterIcon />
          </SvgWrapper>
          {clicks === 1
            ? "New conversation booster"
            : "Next conversation booster"}
        </Button>
      </ButtonWrapper>
    </>
  );
};

interface Booster {
  booster: string;
  position: number;
  clicks: number;
}

interface ComponentProps {
  children?: any;
  className?: string;
  clickHandler: (booster: Booster, setBooster: React.Dispatch<React.SetStateAction<Booster>>, e: Event, isTyped: boolean) => void;
  clicks: number;
  booster: Booster;
  setBooster: React.Dispatch<React.SetStateAction<Booster>>;
}


export default Component;
