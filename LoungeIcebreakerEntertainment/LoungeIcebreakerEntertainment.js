import React, { useState } from "react";
import { navContent, numberOfNavItems } from "./constants";
import styled from "styled-components";

import LocalNavigation from "./LocalNavigation";
import LoungeEntertainmentContent from "./Content";

import _Box from "../Box";

import { handleChangeSetState } from "./utils/handleChangeSetState";

const IceBreakerBox = styled(_Box)`
    padding: 0em;
    margin-bottom: ${props => props.marginBottom};
`;

function Component( { marginBottom }) {
    const [navPos, setNavPos] = useState(navContent.VOTE);

    return (
        <IceBreakerBox marginBottom={marginBottom}>
            <LocalNavigation navChanger={handleChangeSetState} setNavPos={setNavPos} navContent={navContent} navPos={navPos} numberOfNavItems={numberOfNavItems} />
            <LoungeEntertainmentContent navPos={navPos} />
        </IceBreakerBox>
    );
}

export default Component;