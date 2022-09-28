import React from "react";
import leaveLounge from "../../../hooks/leaveLounge/leaveLounge"
import SrOnly from "../../SrOnly";

export const handleLeaveLounge = (id, history) => {
    leaveLounge(id).then(() => {
      localStorage.removeItem("readiness");
      localStorage.removeItem("lid");
      history.push("/");
    })
  }

export const formatTime = (timeLeft) => {
  let mins = Math.floor(timeLeft / 60);
  let secs = timeLeft % 60;

  if (secs < 10) secs = "0" + secs

  return (
    <>
      {mins > 0 ? (
        <>{mins}<SrOnly> minutes and</SrOnly><span aria-hidden="true">:</span>{secs}<SrOnly> seconds</SrOnly></>
      ) : (
      <>
        {secs}<span aria-hidden="true">s</span><SrOnly> seconds</SrOnly>
      </>
      )}
    </>
  )
}