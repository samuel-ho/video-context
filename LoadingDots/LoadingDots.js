// External imports, installed libraries, etc
import React from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

const LoadingGroup = styled.div`
  display: inline-flex;
`;

const LoadingDot = styled.div`
  border-radius: 100%;
  width: 7px;
  height: 7px;
  overflow: hidden;
  position: static;
  display: inline-grid;
  margin-left: 0.3em;
  &:first-child {
    margin-left: 0;
  }
`;

const animation = keyframes`
    0% { background: #404040;}
    50% { background: #858585;}
    100% { background: #c4c4c4;}
`;

const AnimatedBackground = styled.div`
  animation-name: ${animation};
  animation-duration: 3s;
  animation-delay: ${(props) => (props.delay ? props.delay : "0")}s;
  animation-iteration-count: infinite;
  background: grey;
  height: 100%;
  top: 0;
  width: 100%;
`;


function Component({ className, marginBottom }) {
  return (
    <LoadingGroup aria-hidden={true} className={className}>
      <LoadingDot>
        <AnimatedBackground delay={0} />
      </LoadingDot>
      <LoadingDot>
        <AnimatedBackground delay={0.5} />
      </LoadingDot>
      <LoadingDot>
        <AnimatedBackground delay={1} />
      </LoadingDot>
    </LoadingGroup>
  );
}

export default Component;

Component.propTypes = {
  marginBottom: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};
