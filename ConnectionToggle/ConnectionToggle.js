// External imports, installed libraries, etc
import React from 'react';
import styled from 'styled-components';

// Internal data, functions, custom hooks, etc
import colors from '../../styles/colors';

// Internal components, images, etc
import _Button from '../elements/Button';
import Arrow from '../Assets/Arrow';

const ButtonWrapper = styled.div`
    border-bottom: 1px solid ${colors.grey[4]};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`

const ReceivedArrow = styled(Arrow)`
    padding-right: .5em;
`;

const SharedArrow = styled(Arrow)`
    transform: rotateZ(180deg);
    padding-left: .5em;
`;

const Button = styled(_Button)`
    border-radius: 4px;
    border-color: transparent;
    background: ${(props) => props.active ? colors.white : 'transparent'};
    color: ${colors.grey[8]};
    flex-basis: 49%;
    margin-bottom: 10px;
    
    &:hover, :focus {
        border-color: transparent;
        background: ${(props) => props.active ? colors.white : colors.grey[1]};
        color: ${colors.grey[8]};
    }
`

const ConnectionToggle = ({ setShowReceived, showReceived }) => {
    return (
        <>
            <ButtonWrapper>
                <Button
                    onClick={() => setShowReceived(true)}
                    active={showReceived}
                    ariaLabel='Recieved connections'>
                    <ReceivedArrow foregroundColor={showReceived ? colors.blue[8] : ''} ariaHidden={"true"} />
                    Received
                </Button>
                <Button
                    onClick={() => setShowReceived(false)}
                    active={!showReceived}
                    ariaLabel='Shared connections'>
                    <SharedArrow foregroundColor={!showReceived ? colors.blue[8] : ''} ariaHidden={"true"} />
                    Shared
                </Button>
            </ButtonWrapper>
        </>
    )
};

export default ConnectionToggle;