// External imports, installed libraries, etc
import React from "react";
import styled from "styled-components";

// Internal data, functions, custom hooks, etc

// Internal components, images, etc
import LoadingSkeleton from "../../LoadingSkeleton";

const Wrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    padding-left: 8px;
    padding-right: 8px;
`;

const StyledLoadingSkeleton = styled(LoadingSkeleton)`
    margin-bottom: 10px;
`;

const ChatGuestsLoading = ({ guest }) => {
  return (
    <Wrapper>
      {guest ? (
        <>Loaded guest here</>
      ) : (
        <>
          <StyledLoadingSkeleton height={60} width={60} borderRadius={100} />
          <LoadingSkeleton height={30} />
        </>
      )}
    </Wrapper>
  )
};

export default ChatGuestsLoading;
