// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import styled from "styled-components";

import breakpoints from "../../../../styles/breakpoints";
import colors from "../../../../styles/colors";
import VideoNameplate from "../VideoNameplate/VideoNameplate";
import useAttendee from '../../../hooks/useAttendee';

interface VideoContainerProps {
  key?: any;
  className?: any;
  enabled: boolean;
  videoNumber: number;
  numberOfVisibleIndices?: any;
  waveGroupLength: number;
  isMobile: boolean;
}
const VideoContainer = styled.div<VideoContainerProps>`
  margin-bottom: 0.5rem;
  margin: 0.25em;
  position: relative;

  ${(props: any) =>
    props.waveGroupLength === 1 &&
    `flex-basis: calc(100% - .5em);
      &:nth-child(2) {display:none;}
      &:nth-child(3) {display:none;}
      &:nth-child(4) {display:none;}
      &:nth-child(5) {display:none;}`};

  ${(props: any) =>
    props.waveGroupLength === 2 &&
    `flex-basis: calc(50% - .5em);
      &:nth-child(3) {display:none;}
      &:nth-child(4) {display:none;}
      &:nth-child(5) {display:none;}`};

  ${(props: any) =>
    props.waveGroupLength === 3 &&
    ((props.videoNumber === 1 && "flex-basis: calc(50% - .5em);") ||
      (props.videoNumber === 2 && "flex-basis: calc(50% - .5em);") ||
      (props.videoNumber === 3 && "flex-basis: calc(100% - .5em);") ||
      `&:nth-child(4) {display:none;}
      &:nth-child(5) {display:none;}`)};

  ${(props: any) =>
    props.waveGroupLength === 4 &&
    `flex-basis: calc(50% - .5em);
      &:nth-child(5) {display:none;}`};

  @media (max-width: ${breakpoints.lgDown}px) {
    ${(props: any) =>
      props.waveGroupLength === 5 &&
      ((props.videoNumber === 1 && "flex-basis: calc(50% - .5em);") ||
        (props.videoNumber === 2 && "flex-basis: calc(50% - .5em);") ||
        (props.videoNumber === 3 && "flex-basis: calc(50% - .5em);") ||
        (props.videoNumber === 4 && "flex-basis: calc(50% - .5em);") ||
        (props.videoNumber === 5 && "flex-basis: calc(100% - .5em);"))}
  }
  @media (min-width: ${breakpoints.lgUp}px) {
    ${(props: any) =>
      props.waveGroupLength === 5 &&
      ((props.videoNumber === 1 && "flex-basis: calc(33.333% - .5em);") ||
        (props.videoNumber === 2 && "flex-basis: calc(33.333% - .5em);") ||
        (props.videoNumber === 3 && "flex-basis: calc(33.333% - .5em);") ||
        (props.videoNumber === 4 && "flex-basis: calc(50% - .5em);") ||
        (props.videoNumber === 5 && "flex-basis: calc(50% - .5em);"))}
  }
`;

interface VideoProps {
  enabled: boolean;
  waveGroupLength?: any;
  tabIndex?: any;
}
const Video = styled.video<VideoProps>`
  display: block;
  background: ${colors.white};
  border-radius: 6px;
  max-height: ${(props: any) => (props.waveGroupLength > 3 ? "44vh" : "40vh")};
  transform: rotateY(180deg);
  width: 100%;

  ${(props: any) =>
    props.numberOfVisibleIndices === 1 &&
    `&:nth-child(2) {display:none;}
      &:nth-child(3) {display:none;}
      &:nth-child(4) {display:none;}
      &:nth-child(5) {display:none;}`};

  ${(props: any) =>
    props.numberOfVisibleIndices === 2 &&
    `&:nth-child(3) {display:none;}
      &:nth-child(4) {display:none;}
      &:nth-child(5) {display:none;}`};

  ${(props: any) =>
    props.numberOfVisibleIndices === 3 &&
    `&:nth-child(3) {height: calc(100% - 1px);}
      &:nth-child(4) {display:none;}
      &:nth-child(5) {display:none;}`};

  ${(props: any) =>
    props.numberOfVisibleIndices === 4 && `&:nth-child(5) {display:none;}`};

  ${(props: any) =>
    props.numberOfVisibleIndices === 5 &&
    `&:nth-child(5) {height: calc(100% - 1px);}`};
`;

interface PlaceholderProps {
  enabled: boolean;
  attendeeId: string;
  getPicture: (name:string | undefined)=>any;
}


const Placeholder = styled.div<PlaceholderProps>`
  display: ${(props: any) => props.enabled && `none`};
  background: black;
  background-image: ${(props) => !props.enabled && 'url("' + props.getPicture(useAttendee(props.attendeeId).name) + '")'};
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  border-radius: 6px;
  height: 100%;
  top: 0;
  position: absolute;
  width: 100%
`;

type Props = {
  videoElementRef: (instance: HTMLVideoElement | null) => void;
  attendeeId: string | null;
  videoNumber: number;
  numberOfVisibleIndices?: any;
  enabled: boolean; 
  waveGroupLength: number;
  isMobile: boolean;
  filteredRandomGroup: Array<any>
};
export default function RemoteVideo(props: Props) {
  const {
    videoElementRef,
    attendeeId,
    enabled,
    videoNumber,
    numberOfVisibleIndices,
    waveGroupLength,
    isMobile,
    filteredRandomGroup
  } = props;

  
  const getProfilePicture = (name:string | undefined) => {
    var profilePicture;
    for(let user of filteredRandomGroup) {
      if(user.name === name) {
        profilePicture = user.picture;
        console.log("remoteuser profile", profilePicture);
        return profilePicture;
      }
    }
  }

  return (
    <VideoContainer
      key={`VIDEOCOL_${attendeeId}`}
      enabled={enabled}
      videoNumber={videoNumber}
      waveGroupLength={waveGroupLength}
      numberOfVisibleIndices={numberOfVisibleIndices}
      isMobile={isMobile}
      aria-label="Video of chat participant"
    >
      
      <Video
      enabled={enabled}
      muted
        ref={videoElementRef}
        waveGroupLength={waveGroupLength}
        tabIndex="-1"
        aria-label="Video of chat participant"
      />
      <Placeholder
        enabled={enabled}
        // @ts-ignore
        attendeeId={attendeeId}
        getPicture={getProfilePicture}
      />
      <VideoNameplate attendeeId={attendeeId} />
    </VideoContainer>
  );
}
