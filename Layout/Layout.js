// External imports, installed libraries, etc
import React, { useContext } from "react";
import styled from "styled-components";

// Internal data, functions, custom hooks, etc
import colors from "../../styles/colors";
import breakpoints from "../../styles/breakpoints";
import fonts from "../../styles/fonts";
import { HomePageConfigContext } from '../HomePageConfigContext/HomePageConfigContext.js';

// Internal components, images, etc
import emoticonsBackground from "../Assets/images/opacitybackground.png";
import NavBar from "../NavBar";
import Anchor from "../elements/Anchor";

const Layout = styled.div`
  background: ${colors.grey[0]};
	background-image: url('${emoticonsBackground}');
	background-repeat: repeat;
  background-size: auto;
`;

const Central = styled.div`
  display: flex;
	flex-flow: column;
  flex-grow: 1;
  height: ${(props) => props.viewConfig.pageTopPadding.xs && (`calc(100vh - ${props.viewConfig.pageTopPadding.xs}px - 54px)`)};
  margin-top: 54px;
  padding-top: ${(props) => props.viewConfig.pageTopPadding.xs}px;
  overflow-y: auto;
  overflow-x: hidden;

	@media (min-width: ${breakpoints.smUp}px) {
    height: ${(props) => props.viewConfig.pageTopPadding.md && (`calc(100vh - ${props.viewConfig.pageTopPadding.md}px)`)};
    margin-top: 0;
		margin-left: 60px;
		padding-top: ${(props) => (props.viewConfig.pageTopPadding.md)}px;
	}
`;

const Main = styled.main`
  flex-grow: 1;
`;

const Footer = styled.footer`
  font-size: 10px;
  text-align: right;
  padding: 6px 10px;
  padding-bottom: ${(props) => props.viewConfig.pageBottomPadding.xs}px;

  @media (min-width: ${breakpoints.smUp}px) {
		padding-bottom: ${(props) => props.viewConfig.pageBottomPadding.md}px;
  }
  
  & > span {
    display: block;
    &:first-of-type {
      margin-bottom: 5px;
    }
    
    @media (min-width: ${breakpoints.smUp}px) {
      display: inline;
      &:first-of-type {
        margin-bottom: 0;
        margin-right: 10px;
      }
    }
  }
`;

const Alpha = styled.span`
  font-style: italic;
  font-weight: ${fonts.fontWeight.bold};
`;

const Component = ({ children, auth0IsAuthenticated, viewConfig }) => {
  const { config } = useContext(HomePageConfigContext);
  viewConfig = viewConfig === 'HomePage' ? config.viewConfig : viewConfig;

  return (
    viewConfig && (
      <Layout viewConfig={viewConfig}>
        <NavBar auth0IsAuthenticated={auth0IsAuthenticated} />
        <Central viewConfig={viewConfig}>
          <Main>
            {children}
          </Main>
          {viewConfig.footer && (
            <Footer viewConfig={viewConfig}>
              <span>Report bad behaviour to <Anchor href="mailto:report@30friends.com?subject=Report%20bad%20behaviour">report@30friends.com</Anchor></span>
              <span title={'This is an Alpha software production by Thirty Friends'}>30 Friends <Alpha>Alpha</Alpha></span>
            </Footer>
          )}
        </Central>
      </Layout>
    )
  );
};

export default Component;
