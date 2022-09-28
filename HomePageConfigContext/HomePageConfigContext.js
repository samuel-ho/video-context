// External imports, installed libraries, etc
import React, { useState, createContext } from 'react';

// Internal data, functions, custom hooks, etc

// Internal components, images, etc

export const HomePageConfigContext = createContext();
 
export const ConfigProvider = ({ children }) => {
	const [config, setConfig] = useState({
		pageName: 'default',
		viewConfig: {
			footer: true,
			pageTopPadding: {
				xs: '0',
				md: '0'
			},
			pageBottomPadding: {
				xs: '6',
				md: '6'
			},
		}
	});
	
	return (
		<HomePageConfigContext.Provider value={{ config, setConfig }}>
			{children}
		</HomePageConfigContext.Provider>
	);
};


