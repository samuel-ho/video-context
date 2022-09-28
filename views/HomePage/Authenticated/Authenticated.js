import React, { useState, useContext } from "react";
import { Row, Col } from "react-flexbox-grid";
import styled from 'styled-components';

import getLounges from "../../../hooks/getLounges/getLounges"
import Container from "../../../components/Container";
import H1 from "../../../components/elements/H1";
import Paragraph from "../../../components/elements/Paragraph";
import Lounges from "../../../components/Lounges";
import TutorialModal from '../../../components/TutorialModal';
import { TutorialContext, DispatchTutorialContext } from '../../../providers/NavigationContext/TutorialProvider';
import Button from '../../../components/elements/Button/Button';
import HelpImg from '../../../components/Assets/HelpIcon/HelpIcon'

const Flexbox = styled.div`
    display: flex; 
    flex-direction: row; 
    justify-content: space-between; 
`
const StyledHelpImg = styled(HelpImg)`
    width: 24px; 
    height: 24px;
    display: block;
`

const Authenticated = () => {
  const lounges = getLounges().lounges;
  const { showTutorialModal, tutorialDisplay } = useContext(TutorialContext);
  const dispatch = useContext(DispatchTutorialContext);

  return (
    <>
      <Container fluid={true}>
        <Flexbox>
            <div>
                <H1 marginBottom={.5}>Lounges</H1>
                <Paragraph marginBottom={2.5}>Join an event or community to connect with others</Paragraph>
            </div>
            <div>
                <Button onClick={ () => {dispatch({ showTutorialModal: true, tutorialDisplay: true });} }
                        styledas={"button"} type={"button"} variant={"hollow"} title={"Launch tutorial"} ariaLabel={"Launch tutorial"}>
                    Tutorial
                </Button>    
            </div>
        </Flexbox>
      </Container>
      <Row>
        <Col xs={12}>
        <TutorialModal 
        />
          <Lounges lounges={lounges} />
        </Col>
      </Row>
    </>);
};

export default Authenticated;
