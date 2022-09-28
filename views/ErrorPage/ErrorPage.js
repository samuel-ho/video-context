import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Row } from "react-flexbox-grid";
import styled from "styled-components";

import Button from "../../components/elements/Button";
import Container from "../../components/Container";
import ErrorBox from "../../components/ErrorBox";
import TFlogo from "../../components/Assets/LogoIcon";
import uniqueId from "../../utils/uniqueId";
import emoticonsBackground from "../../components/Assets/images/opacitybackground.png";
import colors from "../../styles/colors";

// background layout
const Layout = styled.div`
  background: ${colors.grey[0]};
  background-image: url('${emoticonsBackground}');
  background-repeat: repeat;
  background-size: auto;
  min-height: 100vh;
  width: 100%; 
  display: flex; 
  justify-content: center; 
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto; 
  align-items: center;
  width: 100%;
  height: 100%;
`;

const MainText = styled.h1`
  text-align: center;
  display: block;
  font-weight: bold;
  font-size: 100px;
  margin-bottom: 2%;
`;

const SubText = styled.h2`
  text-align: center;
  font-size: 20px;
  display: block;
  margin-bottom: 4%;
  font-weight: bold;
`;

const CentralFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ErrorPage = () => {
  const [renderErrorPage, setRenderErrorPage] = useState(false);
  const history = useHistory();
  const { state } = useLocation();
  if (!renderErrorPage) {
    return (
      <Layout>
        <StyledDiv>
            <CentralFlex>
              <TFlogo width={100} height={100} className="Error" label="Error page" uniqueId={uniqueId} />
              <MainText>Oops!</MainText>
              <SubText>The page you're looking for cannot be found</SubText>
              <Button onClick={() => {
                history.push("/")
                setRenderErrorPage(true)}
              }>Take Me Home</Button>
            </CentralFlex>
        </StyledDiv>
      </Layout>
    );
  } else {
    return (
      <Container width={1420}>
        <Row>
          <CentralFlex>
          </CentralFlex>
        </Row>
      </Container>
    )
  }

};

export default ErrorPage;
