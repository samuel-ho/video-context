// External imports, installed libraries, etc
import React, { useContext } from "react";
import styled from 'styled-components';

import { NavigationContext } from "../NavigationContext/NavigationContext";
import { RandomGroupList } from "./RosterTypes";

import ChatRoster from "./ChatRoster";
import _Box from "../../components/Box";

const Box = styled<any>(_Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: .5em;
`;

interface ComponentProps {
  children?: any;
  className?: any;
  id?: any;
  tabIndex?: any;
  randomGroup: RandomGroupList;
}

const Component = ({ randomGroup, id, className }: ComponentProps) => {
  const { currUser } = useContext(NavigationContext);

  return (
    <Box>
      {randomGroup &&
        randomGroup.map(({ name, id, picture }) => {

          return (
            id !== currUser.id ?
              <ChatRoster
                name={name}
                id={id}
                picture={picture}
                key={`CHATROSTER_` + name}
                numberOfParticipants={randomGroup && randomGroup.length}
              /> : ""
          );
        })}
    </Box>
  );
};

export default Component;
