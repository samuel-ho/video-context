// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useContext, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Row, Col } from "react-flexbox-grid";
import Modal from "react-modal";
import leaveLounge from "../../../hooks/leaveLounge/leaveLounge";
import { useAuth0 } from "@auth0/auth0-react";

import useWindowSize from "../../../hooks/useWindowSize";
import routes from "../../constants/routes.json";
import breakpoints from "../../../styles/breakpoints";
import getChimeContext from "../../context/getChimeContext";
import getMeetingStatusContext from "../../context/getMeetingStatusContext";
import getUIStateContext from "../../context/getUIStateContext";
import { readyHandler } from "../../../utils/LoungePage/readyHandler";
import CountdownTimer, {
  calculateChatTimeLeft,
} from "../../../utils/countdownTimer";

import { NavigationContext } from "../../../components/NavigationContext/NavigationContext";
import ChimeSdkWrapper from "../../chime/ChimeSdkWrapper";
import ClassMode from "../../enums/ClassMode";
import MeetingStatus from "../../enums/MeetingStatus";
import Error from "../../components/Error/Error";
import LocalVideo from "../../components/Video_Components/LocalVideo/LocalVideo";
import RemoteVideoGroup from "../../components/Video_Components/RemoteVideoGroup/RemoteVideoGroup";

import Crumbs, { CrumbListItem } from "../../../components/Crumbs";
import _BackArrowIcon from "../../../components/Assets/NavIcons/BackArrowIcon";
import _Controls from "../../components/Controls/Controls";
import RosterGroup from "../../../components/RosterGroup";
import RosterIntroGroup from "../../../components/RosterIntroGroup";
import Container from "../../../components/Container";
import _Button from "../../../components/elements/Button";
import ChatPageAdvert from "../../../components/Advert/ChatPageAdvert";
import ChimeTimer from "../../../components/ChimeTimer";
import { RandomGroupList } from "../../../components/RosterGroup/RosterTypes";
import Loader from "../../../components/Loader";
import VideoStatus from "../../enums/VideoStatus";
import useUserDataByEmail from "../../../hooks/getUserDataByEmail/useUserDataByEmail";
import { ChatContext, DispatchChatContext } from '../../../providers/NavigationContext/ChatContext/ChatProvider';

const ChatNav = styled(Col)`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
  margin-top: 0.5em;
`;

const Button = styled<any>(_Button)``;
const BackArrowIcon = styled<any>(_BackArrowIcon)`
  padding-right: 5px;
`;

const MainChatArea = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 0.5em;
  margin-left: -3px;
  margin-right: -3px;

  @media (min-width: ${breakpoints.lgUp}px) {
    align-content: flex-start;
    display: flex;
    justify-content: space-between;
  }
`;

const ControlsChatArea = styled.div`
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
  bottom: 0;
  display: flex;
  left: 0;
  padding: 0.5em;
  position: fixed;
  width: calc(100% - 1em);
  z-index: 1;

  @media (min-width: ${breakpoints.smUp}px) {
    display: flex;
    justify-content: space-between;
    left: 60px;
    width: calc(100% - 1em - 60px);
  }
  @media (min-width: ${breakpoints.lgUp}px) {
    background: rgba(233, 236, 239, 0.8);
    box-shadow: 0 -4px 10px 0px rgba(0, 0, 0, 0.2);
  }
`;

const ControlsLeft = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (min-width: ${breakpoints.mdUp}px) {
    justify-content: flex-start;
    width: initial;
  }
`;
const Controls = styled<any>(_Controls)`
  @media (min-width: ${breakpoints.mdUp}px) {
    padding: 0 0.25em;
  }
`;

const LoadingError = styled.span`
  display: flex;
  justify-content: center;
  margin-top: 300px;
`;

const LocalVideoContainer = styled.div`
  border-radius: 7px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  flex-basis: 33%;
  max-height: 85px;
  max-width: 33%;
  overflow: hidden;
  position: relative;

  @media (min-width: 400px) {
    flex-basis: 150px;
    max-width: 150px;
  }
`;
interface PlaceholderProps {
  videoStatus: number;
  profilePicture: string;
}

const Placeholder = styled.div<PlaceholderProps>`
  display: ${(props: any) =>
    props.videoStatus === VideoStatus.Enabled && `none`};
  background: black;
  background-image: ${(props) => props.videoStatus === VideoStatus.Disabled && 'url("' + props.profilePicture + '")'};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 7px;
  height: 85px;
  top: 0;
  width: 100%;
  margin: auto;
  position: absolute;
  z-index: 2;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const StyledChimeTimer = styled(ChimeTimer)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default function Chatpage() {
  const [view, setView] = useState(false);
  Modal.setAppElement("body");
  const chime: ChimeSdkWrapper | null = useContext(getChimeContext());
  const [state] = useContext(getUIStateContext());
  const { meetingStatus, errorMessage } = useContext(getMeetingStatusContext());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isReady, setReadiness] = useState(true);
  const [chatLength] = useState(
    parseInt(`${process.env.REACT_APP_CHAT_LENGTH}`)
  );
  const [counter, setCounter] = useState(chatLength);
  const [delay, setDelay] = useState(false);
  const query = new URLSearchParams(useLocation().search);
  const history = useHistory();

  const { previousChatGroup, introStatements, chatStartTime } = useContext(
    NavigationContext
  );
  const [videoStatus, setVideoStatus] = useState(VideoStatus.Enabled);
  const { user } = useAuth0();
  const endUser = useUserDataByEmail(user.email);

  const { width: currentWidth } = useWindowSize();
  const [width, setWidth] = useState(currentWidth);
  const navigationBreakPoint = breakpoints.mdDown;
  const isMobile = width < navigationBreakPoint;

  const { randomGroup } = useContext(ChatContext);
  const dispatch = useContext(DispatchChatContext);
  // console.log("endUser picture", endUser.picture)
  useEffect(() => {
    if (currentWidth !== width) {
      setWidth(currentWidth);
    }
  }, [currentWidth, width]);

  interface userDetail {
    uid: string | null;
    lid: string | null;
  }

  const [userDetail] = useState<userDetail>({
    uid: localStorage.getItem("uid"),
    lid: query.get("lid"),
  });

  window.onbeforeunload = () => {
    leaveLounge(localStorage.getItem("uid")).then(() => {
      localStorage.setItem("shouldBeInChat", "false");
      localStorage.removeItem("readiness");
      localStorage.removeItem("lid");
      onBrowserEvent();
    });
    return "";
  };

  window.onpopstate = () => {
    onBrowserEvent();
    return "";
  };
  const onLeaveChat = () => {
    chime?.leaveRoom(state.classMode === ClassMode.Teacher);
    var uid = localStorage.getItem("uid");
    readyHandler(uid ?? "", setReadiness, isReady);
    var loungeId = query.get("lid");

    if (loungeId) {
      history.push(routes.LOUNGE + loungeId);
    } else {
      history.replace("/");
    }
    
    // state update here to not include endUser info
    const filteredGroupMembers = randomGroup.filter((user:any) => user.id !== endUser.id);
    dispatch({randomGroup: filteredGroupMembers});

  };

  const onBrowserEvent = () => {
    history.goBack();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelay(true);
    }, 10000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (localStorage.getItem("shouldBeInChat") === "true") {
      setView(true);
    } else {
      onLeaveChat();
    }
  }, [view]);

  useEffect(() => {
    if (counter === 0) {
      onLeaveChat();
    }
    setCounter(calculateChatTimeLeft(chatLength, chatStartTime, Date.now()));
    return CountdownTimer(counter, setCounter, chatLength, false);
  }, [chime, state.classMode, counter, chatLength]);

  return (
    <>
      {meetingStatus === MeetingStatus.Loading && (
        <>
          <Loader />
          {delay === true && (
            <LoadingError>
              <Button
                color={"#D1373D"}
                styleas={"link"}
                onClick={() => {
                  onLeaveChat();
                }}
              >
                Oops unable to load video chat please click here to go back to
                Lounge
              </Button>
            </LoadingError>
          )}
        </>
      )}
      {meetingStatus === MeetingStatus.Failed && (
        <Error errorMessage={errorMessage} />
      )}
      {meetingStatus === MeetingStatus.Succeeded && (
        <>
          <Container fluid={true}>
            <FlexContainer>
              <Crumbs
                userId={localStorage.getItem("uid")}
                onClick={() => {
                  onLeaveChat();
                }}
              >
                <CrumbListItem>
                  <Button
                    color={"#D1373D"}
                    styleas={"link"}
                    onClick={() => {
                      onLeaveChat();
                    }}
                  >
                    <BackArrowIcon ariaHidden="true" />
                    Back to lounge
                  </Button>
                </CrumbListItem>
              </Crumbs>
              <StyledChimeTimer className="" timeLeft={counter} />
            </FlexContainer>
            <Row>
              <Col xs={12}>
                <MainChatArea>
                  <RemoteVideoGroup
                    waveGroupLength={previousChatGroup.length - 1}
                    isMobile={isMobile}
                    videoStatus={videoStatus}
                    profilePicture={""}
                    filteredRandomGroup={randomGroup.filter((user: any) => user.picture != endUser.picture)}
                  />
                </MainChatArea>

                <Row>
                  <Col xs={12} md={6}>
                    {previousChatGroup ? (
                      <RosterGroup randomGroup={previousChatGroup} />
                    ) : (
                      <Loader />
                    )}
                  </Col>
                  <Col xs={12} md={6}>
                    {introStatements && (
                      <RosterIntroGroup intros={introStatements} />
                    )}
                  </Col>
                </Row>

                <ControlsChatArea>
                  <ControlsLeft>
                    <LocalVideoContainer>
                      <LocalVideo
                        profilePicture={endUser.picture}
                        videoStatus={videoStatus}
                      />
                      <Placeholder
                        videoStatus={videoStatus}
                        profilePicture={endUser.picture}
                      />
                    </LocalVideoContainer>
                    <Controls
                      videoStatus={videoStatus}
                      setVideoStatus={setVideoStatus}
                    />
                  </ControlsLeft>
                  {!isMobile && (
                    <div>
                      <ChatPageAdvert />
                    </div>
                  )}
                </ControlsChatArea>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}
