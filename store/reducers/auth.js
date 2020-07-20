import * as actionTypes from "../actions/actionTypes";

const initialState = {
  name: null,
  loading: false,
  error: null,
  token: null,
  userId: null,
  mode: "signup",
  refreshToken: null,
};
const authStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};
const authSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    token: action.token,
    userId: action.userId,
    refreshToken: action.refreshToken,
    error: null,
  };
};
const authFail = (state, action) => {
  return {
    ...state,
    loading: false,
    token: null,
    userId: null,
    error: action.error,
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      console.log(action.token);
      console.log(action.refreshToken);
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_CHANGE_NAME:
      return {
        ...state,
        name: action.name,
      };
    case actionTypes.RESET_AUTH_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
