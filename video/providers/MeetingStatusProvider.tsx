// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
  MeetingSessionStatus,
  MeetingSessionStatusCode,
} from "amazon-chime-sdk-js";
import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useHistory, useLocation } from "react-router-dom";

import ChimeSdkWrapper from "../chime/ChimeSdkWrapper";
import getChimeContext from "../context/getChimeContext";
import getMeetingStatusContext from "../context/getMeetingStatusContext";
import MeetingStatus from "../enums/MeetingStatus";

type Props = {
  children: ReactNode;
};

export default function MeetingStatusProvider(props: Props) {
  const MeetingStatusContext = getMeetingStatusContext();
  const { children } = props;
  const chime: ChimeSdkWrapper | null = useContext(getChimeContext());
  const [meetingStatus, setMeetingStatus] = useState<{
    meetingStatus: MeetingStatus;
    errorMessage?: string;
  }>({
    meetingStatus: MeetingStatus.Loading,
  });
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  let location = useLocation();
  const audioElement = useRef(null);


  let observer = {
    audioVideoDidStop: (sessionStatus: MeetingSessionStatus): void => {
      if (
        sessionStatus.statusCode() === MeetingSessionStatusCode.AudioCallEnded
      ) {
        history.push("/lounge?id=" + query.get("lid"));
        chime?.leaveRoom(true);
      }
      if (sessionStatus.statusCode() === 24) {
        starter();
      }
    },
  };

  const starter = () => {
    void (async function start() {
      try {
        await chime?.createRoom(
          query.get("title"),
          query.get("name"),
          query.get("region"),
          "student"
        );
        chime?.audioVideo?.addObserver(observer);
        if (audioElement.current) {
          try {
            await chime?.joinRoom(audioElement.current);
            setMeetingStatus({
              meetingStatus: MeetingStatus.Succeeded,
            });
          } catch (error) {
            console.error("[JOINROOM]", error);
          }
        }
      } catch (error) {
        // eslint-disable-next-line
        console.error("[MEETINGSTATUSPROVIDER]", error);
        setMeetingStatus({
          meetingStatus: MeetingStatus.Failed,
          errorMessage: error.message,
        });
      }
    })();
  }

  useEffect(() => {
    starter()
  }, []);

  useEffect(
    () => () => {
      chime?.audioVideo?.stopLocalVideoTile();
      chime?.audioVideo?.realtimeMuteLocalAudio();
      chime?.audioVideo?.removeObserver(observer);
    },
    []
  );

  return (
    <MeetingStatusContext.Provider value={meetingStatus}>
      <audio ref={audioElement} style={{ display: "none" }} />
      {children}
    </MeetingStatusContext.Provider>
  );
}
