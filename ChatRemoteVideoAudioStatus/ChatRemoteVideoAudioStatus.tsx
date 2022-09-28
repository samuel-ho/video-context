// External imports, installed libraries, etc
import React from "react";
import styled from "styled-components";

// Internal data, functions, custom hooks, etc
import colors from "../../styles/colors";
import uniqueId from "../../utils/uniqueId";

// Internal components, images, etc
import _AudioOnIcon from "../Assets/AudioOnIcon";
import _AudioOffIcon from "../Assets/AudioOffIcon";

const AudioOnIcon = styled<any>(_AudioOnIcon)``;
const AudioOffIcon = styled<any>(_AudioOffIcon)``;

interface ComponentProps {
  muted?: any;
}

const ChatRemoteVideoAudioStatus = styled.span<ComponentProps>`
  color: ${(props) => props.muted ? colors.red[7] : colors.white};
  padding-right: 5px;
`;

const Component = ({ muted }: ComponentProps) => {
  return (
    <ChatRemoteVideoAudioStatus muted={muted}>
      {muted ? (
        <AudioOffIcon label={muted && `Audio muted`} uniqueId={uniqueId}/>
      ) : (
        <AudioOnIcon label={!muted && `Audio on`} uniqueId={uniqueId}/>
      )}
    </ChatRemoteVideoAudioStatus>
  );
};

export default Component;
