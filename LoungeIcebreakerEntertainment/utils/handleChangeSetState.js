import { navContent } from "../constants";

export const handleChangeSetState = (navLink, setState) => {
    switch (navLink) {
        case "FAVORITES":
            setState(navContent.FAVORITES);
            return;
        case "SUGGEST":
            setState(navContent.SUGGEST);
            return;
        case "VOTE":
            setState(navContent.VOTE);
            return;
        default:
            setState(navContent.VOTE);
    }
}
