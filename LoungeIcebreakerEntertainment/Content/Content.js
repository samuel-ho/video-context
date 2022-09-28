import React from "react";
import styled from "styled-components";

import { loungeIcebreakerContent } from "../utils/loungeIcebreakerContent";

const ContentBox = styled.div`
    padding: 1em;
`;

function Component({ navPos }) {
    return (
        <ContentBox>
            {loungeIcebreakerContent(navPos)}
        </ContentBox>
    );
}

export default Component;