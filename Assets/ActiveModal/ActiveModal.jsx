import React, { useEffect, useRef, useState } from "react";
import Modal from "../../Modals/Modal";
import styled from "styled-components";
import { H2Styles } from "../../elements/H2";
import { Flex, Spacer } from "@chakra-ui/react"
import Button from "../../elements/Button/Button"
import { useHistory } from "react-router";
import leaveLounge from '../../../hooks/leaveLounge/leaveLounge';

const Header = styled.div`
    ${H2Styles};
    margin-bottom: 100px;
    margin-left: 180px;
`;

const ActiveModal = (
    {
        isOpen,
        currUserID,
        setTimerState,
        setModalState,
        setFirstRender,
        firstRender,
        setModalTimer,
        modalTimerState
    }
    ) => {
    //Use a ref here to access the reference node for the modal
    const modalRef = useRef(null);
    const history = useHistory();
    const clickedButton = useRef(false);

    //Callbacks for either remaining on this page or leaving + getting kicked out

    const remainOnPage = () => {
        
        setModalTimer(false);
        clickedButton.current = true;
        setTimerState(true); //outside callback
        setModalState(false); //outside callback
        modalRef.current.closeModal();

    }

    const leavePage = () => {
        setModalState(false);
        setModalTimer(false);
        modalRef.current.closeModal();
        leaveLounge(currUserID);
        history.push("/");
    }

    
    useEffect(()=> {

        
        if (firstRender && isOpen && modalRef.current && modalTimerState) {
            //Start up the modal
            //Set timedOut to true at the end of 20 seconds
            //we want to execute timeout callback only if we haven't clicked anything and we have a model open
            modalRef.current.openModal();
            clickedButton.current = false;
            setTimeout(() => {
                if(!clickedButton.current && modalTimerState && modalRef.current) {
                    leavePage();
                    clickedButton.current = false;
                }
                
                
            }, 60000)
            setFirstRender(false);
        }

        

        
        //Modal opening up at the beginning of the time period
        // if (modalFirstRender.current && !timedOut && !clickedNo && isOpen && modalRef.current) {
        //     console.log("Going in startup clause")
        //     modalRef.current.openModal();
        //     setTimeout(() => {
        //         console.log("Executing this callback")
        //         setTimedOut(true);
        //     }, 20000)
        //     modalFirstRender.current = false;
        // }
        // //User manually clicking no
        // else if (isOpen && !modalFirstRender && clickedNo && modalRef.current) {
        //     console.log("Going in click no clause")
        //     setclickedNo(false);
        //     modalFirstRender.current = true;
        //     modalRef.current.closeModal();
        //     leaveLounge(currUserID);
        //     history.push("/");
        // }
        // //Do the modal timeout feature here
        // else if (isOpen && !modalFirstRender && timedOut && modalRef.current) {
        //     console.log("Going in timed out clause")
        //     setTimedOut(false);
        //     setModalState(false);
        //     modalFirstRender.current = true;
        //     modalRef.current.closeModal();
        //     leaveLounge(currUserID);
        //     history.push("/");
        // }
        

    })


    

    return (
        <>
        <Modal ref={modalRef}>
            <Header>Are you still active?</Header>
            <Flex>
                <Button onClick={remainOnPage}>Yes</Button>
                <Spacer/>
                <Button onClick={()=> {
                    clickedButton.current = true;
                    leavePage();
                }} color="red">No</Button>
                {/* <Button>No</Button> */}
            </Flex>
        </Modal>
        </>
    )

}

export default ActiveModal;
