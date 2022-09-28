// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import ChimeSdkWrapper from "../../chime/ChimeSdkWrapper";
import getChimeContext from "../../context/getChimeContext";
import getUIStateContext from "../../context/getUIStateContext";
import breakpoints from "../../../styles/breakpoints";
import colors from "../../../styles/colors";
import VideoStatus from "../../enums/VideoStatus"

const ControlsContainer = styled.div`
 
`;

const ControlButton = styled.button`
  background: ${colors.grey[2]};
  border-radius: 100%;
  height: 44px;
  margin: 0 5px;
  width: 44px;

  @media (min-width: ${breakpoints.mdUp}px) {
    background: ${colors.grey[3]};
  }
`;

type Props = {
  className: any,
  videoStatus: number | undefined,
  setVideoStatus: () => void, 
};
export default function Controls(props: any) {
  const chime: ChimeSdkWrapper | null = useContext(getChimeContext());
  // eslint-disable-next-line
  const [state] = useContext(getUIStateContext());
  const [muted, setMuted] = useState(false);
  const { videoStatus, setVideoStatus } = props;

  useEffect(() => {
    const callback = (localMuted: boolean) => {
      setMuted(localMuted);
    };
    chime?.audioVideo?.realtimeSubscribeToMuteAndUnmuteLocalAudio(callback);
    return () => {
      if (chime && chime?.audioVideo) {
        chime?.audioVideo?.realtimeUnsubscribeToMuteAndUnmuteLocalAudio(
          callback
        );
      }
    };
  }, [chime]);

  return (
    <ControlsContainer className={props.className}>
      <ControlButton
        onClick={async () => {
          if (muted) {
            chime?.audioVideo?.realtimeUnmuteLocalAudio();
          } else {
            chime?.audioVideo?.realtimeMuteLocalAudio();
          }
          // Adds a slight delay to close the tooltip before rendering the updated text in it
          await new Promise((resolve) => setTimeout(resolve, 10));
        }}
        aria-label="Mute toggle"
      >
        {muted ? (
          <i className="fas fa-microphone-slash" aria-hidden="true" />
        ) : (
            <i className="fas fa-microphone" aria-hidden="true" />
          )}
      </ControlButton>

      <ControlButton
        onClick={async () => {
          // Adds a slight delay to close the tooltip before rendering the updated text in it
          await new Promise((resolve) => setTimeout(resolve, 10));
          if (videoStatus === VideoStatus.Disabled) {
            setVideoStatus(VideoStatus.Loading);
            try {
              if (!chime?.currentVideoInputDevice) {
                throw new Error("currentVideoInputDevice does not exist");
              }
              await chime?.chooseVideoInputDevice(
                chime?.currentVideoInputDevice
              );
              chime?.audioVideo?.startLocalVideoTile();
              setVideoStatus(VideoStatus.Enabled);
            } catch (error) {
              // eslint-disable-next-line
              console.error(error);
              setVideoStatus(VideoStatus.Disabled);
            }
          } else if (videoStatus === VideoStatus.Enabled) {
            //Take care of profile pic logic
            alert("Turning off video here")
            //Need to figure out why attendee's ID is nulled here
            //Debug how the user's object layout is changed when this happens
            setVideoStatus(VideoStatus.Loading);
            chime?.audioVideo?.stopLocalVideoTile();
            setVideoStatus(VideoStatus.Disabled);
          }
        }}
        aria-label="Camera visible toggle"
      >
        {videoStatus === VideoStatus.Enabled ? (
          <i className="fas fa-video" aria-hidden="true" />
        ) : (
            <i className="fas fa-video-slash" aria-hidden="true" />
          )}
      </ControlButton>
    </ControlsContainer>
  );
}
