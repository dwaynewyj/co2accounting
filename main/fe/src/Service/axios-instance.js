import axios from "axios";
import { setAccessToken, setRefreshToken } from "../Redux/Action";
import { store } from "../Redux/Store";

const REQUEST_TIMEOUT = 50000;

const signOut = () => {
  window.location.replace(
    `https://${process.env.REACT_APP_AUTH0_DOMAIN}/v2/logout?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&returnTo=${process.env.REACT_APP_AUTH0_CALLBACK_URL}`,
  );
};

export const axiosBaseInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
  timeout: REQUEST_TIMEOUT,
});

axiosBaseInstance.interceptors.request.use((config) => {
  const state = store.getState();
  config.headers["x-access-token"] = state.accessToken;
  config.headers["x-refresh-token"] = state.refreshToken;
  return config;
});

axiosBaseInstance.interceptors.response.use(
  (response) => {
    const { headers } = response;
    if (headers["x-access-token"]) {
      store.dispatch(setAccessToken(headers["x-access-token"]));
    }
    if (headers["x-refresh-token"]) {
      store.dispatch(setRefreshToken(headers["x-refresh-token"]));
    }
    return response;
  },
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      signOut();
    }
    return Promise.reject(error);
  },
);

export const axiosRootInstance = axios.create({
  baseURL: process.env.REACT_APP_ROOT_URL,
  // withCredentials: true,
  timeout: REQUEST_TIMEOUT,
});
