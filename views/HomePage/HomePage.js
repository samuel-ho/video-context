import React, { useEffect, useState, useContext } from "react";

import validateUser from "../../hooks/validateUserDataByEmail/validateUserDataByEmail";
import { createUser } from "../../hooks/createUser/createUser";
import { config as AuthenticatedConfig } from "./Authenticated";
import { config as ProfileIncompleteConfig } from "./ProfileIncomplete";
import { config as UnauthenticatedConfig } from "./Unauthenticated";
import imageCompression from "browser-image-compression";
import Authenticated from './Authenticated';
import ProfileIncomplete from './ProfileIncomplete';
import Unauthenticated from './Unauthenticated';
import Loader from "../../components/Loader";
import { HomePageConfigContext } from '../../components/HomePageConfigContext/HomePageConfigContext.js';
import { TutorialContext, DispatchTutorialContext } from '../../providers/NavigationContext/TutorialProvider';


const HomePage = ({ auth0User, auth0IsLoading, auth0IsAuthenticated }) => {
  const { setConfig } = useContext(HomePageConfigContext);
  const [view, setView] = useState('profileincomplete');
  const [profileComplete, setProfileComplete] = useState(false);
  const [profileSubmissionViewIsLoading, setProfileSubmissionViewIsLoading] = useState(false);

  useEffect(() => {
    localStorage.removeItem("readiness");
    localStorage.removeItem("shouldBeInChat");
    localStorage.removeItem("uid");
    localStorage.removeItem("lid");
  }, []);


  const userEmail = auth0IsAuthenticated ? (auth0User.email) : ("");
  const [userProfileBuild, setUserProfileBuild] = useState({
    name: "",
    town: "",
    email: userEmail,
    major: "",
    otherContact: "",
    picture: "",
  });
  const [imageInvalid, setImageInvalid] = useState(false);

  const onSubmit = () => {
    if (userProfileBuild.picture === "") {
      //send default pictures if no pic uploaded
      userProfileBuild.picture = btoa("./Profile-Background.png");
    }
    setProfileSubmissionViewIsLoading(true);
    createUser(userProfileBuild).then((res) => {
      if (res) {
        setProfileComplete(true)
      } else {
        setProfileSubmissionViewIsLoading(false);
      }
    })
  };

  const { showTutorialModal, tutorialDisplay } = useContext(TutorialContext);
  const dispatch = useContext(DispatchTutorialContext);

  useEffect(() => {
    const setViewAndConfig = (view, config) => {
      setConfig(config);
      setView(view);
    }

    !auth0IsLoading ? (
      auth0User ? (
        void (async function start() {
          setViewAndConfig('loading', AuthenticatedConfig);
          try {
            let result = await validateUser(auth0User.email);
            if (result) {
              setViewAndConfig('authenticated', AuthenticatedConfig);
            } else {
              setViewAndConfig('profileincomplete', ProfileIncompleteConfig);
              dispatch({ showTutorialModal: true, tutorialDisplay: true }); //launch tutorial only after onboarding
            }
          } catch (err) {
            setViewAndConfig('profileincomplete', ProfileIncompleteConfig);
            console.log('[HOMEPAGE]', err);
          }
        })()
      ) : (
          setViewAndConfig('unauthenticated', UnauthenticatedConfig)
        )
    ) : (
        setViewAndConfig('loading', AuthenticatedConfig)
      );
  }, [auth0User, profileComplete, auth0IsLoading, setConfig]);

  return (
    <>
      {view === 'loading' && (<Loader />)}
      {view === 'unauthenticated' && (<Unauthenticated />)}
      {view === 'profileincomplete' && (<ProfileIncomplete onSubmit={onSubmit}
        setUserProfileBuild={setUserProfileBuild}
        userProfileBuild={userProfileBuild} imageInvalid={imageInvalid}
        setImageInvalid={setImageInvalid}
        profileSubmissionViewIsLoading={profileSubmissionViewIsLoading} />)}
      {view === 'authenticated' && (<Authenticated />)}
    </>
  );
};

export default HomePage;
