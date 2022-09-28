

export default function openSideBar({ setIsOpen, setSidebarView, newSidebarView, setProfileId, newProfileId }) {
	setIsOpen(true);
	setSidebarView(newSidebarView);
	setProfileId(newProfileId);
}
