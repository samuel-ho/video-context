// External imports, installed libraries, etc
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import colors from '../../styles/colors';
import fonts from "../../styles/fonts";
import { getNewConversationBooster } from "../LoungeIcebreakerEntertainment/utils/getNewConversationBooster";

import _Box from "../Box";
import { ReactComponent as IcebreakerNavIcon } from "./forum.svg";
import ConfettiBox from "../ConfettiBox";
import ConversationBooster from "../../../src/components/ConversationBooster";
import _SVGWrapper from "../SvgWrapper";
import SrOnly from '../SrOnly';

const iceBreakers = require("../../icebreakers.json");

const Box = styled(_Box)`   
  display: inline-flex;
  margin-bottom: .5em;
  padding: 0em;
  width: 100%;
`;
const IntroductionFlex = styled.div`
  align-items: center;
  display: flex;
`;

const IntroductionLi = styled.li`
  margin-bottom: 1em;
  &:last-of-type {
    margin-bottom:0em;
  }
`;

const Column = styled.div`
  float: left;
  width: 2em;   
  height: inherit;
  padding: 1em;
  height: 8em;
  background: white;
  border-radius: 1em;
`;

const Column2 = styled.div`
  float: left; 
  padding: 1em;
  background: white;
  border-left: 0.01em solid ${colors.grey[1]};
  width: 100%;
  border-radius: 0em 1em 1em 0em;;
`;

const SubTitle = styled.span<any>`
  color: ${colors.grey[7]};
  font-weight: ${fonts.fontWeight.regular};
  display: block;
  font-size: 0.8em;  
  margin-left: -0.5em;
  ${props => props.marginBottom && `margin-bottom ${props.marginBottom}em;`}
`;

const IconSpan = styled.span<any>`
  font-size: 1.5em; 
  cursor: pointer;
  ${props => {
    if (props.marker === 2) {
      return `opacity: 1;`;
    } else {
      return `filter: grayscale(0.8); opacity: 0.8;`
    }
  }}
`;

export const SvgWrapper = styled<any>(_SVGWrapper)``;

interface ForumIconProps {
  src: string;
}
export const ForumIcon = styled<any>(IcebreakerNavIcon) <ForumIconProps>`
  font-size: 1.5em;
  margin-top: 0.5em;
  text-align: center;
  cursor: pointer;
  ${props => {
    if (props.marker === 1) {
      return `fill: #327eff`;
    } else {
      return `fill: #B1B6BD;`
    }
  }}
`;

interface ComponentProps {
  intros: string[] | null;
}

const BigConfettiBox = styled(ConfettiBox)`
    height: 4em;
    width: 100%;
    margin-bottom: 1em;
`;

const IcebreakerText = styled.span`
  margin-bottom: .5em;
`;

const ConfettiContent = styled.div`
align-self: center;
display: inline-block;
flex: 1 1;
text-align: center;
`;

const InsideConfettiSub = styled.div`
  font-weight: 200;
  color: ${colors.grey[7]};
`;

const emojis = ["🤔", "🧐", "🙋"];

const Emoji = styled.span`
  font-size: 24px;
  margin-right: 0.5em;
`;

const Component = ({ intros }: ComponentProps) => {
  const [showBooster, setShowBooster] = useState(true);

  useEffect(() => {
    if (showBooster) {
      getNewConversationBooster();
      setShowBooster(false);
    }
  }, []);

  const [booster, setBooster] = useState({
    booster: iceBreakers.icebreakers[Math.floor(Math.random() * iceBreakers.icebreakers.length)],
    position: Math.floor(Math.random() * iceBreakers.icebreakers.length),
    clicks: 0,
  });

  const displayPanel = (key: number) => {
    switch (key) {
      case 1: return (
        <>
          <SubTitle marginBottom={3}>Icebreaker</SubTitle>
          <ConversationBooster
            clickHandler={getNewConversationBooster}
            clicks={booster.clicks}
            booster={booster}
            setBooster={setBooster}
          >
            <BigConfettiBox marginBottom={0} className="cbox">
              <ConfettiContent>
                <IcebreakerText>{booster.booster}</IcebreakerText>
                <InsideConfettiSub>Only you can see this topic</InsideConfettiSub>
              </ConfettiContent>
            </BigConfettiBox>
          </ConversationBooster>
        </>
      )
      default: return (
        <div>
          <SubTitle marginBottom={1}>Say Hello</SubTitle>
          <ol>
            <IntroductionLi>
              <IntroductionFlex><Emoji aria-hidden="true">👋</Emoji> Tell everyone your name</IntroductionFlex>
            </IntroductionLi>
            {intros && intros.map((item, index) => (
              <IntroductionLi key={`INTRODUCTION_${index}`}>
                <IntroductionFlex><Emoji aria-hidden="true">{emojis[index]}</Emoji>{item}</IntroductionFlex>
              </IntroductionLi>
            ))}
          </ol>
        </div>
      )
    }
  }

  const [key, setKey] = useState(2);

  const onClick = (state: any) => {
    setKey(state);
  };

  const onKeyPress = (e: any, state: any) => {
    const enterOrSpace =
      e.key === "Enter" ||
      e.key === " " ||
      e.key === "Spacebar" ||
      e.which === 13 ||
      e.which === 32;
    if (enterOrSpace) {
      e.preventDefault();
      onClick(state);
    }
  };

  return (
    <Box>
      <Column>
        <IconSpan
          onClick={() => onClick(2)}
          onKeyPress={(e: any) => onKeyPress(e, 2)}
          marker={key}
          role="button"
          tabIndex={0}
        >
          <span aria-hidden="true" title="Introduce yourself">👋</span><SrOnly>Introduce yourself</SrOnly>
        </IconSpan>
        <SvgWrapper>
          <ForumIcon
            onClick={() => onClick(1)}
            onKeyPress={(e: any) => onKeyPress(e, 1)}
            marker={key}
            role="button"
            aria-label="Icebreaker ideas"
            title="Icebreaker ideas"
            tabIndex={0} />
        </SvgWrapper>
      </Column>
      <Column2>
        {displayPanel(key)}
      </Column2>
    </Box>
  );
};

export default Component;
