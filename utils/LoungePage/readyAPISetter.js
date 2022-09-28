/**
 *
 * @param {string} id : The ID of the user for whom you want to change their readiness
 * @param {boolean} readiness : The current state value of the users readiness.
 */

export const readyAPISetter = async (id, readiness) => {
  if(!id) return;

  try {
    await fetch(
      `${
        process.env.REACT_APP_API_URL
      }/api/User/SetUserChatReadyness?id=${id}&isReady=${readiness}`,
      { method: "POST" }
    );
  } catch (err) {
    console.log(err);
  }
};