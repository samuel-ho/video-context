// External imports, installed libraries, etc
import React from 'react';
import styled from 'styled-components';

// Internal data, functions, custom hooks, etc
import colors from '../../styles/colors';



const EventBox = styled.div`
    background: ${colors.white};
	border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    display: inline-block;
    padding: 12px;
    text-align: center;
`;

const Component = ({ className, children }) => {
	return (
		<EventBox className={className}>
            {children}
        </EventBox>
	);
}

export default Component;