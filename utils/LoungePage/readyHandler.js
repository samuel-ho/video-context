import { readyAPISetter } from "./readyAPISetter";

/**
 *
 * @param {string} id : The users ID for whom you want to set handle their readiness.
 * @param {boolean} forceFalse : If you want to DEFINITELY set their readiness as false, set as true.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setReadiness : The setState function for the component user readiness.
 * @param {boolean} isReady : The users readiness from the setState.
 */

export const readyHandler = (id, setReadiness, isReady, forceFalse = false) => {  
  if (forceFalse) {
    setReadiness(false);
    readyAPISetter(id, false);
  } else {
    setReadiness(!isReady);
    readyAPISetter(id, !isReady);
  }
  localStorage.setItem("readiness", !isReady);
};
