// External imports, installed libraries, etc
import React from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom"

// Internal data, functions, custom hooks, etc
import UseLeaveLounge from "../../hooks/leaveLounge/useLeaveLounge";

// Internal components, images, etc
import CrumbListItem from './CrumbListItem';
import _Link from '../elements/Link';
import _HomeIcon from '../Assets/NavIcons/HomeIcon';

const Link = styled<any>(_Link)``;
const HomeIcon = styled<any>(_HomeIcon)`
	padding-right: 6px;
`;

interface Props {
	userId?: any;
	onClick?: any;
};

const HomeCrumb = ({ userId, onClick }: Props) => {
	const history = useHistory();

	return (
        <CrumbListItem>
			<Link 
			to='/' 
			title='Home page' 
			onClick={() =>{
				UseLeaveLounge(userId, history);
			}} 
			ariaLabel='Home page'>
				<HomeIcon ariaHidden={true}/>Home</Link>
		</CrumbListItem>
	);
}



export default HomeCrumb;