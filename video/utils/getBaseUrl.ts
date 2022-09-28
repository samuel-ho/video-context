/**
  @returns {string}:
  baseUrl: The API URL string which is used for accessing chime. */

const getBaseUrl = (): string => {
  return `${process.env.REACT_APP_CHIME_API_URL}`;
};

export default getBaseUrl;
