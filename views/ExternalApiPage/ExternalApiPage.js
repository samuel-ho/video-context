import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const ExternalApi = () => {
  const [message, setMessage] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  const { getAccessTokenSilently } = useAuth0();

  const callApi = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/public-message`);
      const responseData = await response.json();

      setMessage(responseData);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const callSecureApi = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${apiUrl}/api/private-message`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      setMessage(responseData);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <>
      <h1>External API</h1>
      <p>
        You use will use a button to call an external API using an access token,
        and the API will validate it using the API's audience value.{" "}
        <strong>This route should be private</strong>.
      </p>
      <div>
        <button onClick={callApi}>
          Get Public Message
        </button>
        <button onClick={callSecureApi}>
          Get Private Message
        </button>
      </div>

      {message && (
        <div className="mt-5">
          <h6 className="muted">Result</h6>
          <>{JSON.stringify(message, null, 2)}</>
        </div>
      )}
    </>
  );
};

export default ExternalApi;
