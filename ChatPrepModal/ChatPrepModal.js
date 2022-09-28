import React, { useEffect, useRef, useState } from "react";
import Modal from "../Modals";
import UserImage from "../UserImage";
import styled from "styled-components";
import { H2Styles } from "../elements/H2";
import { ParagraphStyles } from "../elements/Paragraph";
import colors from "../../styles/colors";
const Header = styled.div`
    ${H2Styles};
    margin-bottom: 0.25em;
`;
const SubHeader = styled.div`
    ${ParagraphStyles};
    color: ${colors.grey[7]};
    margin-bottom: 1.5em;
`;
const Video = styled.video`
    max-height: 300px;
    max-width: 750px;
    width: 100%;
    border-radius: 8px;
`;
const VideoFlex = styled.div`
    justify-content: center;
    display: flex;
`;
const VideoGroupRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`;
const VideoGroupUserImage = styled(UserImage)`
    align-items: center;
    display: inline-flex; 
    flex-direction: column;
    text-align: center;
    margin: 2em 1em 0em 1em;
`;
const UserImages = ({ randomGroup }) => {
    return randomGroup.map((item, index) => {
        return <VideoGroupUserImage height={72} width={72} key={`VIDEOGROUPUSERIMAGE_${index}`} src={item.picture} userName={item.name} />
    })
}
const Component = ({ srcObject, showChatPrepModal, ...props }) => {
    const videoRef = useRef(null);
    const modalRef = useRef(null);
    const [isCurrent, setIsCurrent] = useState(false);
    const [mediaStream, setMediaStream] = useState(null);
    const openModal = () => {
        modalRef.current.openModal();
    };
    useEffect(() => {
        if (showChatPrepModal) {
            openModal();
            navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            }).then(result => {
                if (videoRef.current) {
                    setIsCurrent(true);
                    setMediaStream(result);
                    videoRef.current.srcObject = result;
                }
            })
        }
        if (mediaStream) {
            return () => {
                mediaStream.getTracks().forEach(track => {
                    track.stop();
                });
            }
        }
    }, [showChatPrepModal])
    if (!showChatPrepModal) {
        return <></>
    }
    return (
        <Modal ref={modalRef}>
            <Header>Get prepared</Header>
            <SubHeader>You're about to get put into a chat with other users.</SubHeader>
            <VideoFlex>
                <Video ref={videoRef} {...props} autoPlay muted={true} />
            </VideoFlex>
            <VideoGroupRow>
                <UserImages randomGroup={props.randomGroup} />
            </VideoGroupRow>
        </Modal>
    );
}
export default Component;