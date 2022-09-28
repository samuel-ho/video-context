// External imports, installed libraries, etc
import React from "react";
import styled from "styled-components";
import { Row, Col } from "react-flexbox-grid";

// Internal data, functions, custom hooks, etc

// Internal components, images, etc
import H2 from "../elements/H2";
import { ParagraphStyles } from '../elements/Paragraph';
import TimeLounge from "./TimeLounge";
import OpenLounge from "./OpenLounge";
import LoadingSkeleton from "../LoadingSkeleton";
import ErrorBox from "../ErrorBox";
import Container from "../../components/Container";
import breakpoints from "../../styles/breakpoints";

const LoungesRow = styled.div`
  ${props => props.noWrap && `white-space: nowrap;`}
  margin-bottom: 2em;
  overflow-y: hidden;
  white-space: nowrap;

  @media (min-width: ${breakpoints.loungePage.mdUp}px) {
    overflow-x: ${props => props.loungesNumber > 4 ? "scroll" : "hidden"};
  }
`;

const SelectionColTimed = styled.div`
  display: inline-block;
  padding-right: 1em;
  @media (max-width: ${breakpoints.mdDown}px) {
    &:last-of-type {
      padding-right: 12px;
    }
  }
  @media (min-width: ${breakpoints.mdUp}px) {
    &:last-of-type {
      padding-right: 2.25em;
    }
  }

  white-space: break-spaces;
  width: ${props => props.loungesNumber === 1 ? "100%" : "90%"};
  @media (min-width: ${breakpoints.loungePage.lgUp}px) {
      max-width: 560px;
      width: 100%;
  };
`;

const SelectionColOpen = styled.div`
  display: inline-block;
  padding-right: 1em;
  @media (max-width: ${breakpoints.mdDown}px) {
    &:last-of-type {
      padding-right: 12px;
    }
  }
  @media (min-width: ${breakpoints.mdUp}px) {
    &:last-of-type {
      padding-right: 2.25em;
    }
  }
  white-space: break-spaces;
  width: ${props => props.loungesNumber === 1 ? "100%" : "90%"};
  @media (min-width: ${breakpoints.loungePage.lgUp}px) {
      max-width: 560px;
      width: 100%;
  };
`;

const Info = styled.span`
  ${ParagraphStyles}
  margin-bottom: 1em;
`;

const ScrollContainer = styled(Container)`
  ${props => (props.loungesNumber !== 1) && "padding-right: 0px;"}
`;

const IsLoadingView = () => {
  return (
    <>
      <ScrollContainer fluid={true}>
        <LoadingSkeleton marginBottom={1} width={360} />
        <LoungesRow>
          <Row>
            <Col xs={12} lg={4}>
              <LoadingSkeleton height={280} />
            </Col>
            <Col xs={12} lg={4}>
              <LoadingSkeleton height={280} className="dissapearOnSml" />
            </Col>
            <Col xs={12} lg={4}>
              <LoadingSkeleton height={280} className="dissapearOnSml" />
            </Col>
          </Row>
        </LoungesRow>

        <LoadingSkeleton marginBottom={1} width={360} />
        <LoungesRow>
          <Row>
            <Col xs={12} lg={4}>
              <LoadingSkeleton height={280} />
            </Col>
            <Col xs={12} lg={4}>
              <LoadingSkeleton height={280} className="dissapearOnSml" />
            </Col>
            <Col xs={12} lg={4}>
              <LoadingSkeleton height={280} className="dissapearOnSml" />
            </Col>
          </Row>
        </LoungesRow>
      </ScrollContainer>
    </>
  );
};

const LoungesFetchedView = ({ lounges }) => {
  return (
    <>
      {lounges.timeLounges.length > 0 && (
        <>

          <ScrollContainer fluid={true} loungesNumber={lounges.timeLounges.length}>

            <Row>
              <Col sm={12} lg={12}>
                <H2 marginBottom={0.5}>Lounge events</H2>
              </Col>
              <Col sm={12} lg={12}>
                <Info>Ordered by date</Info>
              </Col>
            </Row>

            <LoungesRow loungesNumber={lounges.timeLounges.length}>
              {lounges.timeLounges.map((lounge, index) => {
                const keyID = `LOUNGE_${index}`;
                return (
                  <SelectionColTimed key={keyID} loungesNumber={lounges.timeLounges.length}>
                    <TimeLounge lounge={lounge} />
                  </SelectionColTimed>
                );
              })}
            </LoungesRow>

          </ScrollContainer>
        </>
      )}

      {lounges.openLounges.length > 0 && (
        <>

          <ScrollContainer fluid={true} loungesNumber={lounges.openLounges.length}>
            <Row>
              <Col sm={12} lg={12}>
                <H2 marginBottom={.5}>Lounge Communities</H2>
              </Col>
              <Col sm={12} lg={12}>
                <Info>Ordered from A to Z</Info>

              </Col>
            </Row>
            <LoungesRow noWrap={true} loungesNumber={lounges.openLounges.length}>

              {lounges.openLounges.map((lounge, index) => {
                const keyID = `LOUNGE_${index}`;
                return (
                  <SelectionColOpen loungesNumber={lounges.openLounges.length} key={keyID}>
                    <OpenLounge lounge={lounge} />
                  </SelectionColOpen>
                );
              })}
            </LoungesRow>

          </ScrollContainer>
        </>
      )}
    </>
  );
};
const Lounges = ({ lounges }) => {
  return lounges.isLoading ? (
    <IsLoadingView />
  ) : lounges.timeLounges.length > 0 || lounges.openLounges.length > 0 ? (
    <LoungesFetchedView lounges={lounges} />
  ) : (
        <ErrorBox
          title={"Sorry."}
          message={
            "There are currently no lounges available. Please refresh the page or come back later."
          }
          height={350}
        ></ErrorBox>
      );
};

export default Lounges;
