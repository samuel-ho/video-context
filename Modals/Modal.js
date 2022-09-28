import React, { forwardRef, useImperativeHandle, useState, useContext } from "react";
import styled from "styled-components";
import { DispatchTutorialContext } from '../../providers/NavigationContext/TutorialProvider';

import breakpoints from "../../styles/breakpoints";

const ModalWrapper = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ModalContent = styled.div`
  position: relative;
  -ms-transform: translate(-50%,-50%);
  width: 100%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
  z-index: 101;
  overflow-y: auto;
  padding: 10px;

  @media (min-width: ${breakpoints.mdUp}px) {
		width: 40%;
  }
`;

const Modal = forwardRef((props, ref) => {
  const {tutorialDisplay, showTutorialModal} = props;
  const dispatch = useContext(DispatchTutorialContext);
  const [display, setDisplay] = useState();
 
  useImperativeHandle(ref, () => {
    return {
      openModal: () => open(),
      closeModal: () => close(),
      openTutorialModal: () => openTutorial(),
      closeTutorialModal: () => closeTutorial(),
    };
  });

  const open = () => {
    setDisplay(true);
  };

  const close = () => {
    setDisplay(false);
  };

  const openTutorial = () => {
    dispatch({
      tutorialDisplay: true
    });
  };

  const closeTutorial = () => {
    dispatch({
      tutorialDisplay: false
    });
  };

  if (display || tutorialDisplay) {
    return (
      <ModalWrapper>
        <ModalBackdrop onClick={close} />
        <ModalContent>{props.children}</ModalContent>
      </ModalWrapper>
    );
  }
  return null;
});
export default Modal;
