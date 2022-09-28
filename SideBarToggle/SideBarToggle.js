import openSideBar from './openSideBar';
import closeSideBar from './closeSideBar';

export default function SideBarToggle({ isOpen, setIsOpen, sidebarView, newSidebarView, setSidebarView, setProfileId, profileId, newProfileId }) {
	if (isOpen) {
		if (sidebarView === newSidebarView) {
			if(profileId !== newProfileId) {
				setProfileId(newProfileId)
			} else {
				closeSideBar({ setIsOpen, setSidebarView, setProfileId });
			}
		} else {
			setProfileId(newProfileId)
			setSidebarView(newSidebarView);
		}
	} else {
		openSideBar({ setIsOpen, setSidebarView, newSidebarView, setProfileId, newProfileId });
	}
}
