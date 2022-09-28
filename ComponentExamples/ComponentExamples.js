// External imports, installed libraries, etc 
import React from "react";
import styled from "styled-components";

// Internal components, images, etc
import Box from "../Box";
import Button from "../elements/Button";
import Anchor from "../elements/Anchor";
import Link from "../elements/Link";
import FacebookIcon from "../Assets/FacebookIcon";
import EventStyledButton from "../EventStyledButton";
import LoungeGuestsCounter from "../LoungeGuestsCounter";
import EventBox from "../EventBox";
import EventDate from "../EventDate";
import UserImage from "../UserImage";
import ChatTimer from "../ChatTimer";

import H1 from "../elements/H1";
import H2 from "../elements/H2";
import H3 from "../elements/H3";
import H4 from "../elements/H4";
import Paragraph, { ParagraphStyles } from "../elements/Paragraph";

const ComponentSet = styled.div`
  background: #fafafa;
  border: 1px solid #efefef;
  border-radius: 4px;
  box-shadow: 0px 7px 10px 2px rgba(0, 0, 0, 0.07);
  padding: 1rem 1.05rem;
  margin-bottom: 1em;
`;

const Title = styled.h2`
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Component = styled.div`
  margin-bottom: 2em;
`;

const SubTitle = styled.h3`
  color: #383838;
  font-size: 0.9em;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Comment = styled.p`
  ${ParagraphStyles};
`;

const IconStyledForButton = styled(FacebookIcon)`
  margin-right: 10px;
`;

const Examples = () => {
  return (
    <>
      <ComponentSet>
        <Title>Buttons</Title>
        <Component>
          <SubTitle>Normal buttons</SubTitle>
          <Button>Button</Button>
          <Button variant={"solid"}>Button</Button>
          <Button color={"red"}>Button</Button>
          <Button color={"orange"} variant={"solid"}>
            Button
          </Button>
          <Button color={"blue"} variant={"solid"}>
            Button
          </Button>
        </Component>
        <Component>
          <SubTitle>Hollow buttons</SubTitle>
          <Button variant={"hollow"}>Button</Button>
          <Button variant={"hollow"} color={"red"}>
            Button
          </Button>
        </Component>
        <Component>
          <SubTitle>Button with icon</SubTitle>
          <Button color={"blue"} variant={"solid"}>
            <IconStyledForButton width={17} height={17} />
            Button
          </Button>
        </Component>
        <Component>
          <SubTitle>Buttons can accept margin-bottom</SubTitle>
          <Button marginBottom={3}>Button</Button>
          <Comment>Margin here in em^</Comment>
        </Component>
      </ComponentSet>

      <ComponentSet>
        <Title>Anchors (for external linking)</Title>
        <Component>
          <SubTitle>Anchor</SubTitle>
          <Anchor href="/to">Anchor</Anchor>
        </Component>
        <Component>
          <SubTitle>Anchor coloured</SubTitle>
          <Anchor href="/to" color={"red"}>
            Anchor
          </Anchor>
        </Component>
        <Component>
          <SubTitle>Gradient margin-bottom applied</SubTitle>
          <Anchor href="/" marginBottom={3}>
            Anchor as button
          </Anchor>
          <Comment>Margin here in em^</Comment>
        </Component>
        <Component>
          <SubTitle>Anchor as button</SubTitle>
          <Anchor href="/to" styleas={"button"}>
            Anchor as button
          </Anchor>
          <Comment>Same styles available from all buttons.</Comment>
        </Component>
      </ComponentSet>

      <ComponentSet>
        <Title>Link (for internal react routing)</Title>
        <Component>
          <SubTitle>Link</SubTitle>
          <Link to="/to">Link</Link>
        </Component>
        <Component>
          <SubTitle>Link coloured</SubTitle>
          <Link to="/to" color={"red"}>
            Link
          </Link>
        </Component>
        <Component>
          <SubTitle>Gradient margin-bottom applied</SubTitle>
          <Link to="/" marginBottom={3}>
            Link
          </Link>
          <Comment>Margin here in em^</Comment>
        </Component>
        <Component>
          <SubTitle>Link as button</SubTitle>
          <Link to="/to" styleas={"button"}>
            Link as Button
          </Link>
          <Comment>Same styles available from all buttons.</Comment>
        </Component>
      </ComponentSet>

      <ComponentSet>
        <Title>Event button</Title>
        <Component>
          <EventStyledButton />
        </Component>
      </ComponentSet>

      <ComponentSet>
        <Title>Box</Title>
        <Component>
          <Box>BOX with content</Box>
        </Component>
      </ComponentSet>

      <ComponentSet>
        <Title>Lounge count</Title>
        <Component>
          <LoungeGuestsCounter
            count={12}
            isOpen={true}
            loungeType={"timed"}
            openingTime={Date.parse("2021-01-26T13:51:50.417-07:00")}
          />
          <LoungeGuestsCounter
            count={1}
            isOpen={true}
            loungeType={"timed"}
            openingTime={Date.parse("2021-01-26T13:51:50.417-07:00")}
          />
          <LoungeGuestsCounter
            count={0}
            isOpen={true}
            loungeType={"open"}
            openingTime={Date.parse("2021-01-26T13:51:50.417-07:00")}
          />
          <LoungeGuestsCounter
            count={0}
            isOpen={false}
            loungeType={"timed"}
            openingTime={Date.parse("2021-01-26T13:51:50.417-07:00")}
          />
          <LoungeGuestsCounter
            count={0}
            isOpen={false}
            loungeType={"timed"}
            openingTime={Date.parse("2020-01-26T13:51:50.417-07:00")}
          />
          <Comment>Date, isOpen, and loungeCount data required.</Comment>
        </Component>
      </ComponentSet>
      <ComponentSet>
        <Title>Event Time box</Title>
        <Component>
          <EventBox>{Date.parse("2021-01-26T13:51:50.417-07:00")}</EventBox>
          <EventBox>
            <EventDate openingTime={Date.parse("")} />
          </EventBox>
        </Component>
      </ComponentSet>

      <ComponentSet>
        <Title>User Image</Title>
        <Component>
          <UserImage />
        </Component>
      </ComponentSet>

      <ComponentSet>
        <Title>Text/font</Title>
        <Component>
          <H1>Header 1</H1>
          <H1>Header 1</H1>
          <H1>Header 1</H1>
          <H2>Header 2</H2>
          <H3>Header 3</H3>
          <H4>Header 4</H4>
          <Paragraph>
            Paragraph Paragraph Paragraph Paragraph Paragraph <Link>Link</Link>
            Paragraph Paragraph Paragraph.
          </Paragraph>
        </Component>
      </ComponentSet>

      <ComponentSet>
        <Title>Chat Timer</Title>
        <Component>
          <ChatTimer endsAt={''} />
        </Component>
      </ComponentSet>
    </>
  );
};

export default Examples;
