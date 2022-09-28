import React, { useEffect, useState } from "react";

import styled from "styled-components";
import _Box from "../Box"
import LoungeBoxTitleArea from '../Lounges/LoungeBoxTitleArea';
import LoungeBoxTitle from '../Lounges/LoungeBoxTitle';
import _LoungeGuestCounter from '../LoungeGuestsCounter';
import { useHistory } from 'react-router-dom'


// import LoungePeopleCounter from "./LoungePeopleCounter";

import LoungeGuests from "./LoungeGuests"

const PeopleBox = styled(_Box)`
    margin-bottom: ${props => props.marginBottom};
    padding-bottom: 0;
`;

const LoungeGuestCounter = styled(_LoungeGuestCounter)`
    margin-right: .5em;
`;



const Component = ({ loungeGuests, marginBottom }) => {    
    const [clearUsers, setclearUsers] = useState(false);
    const [currGuests, setcurrGuests] = useState([]);
    const [timerStarted, settimerStarted] = useState(true);
    const history = useHistory();

    
    useEffect(() => {
        if (loungeGuests) {
            setcurrGuests(loungeGuests);
        }
    }, [loungeGuests])
    
    return (
        <>
        {currGuests ? (
        
            <PeopleBox marginBottom={marginBottom}>
                <LoungeBoxTitleArea>
                    <LoungeBoxTitle>
                    
                        <LoungeGuestCounter
                            count={currGuests.length}
                            countOnly={true}
                            loungeType={'open'}
                        /> In the lounge
                    </LoungeBoxTitle>
                </LoungeBoxTitleArea>
                
                <LoungeGuests guests={currGuests}/>
            </PeopleBox>
        ) : null}
        </>
    ); 
    
    
}

export default Component;