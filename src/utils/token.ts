/**
 * Get access token from local storage
 * @returns Return access token
 */
const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

/**
 * Set access token to local storage
 * @param accessToken
 */
const setAccessToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken);
};

/**
 * Remove access token to local storage
 */
const removeAccessToken = () => {
  localStorage.removeItem('accessToken');
};

/**
 * Get access token from local storage
 * @returns Return refresh token
 */
const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

/**
 * Set refresh token to cookie
 * @param refreshToken
 */
const setRefreshToken = (refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken);
};

/**
 * Remove refresh token to local storage
 */
const removeRefreshToken = () => {
  localStorage.removeItem('refreshToken');
};

const token = {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  getRefreshToken,
  setRefreshToken,
  removeRefreshToken,
};

export default token;
