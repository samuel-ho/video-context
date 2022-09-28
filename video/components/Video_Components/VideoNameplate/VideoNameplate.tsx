// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from "react";
import styled from "styled-components";

import useAttendee from "../../../hooks/useAttendee";
import fonts from "../../../../styles/fonts";

import ChatRemoteVideoAudioStatus from "../../../../components/ChatRemoteVideoAudioStatus";

type Props = {
  attendeeId: string | null;
};

const NamePlate = styled.div`
  border-radius: 6px;
  bottom: 5px;
  left: 5px;
  background: rgb(255 255 255 / 82%);
  font-size: 0.75em;
  font-weight: ${fonts.fontWeight.bold};
  padding: 4px 8px;
  position: absolute;
`;

const FlexCenter = styled.div`
  align-items: center;
  display: flex;
`;

export default function VideoNameplate(props: Props) {
  const { attendeeId } = props;
  const attendee = useAttendee(attendeeId ? attendeeId : "");
  const { name, muted } = attendee;
  
  return (
    attendee && (
      <NamePlate>
        <FlexCenter>
          <ChatRemoteVideoAudioStatus muted={muted} />
          {name}
        </FlexCenter>
      </NamePlate>
    )
  );
}
