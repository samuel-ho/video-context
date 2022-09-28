# Thirty Friends

## Get Started

Install the client project dependencies:

```bash
yarn
```

Create `.env` file under the project directory:

```bash
touch .env
```

Populate `.env` as follows:

```bash
REACT_APP_AUTH0_DOMAIN=
REACT_APP_AUTH0_CLIENT_ID=
REACT_APP_AUDIENCE=

REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_DATABASE_URL=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_MEASUREMENT_ID=

REACT_APP_CHAT_OPEN_TIMER = 240
REACT_APP_CHAT_EVENT_TIMER = 300
REACT_APP_CHAT_RANDOMISER_CUT_OFF = 60
REACT_APP_CHAT_LENGTH = 1020

REACT_APP_API_URL=
REACT_APP_CHIME_API_URL=
REACT_APP_SOCKET_API_URL=
```

Get the values for `REACT_APP_AUTH0_DOMAIN` and `REACT_APP_AUTH0_CLIENT_ID` from your Auth0 Application in the Auth0 Dashboard.

The value of `REACT_APP_AUDIENCE` is the Auth0 Identifier of the secured API that you want to access from your React app.

Get the value for `REACT_APP_API_KEY` `REACT_APP_AUTH_DOMAIN` `REACT_APP_DATABASE_URL` `REACT_APP_PROJECT_ID` `REACT_APP_STORAGE_BUCKET` `REACT_APP_MESSAGING_SENDER_ID` `REACT_APP_APP_ID` `REACT_APP_MEASUREMENT_ID` can be found in Firebase account in Console -> Project -> Project Overview Cog Icon -> Project Settings -> Firebase SDK snippet -> Config

`REACT_APP_CHAT_OPEN_TIMER = 240` 
`REACT_APP_CHAT_EVENT_TIMER = 180`
`REACT_APP_CHAT_RANDOMISER_CUT_OFF = 60`
`REACT_APP_CHAT_LENGTH = 1020`

Above values are set in seconds.
These values control lounge length and moment when randomisation algorithm kicks in to find groups of ready up people. This should happen before the timer runs out. By default is set to 60 seconds. The chat length is the length of the video chat, defaults to 17 mins (1020 seconds).

Set the value of `REACT_APP_API_URL` to the address that you access api. Example: http://localhost:5001

Set the value of `REACT_CHIME_API_URL` to the address that you access chime api. Example: http://localhost:3020 or the hosted version.
Set the value of `REACT_APP_SOCKET_API_URL` to the address that you access sockets. Example: http://localhost:3020 or the hosted version.


Run the project:

```bash
yarn start
```
