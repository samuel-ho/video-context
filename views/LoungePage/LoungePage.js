import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Row } from "react-flexbox-grid";

import breakpoints from "../../styles/breakpoints";
import { NavigationContext } from '../../components/NavigationContext/NavigationContext';
import useUserDataByEmail from "../../hooks/getUserDataByEmail/useUserDataByEmail";
import useLoungeInfo from "../../hooks/getLoungeInfo/useLoungeInfo";
import getGuestsInfo from "../../hooks/getGuestsInfo/getGuestsInfo";
import UseLeaveLounge from "../../hooks/leaveLounge/useLeaveLounge"
import getLeaveLounge from "../../hooks/leaveLounge/getLeaveLounge";
import { createMeetingRequest } from "../../hooks/createMeetingRequest/createMeetingRequest";
import getRandomGroup from "../../hooks/getRandomGroup/getRandomGroup";
import { readyHandler } from "../../utils/LoungePage/readyHandler";

import CountdownTimer, { calculateLeftTime } from "../../utils/countdownTimer";
import Crumbs from "../../components/Crumbs";
import LoungeWaitingBox from "../../components/LoungeWaitingBox";
import LoungePeopleBox from "../../components/LoungePeopleBox"
import Container from "../../components/Container";
import LoungeIcebreakerEntertainment from "../../components/LoungeIcebreakerEntertainment";
import NetworkBox from "../../components/NetworkBox";
import Leaderboard from "../../components/Leaderboard";
import UserStatusShow from "../../components/UserStatusShow";
import Advert from "../../components/Advert";
import ChatPrepModal from "../../components/ChatPrepModal";
import leaveLounge from '../../hooks/leaveLounge/leaveLounge';
import ActiveModal from '../../components/Assets/ActiveModal/ActiveModal';
import { ChatContext, DispatchChatContext } from '../../providers/NavigationContext/ChatContext/ChatProvider';

const pageColumnPaddingSize = 8;

const CustomCol = styled.div`
  flex-basis: 100%;
  max-width: 815px;
  margin: 0 auto;
  box-sizing: border-box;
  width: 100%;
  @media (min-width: ${breakpoints.loungePage.lgUp}px) {
    padding-right: ${pageColumnPaddingSize}px;
    padding-left: ${pageColumnPaddingSize}px;
  }
`;

const MainCol = styled(CustomCol)`
  @media (min-width: ${breakpoints.loungePage.lgUp}px) {
    flex-basis: 62%;
    max-width: 62%;
  }
`;

const SideCol = styled(CustomCol)`
  @media (min-width: ${breakpoints.loungePage.lgUp}px) {
    flex-basis: 38%;
    max-width: 38%;
  }
`;

const Lounge = ({ auth0User }) => {
  const [loungeId] = useState(
    new URL(window.location.href).searchParams.get("id")
  );
  const user = useUserDataByEmail(auth0User.email);
  // const [randomGroup, setRandomGroup] = useState([]);
  const [lounge] = useLoungeInfo(loungeId, auth0User.email);
  const [guests, setGuests] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [isReady, setReadiness] = useState(false);
  const [hasEventStarted, setHasEventStarted] = useState(true);
  const [counter, setCounter] = useState(0);
  const [introStatementGroup, setIntroStatementGroup] = useState([]);
  const [notEnoughUsers, setNotEnoughUsers] = useState(false);
  const { previousChatGroup, setPreviousChatGroup, setIntroStatements, setChatStartTime } = useContext(NavigationContext);

  const history = useHistory();

  const [showChatPrepModal, setShowChatPrepModal] = useState(false);

  const JOIN_CUTT_OFF = parseInt(
    `${process.env.REACT_APP_CHAT_RANDOMISER_CUT_OFF}`
  );

  const LOUNGE_GUESTS_REFRESH_TIMER = 1000 * parseInt(
    `${process.env.REACT_APP_LOUNGE_GUESTS_REFRESH_TIMER}`
  );

  const CHAT_LENGTH = parseInt(`${process.env.REACT_APP_CHAT_LENGTH}`);

  const NEXT_CHATWAVE_DURATION = parseInt(
    lounge.isEvent
      ? `${process.env.REACT_APP_CHAT_EVENT_TIMER}`
      : `${process.env.REACT_APP_CHAT_OPEN_TIMER}`
  );

  const totalWaveTime = lounge.isEvent
    ? NEXT_CHATWAVE_DURATION
    : NEXT_CHATWAVE_DURATION;
  let currTime = new Date().getTime();

  const [hasRunOnce, setHasRunOnce] = useState(false);
  const [timerStarted, settimerStarted] = useState(true);
  const [showActiveModal, setshowActiveModal] = useState(false);
  const [modalStartRender, setmodalStartRender] = useState(false);
  const [modalTimerStarted, setmodalTimerStarted] = useState(false);

    const { randomGroup } = useContext(ChatContext);
    const dispatch = useContext(DispatchChatContext);

  useEffect(() => {
    
    const interval = setInterval(() => {
      getGuestsInfo(loungeId).then(res => {
        setGuests(res);
      });
    }, LOUNGE_GUESTS_REFRESH_TIMER);
    return () => clearInterval(interval);
  }, [loungeId, LOUNGE_GUESTS_REFRESH_TIMER]);

  useEffect(() => {
    if (user.id && timerStarted) {
        settimerStarted(false);
        //alert("You will be kicked out of the room in 1 minute");
        setTimeout(() => {
          //Add some kind of popup here that asks 'Are you still here?'
          // if(window.confirm("You have been inactive for 1 minute. Press OK to stay in the lounge!")) {
          //   settimerStarted(true);
          // }
          // //Leave the page
          // else {
          //   leaveLounge(user.id);
          //   history.push("/");
            
          // }
          
          /** SHOW MODAL WHEN CALLBACK IS EXECUTED */
          setshowActiveModal(true);
          setmodalStartRender(true);
          setmodalTimerStarted(true);
          
      }, 60000)
    }
    
    if (!hasRunOnce && user.id) {
      readyHandler(user.id, setReadiness, isReady, true);
      //Set event listener here - after 10 seconds, we kick out the CURRENT USER only
      
      
      getGuestsInfo(loungeId).then(res => {
        setGuests(res);
      });
      localStorage.removeItem("shouldBeInChat");
      setHasRunOnce(true);
    }
  }, [user.id, hasRunOnce, isReady, loungeId, timerStarted]);

  const checkEventTime = () => {
    if (
      lounge.isEvent &&
      currTime > Date.parse(lounge.startDate) + NEXT_CHATWAVE_DURATION * 1000
    ) {
      return totalWaveTime;
    }
    return NEXT_CHATWAVE_DURATION;
  };

  useEffect(() => {
    setCounter(
      calculateLeftTime(
        lounge.startDate,
        lounge.isEvent,
        NEXT_CHATWAVE_DURATION,
        CHAT_LENGTH,
        currTime
      )
    );
  }, [lounge, counter, NEXT_CHATWAVE_DURATION, CHAT_LENGTH, currTime]);

  useEffect(() => {
    switch (counter) {
      case JOIN_CUTT_OFF:
        getRandomHandler();
        break;
      case 0:
        putUserIntoChat(true);
        break;
      default:
        break;
    }
  }, [counter, JOIN_CUTT_OFF]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Hides counter if it's an event that hasn't started yet
    (lounge.isEvent && currTime <= Date.parse(lounge.startDate)) ||
      (lounge.isEvent && currTime >= Date.parse(lounge.endDate))
      ? setHasEventStarted(false)
      : setHasEventStarted(true);
  }, [counter, currTime, lounge])

  useEffect(() => {
    return CountdownTimer(counter, setCounter, checkEventTime, true);
  }, [counter, hasEventStarted]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (shouldRedirect) {
      // Ensure cache is same by running a second time.
      getRandomGroup(user.id, loungeId).then((item) => {
        if (item.data.groupName) {
          history.push(`/video/chat?title=${item.data.groupName}&name=${user.name}&region=${"eu-west-1"}&lid=${loungeId}`);
          setShouldRedirect(false);
        }
      });
    }
  }, [shouldRedirect, history, loungeId, user]);

  useEffect(() => {
    localStorage.setItem("readiness", false);
    localStorage.setItem("shouldBeInChat", false);
    localStorage.setItem("uid", user.id);
    localStorage.setItem("lid", loungeId);
  }, [user.id, loungeId]);

  const getRandomHandler = () => {
    if (isReady) {
      getRandomGroup(user.id, loungeId).then((item) => {
        if (item.status !== 204) {
          // setRandomGroup(item.data.participants)
          dispatch({ randomGroup: item.data.participants });
          setIntroStatementGroup(item.data.intros);
          createMeetingRequest(item.data.groupName, user.name, "eu-west-1");
        }
      });
    }
  };

  useEffect(() => {
    if (!navigator.mediaDevices && !navigator.mediaDevices?.getUserMedia) {
      history.push({
        pathname: "/error",
        state: {
          title: "Unsupported iOS browser.",
          message:
            `Your browser isn't supported on 30 Friends at the moment.\n\nUse either safari mobile or a desktop browser to get the full 30 Friends experience!`
        }
      });
      return;
    }
    setShowChatPrepModal(false);
  }, [history])

  useEffect(() => {
    if ((counter <= process.env.REACT_APP_CHAT_PREP_MODAL_CUTOFF) && (counter !== 0) && isReady && randomGroup.length > 0) {
      setShowChatPrepModal(true);
    } else {
      setShowChatPrepModal(false);
    }
  }, [counter])

  useEffect(() => {
    if ((counter < JOIN_CUTT_OFF) && (counter !== 0) && isReady && randomGroup.length < 3) {
      setNotEnoughUsers(true);
    } else {
      setNotEnoughUsers(false);
    }
  }, [counter, JOIN_CUTT_OFF, isReady, randomGroup])

  window.onbeforeunload = () => {
    getLeaveLounge(auth0User.email).then(() => {
      localStorage.removeItem("readiness");
      setShouldRedirect(false);
      localStorage.removeItem("lid");
    })
    return "";
  };
  window.onpopstate = () => {
    UseLeaveLounge(user.id, history)
  }

  const putUserIntoChat = (redirect) => {
    if (randomGroup.length !== 0) {
      setPreviousChatGroup(randomGroup); // 
      setIntroStatements(introStatementGroup);
      // setRandomGroup([])
      // dispatch({ randomGroup: [] });
      // setPreviousChatGroup(randomGroup); // empty
      readyHandler(user.id, setReadiness, isReady, true);
      localStorage.setItem("shouldBeInChat", true);
      setShouldRedirect(redirect);
      setChatStartTime(Date.now())
    }
  };

  return (
    
    <Container width={1420}>
      <Crumbs userId={user.id} />
      <Row>
        <ActiveModal isOpen={showActiveModal} currUserID={user.id} setTimerState={settimerStarted} setModalState={setshowActiveModal} setFirstRender={setmodalStartRender} firstRender={modalStartRender} setModalTimer={setmodalTimerStarted} modalTimerState={modalTimerStarted}/>
        <ChatPrepModal randomGroup={randomGroup} showChatPrepModal={showChatPrepModal} />
        <MainCol>
          <LoungeWaitingBox
            lounge={lounge}
            loungeId={loungeId}
            isReady={isReady}
            guests={guests}
            setReadiness={setReadiness}
            user={user}
            timeLeft={counter}
            totalWaveTime={totalWaveTime}
            hasEventStarted={hasEventStarted}
            marginBottom={`${pageColumnPaddingSize * 2}px`}
            randomGroup={randomGroup}
            notEnoughUsers={notEnoughUsers}
          />

          {lounge && (
            <>
              <LoungePeopleBox
                loungeGuests={guests}
                marginBottom={`${pageColumnPaddingSize * 2}px`} />
              <UserStatusShow marginBottom={`${pageColumnPaddingSize * 2}px`} />
            </>
          )}
        </MainCol>

        <SideCol>
          {previousChatGroup.length > 0 && (<NetworkBox marginBottom={`${pageColumnPaddingSize * 2}px`} />)}
          <LoungeIcebreakerEntertainment marginBottom={`${pageColumnPaddingSize * 2}px`} />
          <Leaderboard marginBottom={`${pageColumnPaddingSize * 2}px`} />
          <Advert marginBottom={`${pageColumnPaddingSize * 2}px`} />
        </SideCol>
      </Row>
    </Container>
  );
};

export default Lounge;