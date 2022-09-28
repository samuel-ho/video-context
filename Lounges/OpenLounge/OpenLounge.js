// External imports, installed libraries, etc
import React from "react";
import styled from "styled-components";

// Internal data, functions, custom hooks, etc
import fonts from "../../../styles/fonts";

// Internal components, images, etc
import _Link from "../../elements/Link";
import _Box, { boxPaddingHorizontal, boxPaddingVertical } from "../../Box";
import LoungeGuestCounter from "../../LoungeGuestsCounter";
import Paragraph from "../../elements/Paragraph";
import _EventStyledButton from "../../EventStyledButton";
import { H3Styles } from "../../elements/H3";
import SrOnly from '../../SrOnly';

import breakpoints from "../../../styles/breakpoints";

const imageWrapperStyleData = {
  height: 200,
  margintop: 10,
};

const ImageWrapper = styled.div`
  border-radius: 40px 40px 10px 10px;
  box-shadow: 0px -6px 20px 0px rgba(0, 0, 0, 0.15);
  height: ${imageWrapperStyleData.height}px;
  overflow: hidden;
  position: relative;
  transition: transform 0.4s;
  transform: translateY(10px);
`;

const Image = styled.img`
  border-radius: 40px 40px 10px 10px;
  width: 100%;
  min-height: ${imageWrapperStyleData.height}px;
`;

const EventStyledButton = styled(_EventStyledButton)`
  bottom: 1em;
  right: 1em;
  position: absolute;
`;

const Link = styled(_Link)`
  display: inline-block;
  margin-top: 10px;
  transition: transform 0.4s ease;
  width: 100%;

  &:hover,
  :focus {
    & ${ImageWrapper} {
      transform: translateY(0px);
    }
  }

  &:hover,
  :focus {
    text-decoration: none;
  }
`;

const Box = styled(_Box)`
  overflow: hidden;
  padding: 0;
  position: relative;
  white-space: break-spaces;
`;

const TopDetails = styled.div`
  padding: ${boxPaddingVertical}rem ${boxPaddingHorizontal}rem;
  min-height: 69px;
  @media (max-width: ${breakpoints.mdDown}px) {
    min-height: 107px;
  }
`;

const TopRowWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  margin-bottom: 0.5em;
  width: 100%;
`;

const LoungeTitle = styled.span`
  ${H3Styles};
  flex-grow: 1;
  margin-bottom: 0;
  word-break: break-word;
`;

const LoungeDesc = styled(Paragraph)`
  color: #6f6f6f;
  font-size: 0.9rem;
  font-weight: ${fonts.fontWeight.medium};
  line-height: 1rem;
  margin-bottom: 0;
`;

const OpenLounge = ({ lounge }) => {
  return (
    <Link to={'/lounge?id=' + lounge.id} >
      <Box>
        <TopDetails>
          <TopRowWrapper>
            <LoungeTitle>{lounge.name}</LoungeTitle>
            <LoungeGuestCounter count={lounge.guestCount} isOpen={true} loungeType={'open'} />
          </TopRowWrapper>
          <LoungeDesc aria-hidden="true">
            {lounge.description.substring(0, 100)}{lounge.description.length > 100 && "..."}
            <SrOnly>{lounge.description}</SrOnly>
          </LoungeDesc>
        </TopDetails>
        <ImageWrapper>
          <Image src={lounge.banner} alt={lounge.alt} />
        </ImageWrapper>
        <EventStyledButton />
      </Box>
    </Link>
  );
}

export default OpenLounge;
