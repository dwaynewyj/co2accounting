import {
  ADD_ARTICLE,
  SET_PERMISSION,
  SET_USER,
  SET_TOKEN,
  SET_USER_TUTORIAL,
  SET_USER_TUTORIAL_RENT,
  RESET,
  SET_REFRESH_TOKEN,
  SET_ACCESS_TOKEN,
} from "../Constant/index";

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}

export function setPermissionGlobal(payload) {
  return { type: SET_PERMISSION, payload };
}

export function setUserGlobal(payload) {
  return { type: SET_USER, payload };
}

export function setUserTutorialGlobal(payload) {
  return { type: SET_USER_TUTORIAL, payload };
}

export function setUserTutorialRentGlobal(payload) {
  return { type: SET_USER_TUTORIAL_RENT, payload };
}

export function setTokenGlobal(payload) {
  return { type: SET_TOKEN, payload };
}

export function setAccessToken(payload) {
  return { type: SET_ACCESS_TOKEN, payload };
}

export function setRefreshToken(payload) {
  return { type: SET_REFRESH_TOKEN, payload };
}

export function reset() {
  return { type: RESET };
}
