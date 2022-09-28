// External imports, installed libraries, etc
import React, { useState, createContext } from 'react';

// Internal data, functions, custom hooks, etc

// Internal components, images, etc

export const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [sidebarView, setSidebarView] = useState('');
	const [profileId, setProfileId] = useState('');
	const [currUser, setCurrUser] = useState('');
	const [previousChatGroup, setPreviousChatGroup] = useState([]);
	const [introStatements, setIntroStatements] = useState([]);

	return (
		<NavigationContext.Provider
			value={{ isOpen, setIsOpen, sidebarView, setSidebarView, profileId, setProfileId, currUser, setCurrUser, previousChatGroup, setPreviousChatGroup, introStatements, setIntroStatements }}
		>
			{children}
		</NavigationContext.Provider>
	);
};


