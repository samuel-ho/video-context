// External imports, installed libraries, etc
import React from 'react';
import styled from 'styled-components';

// Internal data, functions, custom hooks, etc

// Internal components, images, etc
import HomeCrumb from './HomeCrumb';

interface CrumbsListProps {
}
const CrumbsList = styled.ol<CrumbsListProps>`
    margin-bottom: 1em;
`;

interface Props {
    children?: any;
    className?: any;
    userId?: any;
    onClick?: any;
};

const Component = ({ className, children, userId, onClick }: Props) => {
    return (
        <CrumbsList className={className}>
            <HomeCrumb userId={userId} onClick={onClick} />
            {children}
        </CrumbsList>
    );
}

export default Component;