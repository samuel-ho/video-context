import React, {useEffect, useContext} from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Internal data, functions, custom hooks, etc
import { NavigationContext } from '../../components/NavigationContext/NavigationContext';
import useUserDataByEmail from "../../hooks/getUserDataByEmail/useUserDataByEmail";

export const SetUserContext = () => {
  const { user } = useAuth0();
  const myDetails = useUserDataByEmail(user.email);
  const { setCurrUser } = useContext(NavigationContext);

  useEffect(() => {
    setCurrUser(myDetails)
  }, [myDetails, setCurrUser]);

  return (
    <></>
  );
};

export default SetUserContext;
