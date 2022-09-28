import React from "react";
import styled from "styled-components";
import fonts from "../../../../../styles/fonts";

import LikeButton from "../../../../Assets/PillStyleButtons/LikeButton";
import DislikeButton from "../../../../Assets/PillStyleButtons/DislikeButton";

import { getNewConversationBooster } from "../../../utils/getNewConversationBooster";
import { useToast } from '@chakra-ui/toast';
import { Box, Text } from '@chakra-ui/react';
import { extendTheme } from "@chakra-ui/react";
import { Confetti } from "../../../../Assets/ConfettiBox2/ConfettiBox2";



const LikeDislikeGroup = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
`;

const theme = extendTheme({
});


function Component({ booster, setBooster, setShowConfettiBox2}) {
    const toast = useToast();
    return (
        <LikeDislikeGroup>
            <DislikeButton
                onClick={(e)=> {
                // setShowConfettiBox2(true);
                getNewConversationBooster(booster, setBooster,e);
                return toast({
                    position: "top-right",
                    duration: 1500,
                    // peach/yellow linear gradient (bgGradient)
                    render: () => (
                         <Box theme={theme} 
                         fontSize="0.9em" 
                         fontWeight="600" 
                         paddingTop="20px" 
                         borderRadius="md" 
                         paddingLeft="25px" 
                         h="40px" 
                         bgGradient="linear(to-l, #FF7591,#FFB988)"
                         >
                             <Confetti position={'left'} aria-hidden="true"/>
                             <Text color="white">
                                 Thank you for voting! 🎉🎉
                             </Text>
                             <Confetti position={'right'} aria-hidden="true"/>
                         </Box>
                       )
                    })
                }
            }
            />
            <LikeButton
                onClick={(e)=> {
                    // setShowConfettiBox2(true);
                    getNewConversationBooster(booster, setBooster,e);
                    return toast({
                        position: "top-right",
                        duration: 1500,
                        // blue linear gradient (bgGradient)
                        render: () => (
                             <Box theme={theme}
                             fontSize="0.9em" 
                             fontWeight="600" 
                             paddingTop="20px" 
                             borderRadius="md" 
                             paddingLeft="25px" 
                             h="40px" 
                             bgGradient="linear(to-l, #55E6EF, #205CF3)"> 
                                <Confetti position={'left'} aria-hidden="true"/>
                                    <Text color="white">
                                        Thank you for voting! 🎉🎉
                                    </Text>
                                <Confetti position={'right'} aria-hidden="true"/>
                             </Box>
                           )
                        })
                    }
                }
                />
        </LikeDislikeGroup>
    );
}

export default Component;