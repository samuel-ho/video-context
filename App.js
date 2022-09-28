// External imports, installed libraries, etc
import React from "react";
import {
  BrowserRouter as Switch,
  Route
} from "react-router-dom";
import * as firebase from "firebase";
import { useAuth0 } from "@auth0/auth0-react";

// Internal data, functions, custom hooks, etc
import FirebaseConfig from "../../config/firebase.config";
import { NavigationProvider } from "../NavigationContext/NavigationContext";
import { ConfigProvider } from "../HomePageConfigContext/HomePageConfigContext";

import { config as videoConfig } from "../../views/VideoPage";
import views from "../../views";
import "./app.css";
import "./reset.css";

// Internal components, images, etc
import Layout from "../Layout";
import PrivateRoute from "../PrivateRoute";
import ChimeProvider from "../../video/providers/ChimeProvider";
import ChatPage from "../../video/views/ChatPage/ChatPage";
import MeetingStatusProvider from "../../video/providers/MeetingStatusProvider";
import "../../video/app.global.css";
import TutorialProvider from "../../providers/NavigationContext/TutorialProvider";
import ErrorPage from "../../../src/views/ErrorPage/ErrorPage";
import ChatProvider from '../../providers/NavigationContext/ChatContext/ChatProvider'

// Initialize Firebase
firebase.initializeApp(FirebaseConfig);
firebase.analytics();

const App = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  return (
    <NavigationProvider>
      <ConfigProvider>
        <Switch>
          <>
            <ChatProvider>
            <TutorialProvider>
              <PrivateRoute exact path="/video/chat">
                <Layout
                  auth0IsAuthenticated={isAuthenticated}
                  viewConfig={videoConfig.viewConfig}
                >
                  <ChimeProvider>
                    <MeetingStatusProvider>
                      <ChatPage />
                    </MeetingStatusProvider>
                  </ChimeProvider>
                </Layout>
              </PrivateRoute>
              <DefaultRoutes
                auth0User={user}
                auth0IsAuthenticated={isAuthenticated}
                auth0IsLoading={isLoading}
              />
            </TutorialProvider>
            </ChatProvider>
          </>
          <Route render={() => <ErrorPage />} />
        </Switch>
      </ConfigProvider>
    </NavigationProvider>
  );
};

const DefaultRoutes = ({ auth0User, auth0IsAuthenticated, auth0IsLoading }) => {
  return views.map((view, index) => {
    const keyID = `ROUTE_${index}`;

    return (
      <view.routeType key={keyID} exact={view.exact} path={view.path}>
        <Layout
          auth0User={auth0User}
          auth0IsAuthenticated={auth0IsAuthenticated}
          auth0IsLoading={auth0IsLoading}
          viewConfig={view.path === "/" ? "HomePage" : view.viewConfig}
        >
          {!auth0IsLoading && (
            <view.component
              auth0User={auth0User}
              auth0IsAuthenticated={auth0IsAuthenticated}
              auth0IsLoading={auth0IsLoading}
            />
          )}
        </Layout>
      </view.routeType>
    );
  });
};

export default App;
