// External imports, installed libraries, etc
import React, { useState, useEffect } from "react";
import { Row, Col } from 'react-flexbox-grid';
import styled from "styled-components";

// Internal data, functions, custom hooks, etc
import colors from '../../../styles/colors';
import breakpoints from '../../../styles/breakpoints';
import fonts from '../../../styles/fonts';
import CookieBanner from "../../../components/CookieBanner";
import useWindowSize from '../../../hooks/useWindowSize';

// Internal components, images, etc
import Container from '../../../components/Container';
import _H1 from '../../../components/elements/H1';
import InstitutionIcon from '../../../components/Assets/InstitutionIcon';
import _H2 from '../../../components/elements/H2';
import _H3 from '../../../components/elements/H3';
import Paragraph, { ParagraphStyles } from '../../../components/elements/Paragraph';
import _Box from '../../../components/Box';
import _GetStartedButton from '../../../components/GetStartedButton';
import BackgroundMobile from '../../../components/Assets/images/splash-background-mobile.jpg'
import ImageOverlay from '../../../components/Assets/images/Splash-Img.png';

const ContentWrapper = styled.div`
  padding-top: ${props => props.pageTopPadding}px;
  position: relative;
  z-index: 2;
`;

const WelcomeImageOverlay = styled.div`
  background-image: url(${ImageOverlay});
  background-position: right;
  background-repeat: no-repeat;
  background-size: cover;
  bottom: 0;
  height: 100%;
  position: absolute;
  right: 0;
  width: 100%;
  z-index: 0;
`;

const Card = styled.div`
  background: ${colors.grey[0]};
  border-radius: 2px;
`

const H1 = styled(_H1)`
  font-weight: ${fonts.fontWeight.regular};
  line-height: 1.2em;
  margin-bottom: .4em;

  @media (min-width: ${breakpoints.lgUp}px) {
    font-size: 2.6em;
  }
`;

const ReallyTag = styled.span`
  display: inline-block;
  font-weight: ${fonts.fontWeight.bold};
  position: relative;
  z-index: 0;

  &::after {
    background: #00EB88;
    border-radius: 10px;
    bottom: -3px;
    content: '';
    display: block;
    height: 7px;
    left: -5%;
    position: absolute;
    width: 110%;
    z-index: -1;
  }
`;

const H3 = styled(_H3)`
  ${ParagraphStyles}
  background: rgba(0, 0, 0, .65);
  border-radius: 3px;
  color: ${colors.white};
  display: inline-block;
  font-size: .8em;
  font-weight: ${fonts.fontWeight.bold};
  padding: 3px 11px;
`;

const ClientLogoImg = styled.img`
  border-radius: 4px;
  margin-bottom: 1em;
  max-width: 70px;
  width: 100%;
`;

const H2 = styled(_H2)`
  font-size: 1.2rem;
  margin-bottom: 1.6rem;
`;

const Box = styled(_Box)`
  border-bottom: 4px solid ${colors.primary[0]};
  text-align: center;
  padding: 2em;

  @media (min-width: ${breakpoints.lgUp}px) {
    border-bottom: none;
  }
`;

const GetStartedButton = styled(_GetStartedButton)`
  padding-left: 44px;
  padding-right: 44px;
  outline: none;
`;

const SplashBackground = styled.div`
  background-image: url(${BackgroundMobile});
  background-position: top left;
  background-repeat: no-repeat;
  background-size: cover;
  bottom: 0;
  height: 50vh;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: 0;

  @media (min-width: ${breakpoints.mdUp}px) {
    left: 60px;
    width: calc(100% - 60px);
  }
`;

const Splash = ({ ...props }) => {
  const { width: currentWidth } = useWindowSize();
  const [width, setWidth] = useState(currentWidth);
  const mobileViewDownSize = breakpoints.lgUp;
  const isMobile = width < mobileViewDownSize;

  useEffect(() => {
    if (currentWidth !== width) {
      setWidth(currentWidth);
    }
  }, [currentWidth, width]);

  return (
    <>
      <CookieBanner />
      <ContentWrapper pageTopPadding={props.pageTopPadding}>
        <Container>
          <Row>
            <Col xs={12} lg={6}>
              <Card>
                <H1>Feel <ReallyTag>Really</ReallyTag> Connected</H1>
                <H3>30 Friends</H3>
                <Paragraph>30 Friends is a virtual place to interact with people in a real and natural way.</Paragraph>
              </Card>
            </Col>
            <Col xs={12} lg={6}>
              <Box>
                <InstitutionIcon />
                <H2>A people connection platform</H2>
                <GetStartedButton />
              </Box>
            </Col>
          </Row>
        </Container>
      </ContentWrapper>
      {!isMobile ? (
        <WelcomeImageOverlay />
      ) : (
          <SplashBackground />
        )}
    </>
  )
};

export default Splash;