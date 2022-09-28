const getMessagingWssUrl = async (): Promise<void> => {
  return await fetch(`${process.env.REACT_APP_CHIME_API_URL}`)
    .then((res) => res.json());
    /*.then((data) =>
      console.log(data.MeetingResponse.Meeting.MediaPlacement.ScreenViewingUrl)
    )*/
};

export default getMessagingWssUrl;
