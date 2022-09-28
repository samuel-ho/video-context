// Remote Video Group
// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import styled from "styled-components";

import { VideoTileState } from "amazon-chime-sdk-js";
import ChimeSdkWrapper from "../../../chime/ChimeSdkWrapper";
import getChimeContext from "../../../context/getChimeContext";
import RemoteVideo from "../RemoteVideo/RemoteVideo";
import useAttendee from "../../../hooks/useAttendee";

const NobodyPresent = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const MAX_REMOTE_VIDEOS = 5;

type Props = {
  waveGroupLength: number;
  isMobile: boolean;
  videoStatus: number;
  profilePicture: string;
  filteredRandomGroup: Array<any>;
};
export default function RemoteVideoGroup(props: Props) {
  const chime: ChimeSdkWrapper | null = useContext(getChimeContext());
  const [visibleIndices, setVisibleIndices] = useState<{
    [index: string]: { boundAttendeeId: string };
  }>({});
  const [visibleIndicesCopy, setVisibleIndicesCopy] = useState<{
    [index: string]: { boundAttendeeId: string };
  }>({});
  // console.log(visibleIndicesCopy, "visibleIndicesCopy");
  const videoElements: HTMLVideoElement[] = []; // an array of HTMLVideoElement objects in your app
  const tiles: { [index: number]: number } = {};
  const hasInitializedCopy = useRef<any>({ current: { value: false } });

  const acquireVideoIndex = (tileId: number): number => {
    for (let index = 0; index < MAX_REMOTE_VIDEOS; index += 1) {
      if (tiles[index] === tileId) {
        return index;
      }
    }
    for (let index = 0; index < MAX_REMOTE_VIDEOS; index += 1) {
      if (!(index in tiles)) {
        tiles[index] = tileId;
        return index;
      }
    }
    throw new Error("no tiles are available");
  };

  const releaseVideoIndex = (tileId: number): number => {
    chime?.audioVideo?.unbindVideoElement(tileId);
    for (let index = 0; index < MAX_REMOTE_VIDEOS; index += 1) {
      if (tiles[index] === tileId) {
        delete tiles[index];
        return index;
      }
    }
    return -1;
  };

  const numberOfVisibleIndices = Object.keys(visibleIndices).reduce<number>(
    (result: number, key: string) => result + (visibleIndices[key] ? 1 : 0),
    0
  );

  useEffect(() => {
    let observer = {
      videoTileDidUpdate: (tileState: VideoTileState): void => {
        if (
          !tileState.boundAttendeeId ||
          tileState.localTile ||
          tileState.isContent ||
          !tileState.tileId
        ) {
          return;
        }

        const index = acquireVideoIndex(tileState.tileId);

        chime?.audioVideo?.bindVideoElement(
          tileState.tileId,
          videoElements[index]
        );

        setVisibleIndices((previousVisibleIndices) => ({
          ...previousVisibleIndices,
          [index]: {
            boundAttendeeId: tileState.boundAttendeeId,
          },
        }));
      },

      videoTileWasRemoved: (tileId: number): void => {
        const index = releaseVideoIndex(tileId);
        setVisibleIndices((previousVisibleIndices) => ({
          ...previousVisibleIndices,
          [index]: null,
        }));
      },
    };

    chime?.audioVideo?.addObserver(observer);

    return () => {
      chime?.audioVideo?.stopLocalVideoTile();
      chime?.audioVideo?.removeObserver(observer);
    };

    // eslint-disable-next-line
  }, []);

  //Adding listener for change in hasInitialized.current.value
  useEffect(() => {
    if (hasInitializedCopy.current.value) {
      if(Object.keys(visibleIndices).length !== 0) {
        setVisibleIndicesCopy(JSON.parse(JSON.stringify(visibleIndices)));
        // console.log("visibleIndicesClone", visibleIndicesClone)
      }
    }
  }, [hasInitializedCopy.current.value])

  const checkNonNullValues = () => {
    const visibleIndicesValuesArr = Object.values(visibleIndices);
    if (visibleIndicesValuesArr.length === 0) {
      //Case where our visible indices state is completely empty
      return false;
    }
    var isAllNonNull = true;
    // console.log("visibleIndices in checkNonNullValues", visibleIndices)
    for (let value of visibleIndicesValuesArr) {
      // console.log("each value object in visibleIndices", value);
      if (!value) {
        isAllNonNull = false;
        return isAllNonNull;
      }
    }

    return isAllNonNull;
  };

  // condition of true
  //DEBUGGING - logging visibleIndices state here
  // console.log("visibleIndices state", visibleIndices);

  if (checkNonNullValues() && !hasInitializedCopy.current.value) {
    hasInitializedCopy.current.value = true;
  }
  return (
    <>
      {Array.from(Array(MAX_REMOTE_VIDEOS).keys()).map((key, index) => {
        // if !copyInitialized && visibleIndices.values() each is not null: initialize deepcopy state + change ref var = true
        

        // initialize the variables outside
        // visibleIndices[index] not null
        // if(visibleIndices[index] !== null)
        //   // visibleIndices copy

        //    // Solutoin 1hen its fully populated and incorporate that into a stateful value
        //    // visibleIndices_copy as state and initializedCopy as a ref

        // }
        //visibleIndices - original state
        // when visibleIndices is in the optimal condition, we want to make a deep copy and store it in state
        // Create a boolean HTML reference that is set to false when we initialize this new state

        //We want to do our deep copy initialization here, and change our boolean ref to true here
        // Check if our ref is true and none of our index values are null
        // console.log(visibleIndicesCopy, "visibleIndicesCopy")
        // console.log("current Index", index)
        if (hasInitializedCopy.current.value === true && visibleIndicesCopy[index]) {
          // console.log(visibleIndicesCopy, "visibleIndicesCopy")
          return (
            <RemoteVideo
              key={`REMOTEVID_` + key}
              waveGroupLength={props.waveGroupLength}
              isMobile={props.isMobile}
              // videoStatus={props.videoStatus}
              // eslint-disable-next-line react-hooks/rules-of-hooks
              videoElementRef={useCallback(
                (element: HTMLVideoElement | null) => {
                  if (element) {
                    videoElements[index] = element;
                  }
                },
                // eslint-disable-next-line
                []
              )}
              //copy object.attendeeID
              //copy object.visibleIndex
              //Error
              attendeeId={visibleIndicesCopy[index]? visibleIndicesCopy[index].boundAttendeeId : null}
              enabled={!!visibleIndices[index]} //Issue here with non-updating enabled state?
              videoNumber={key + 1}
              numberOfVisibleIndices={numberOfVisibleIndices}
              filteredRandomGroup={props.filteredRandomGroup}
            />
          );
        }
        // If hasInitializedCopy == true, then we pass down the attendeeID and visibleIndex from our deep copy
        // Else we pass down visibleIndices (normal state) - this is what we had before
        else {
          return (
            <RemoteVideo
              key={`REMOTEVID_` + key}
              waveGroupLength={props.waveGroupLength}
              isMobile={props.isMobile}
              // videoStatus={props.videoStatus}
              // eslint-disable-next-line react-hooks/rules-of-hooks
              videoElementRef={useCallback(
                (element: HTMLVideoElement | null) => {
                  if (element) {
                    videoElements[index] = element;
                  }
                },
                // eslint-disable-next-line
                []
              )}
              attendeeId={visibleIndices[index]? visibleIndices[index].boundAttendeeId : null}
              enabled={!!visibleIndices[index]}
              videoNumber={key + 1}
              numberOfVisibleIndices={numberOfVisibleIndices}
              filteredRandomGroup={props.filteredRandomGroup}
            />
          );
        }
      })}
    </>
  );
}
