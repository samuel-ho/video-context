import React, { useEffect, useState, useRef, useContext } from "react";
import Button from "../../components/elements/Button";
import Modal from "../Modals";
import TutorialSwiper from "../TutorialSwiper";
import { TutorialContext, DispatchTutorialContext } from '../../providers/NavigationContext/TutorialProvider';
import XSvg from './x-icon.png';

import styled from 'styled-components';


const CloseButton = styled.button`
  display: block;
  margin-left: auto; 
  background-image: url(${XSvg});
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: center;
  width: 40px; 
  height: 40px; 
`

const TutorialModal = () => {
  const { showTutorialModal, tutorialDisplay } = useContext(TutorialContext);
  const dispatch = useContext(DispatchTutorialContext);
  const modalRef = useRef(null);

  const openTutorialModal = () => {
    modalRef.current.openTutorialModal();
  };

  const closeTutorialModal = () => {
    modalRef.current.closeTutorialModal();
    dispatch({ showTutorialModal: false, tutorialDisplay: false });

  };

  useEffect(() => {
    if (showTutorialModal === true) { 
      openTutorialModal();
    }
      else {
        closeTutorialModal();
      }
  }, [showTutorialModal]);

  function disableTutorial() {
    dispatch({ showTutorialModal: false, tutorialDisplay: false });
  }

  return (
    <Modal ref={modalRef}
    tutorialDisplay={tutorialDisplay}
    showTutorialModal={showTutorialModal}>
      <CloseButton
      styleas={"link"}
      onClick={() => {
        closeTutorialModal()
        disableTutorial()
      }}/>
      <TutorialSwiper closeModal={closeTutorialModal}/>
    </Modal>
  );
};

export default TutorialModal;
