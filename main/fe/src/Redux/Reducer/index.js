import {
  ADD_ARTICLE,
  SET_PERMISSION,
  SET_USER,
  SET_TOKEN,
  SET_USER_TUTORIAL,
  SET_USER_TUTORIAL_RENT,
  RESET,
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
} from "../Constant/index";

const initialState = {
  articles: [],
  permission: "",
  user: "",
  tutorial: false,
  tutorial_rent: false,
  token: "",
  accessToken: null,
  refreshToken: null,
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload),
    });
  }

  if (action.type === SET_PERMISSION) {
    return Object.assign({}, state, {
      permission: action.payload,
    });
  }

  if (action.type === SET_USER) {
    return Object.assign({}, state, {
      user: action.payload,
    });
  }
  if (action.type === SET_TOKEN) {
    return Object.assign({}, state, {
      token: action.payload,
    });
  }
  if (action.type === SET_ACCESS_TOKEN) {
    return Object.assign({}, state, {
      accessToken: action.payload,
    });
  }
  if (action.type === SET_REFRESH_TOKEN) {
    return Object.assign({}, state, {
      refreshToken: action.payload,
    });
  }
  if (action.type === SET_USER_TUTORIAL) {
    return Object.assign({}, state, {
      user: { ...state.user, tutorial: action.payload },
    });
  }
  if (action.type === SET_USER_TUTORIAL_RENT) {
    return Object.assign({}, state, {
      user: { ...state.user, tutorial_rent: action.payload },
    });
  }

  if (action.type === RESET) {
    return Object.assign({}, state, initialState);
  }
  return state;
}

export default rootReducer;
