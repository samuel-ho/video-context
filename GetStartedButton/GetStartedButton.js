import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Button from '../elements/Button';

const GetStartedButton = ( { className, color, variant } ) => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button 
      className={className}
      color={color}
      variant={variant}
      onClick={() => loginWithRedirect()}
    >
      Get started
    </Button>
  );
};

export default GetStartedButton;
