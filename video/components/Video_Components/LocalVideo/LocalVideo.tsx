// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { VideoTileState } from "amazon-chime-sdk-js";
import ChimeSdkWrapper from "../../../chime/ChimeSdkWrapper";
import getChimeContext from "../../../context/getChimeContext";
import useUserDataByEmail from "../../../../hooks/getUserDataByEmail/useUserDataByEmail";
import { url } from "inspector";
import VideoStatus from '../../../enums/VideoStatus';

interface VideoProps {
  attendee?: string | null;
  tabIndex?: any;
  profilePicture?: string;
  videoStatus?: number | undefined;
}

//Need to change the background prop here to be the logo or a user profile pic
const Video = styled.video<VideoProps>`
  background: black;
  display: block;
  width: 100%;
  z-index: 1;
  position: relative;
`;

export default function LocalVideo(props: VideoProps) {
  const [enabled, setEnabled] = useState(true);
  const chime: ChimeSdkWrapper | null = useContext(getChimeContext());
  const videoElement = useRef(null);

  useEffect(() => {
    chime?.audioVideo?.addObserver({
      audioVideoDidStart: async () => {
        const videoInputDevices = await chime?.audioVideo?.listVideoInputDevices();
        if (videoInputDevices) {
          await chime?.audioVideo?.chooseVideoInputDevice(
            videoInputDevices[0].deviceId
          );
        }
        chime?.audioVideo?.startLocalVideoTile();
        return;
      },
    });
    chime?.audioVideo?.startLocalVideoTile();

    return () => chime?.audioVideo?.stopLocalVideoTile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let observer = {
      videoTileDidUpdate: (tileState: VideoTileState): void => {
        if (
          !tileState.boundAttendeeId ||
          !tileState.localTile ||
          !tileState.tileId ||
          !videoElement.current
        ) {
          return;
        }
        chime?.audioVideo?.bindVideoElement(
          tileState.tileId,
          (videoElement.current as unknown) as HTMLVideoElement
        );
        setEnabled(tileState.active);
      },
    };
    if (enabled) {
      chime?.audioVideo?.addObserver(observer);
    }

    return () => chime?.audioVideo?.removeObserver(observer);
    // eslint-disable-next-line
  }, []);
  return (
  <Video muted ref={videoElement} tabIndex="-1" aria-label='Your local video' />
  );
}
