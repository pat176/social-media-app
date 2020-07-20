import * as actionTypes from "./actionTypes";
import axios from "axios";
import * as addPostActions from "./addPost";
import { storage } from "../../firebase";
import getDownloadUrl from "../../utils/getDownloadUrl";

const FETCH_NAME = (dispatch, token, userId) => {
  axios
    .get(
      "https://social-media-website-13b03.firebaseio.com/users.json?auth=" +
        token +
        '&orderBy="userId"&equalTo="' +
        userId +
        '"'
    )
    .then((res) => {
      let keyArr = Object.keys(res.data);
      let key = keyArr[0];
      console.log("[AUTH.JS]", res.data);
      dispatch(
        addPostActions.clearCurrentPhotos(
          userId,
          res.data[key].postCount,
          storage
        )
      );
      dispatch(addPostActions.updatePostCount(res.data[key].postCount));
      dispatch(authChangeName(res.data[key].name));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
export const authSuccess = (token, userId, refreshToken) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
    refreshToken,
  };
};
export const authChangeName = (name) => {
  return {
    type: actionTypes.AUTH_CHANGE_NAME,
    name,
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};
export const resetAuthError = () => {
  return {
    type: actionTypes.RESET_AUTH_ERROR,
  };
};

export const auth = (name, email, password, mode, Router) => {
  let userData;
  userData = {
    email,
    password,
    returnSecureToken: true,
  };
  return (dispatch) => {
    dispatch(authStart());
    let url;
    if (mode === "signup") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAaxgPQIhxzY0df_51sT_NLZiIuYZ_aKeI";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAaxgPQIhxzY0df_51sT_NLZiIuYZ_aKeI";
    }
    axios
      .post(url, userData)
      .then((res) => {
        if (mode === "signup") {
          getDownloadUrl("male", storage, (url) => {
            axios
              .post(
                "https://social-media-website-13b03.firebaseio.com/users.json?auth=" +
                  res.data.idToken,
                {
                  name: name,
                  userId: res.data.localId,
                  postCount: 0,
                  followers: 0,
                  likes: 0,
                  gender: "male",
                  bio: "",
                  dob: new Date().toLocaleDateString(),
                  profilePhoto: url,
                }
              )
              .then((res) => {
                dispatch(authChangeName(name));
                console.log("[SIGNUP NAME FETCH]");
                // dispatch(authFail("SIGNED_UP_SUCCESSFULLY"));
              })
              .catch((err) => {
                // dispatch(authFail(err.response.data.error.message));
              });
          });
        } else {
          FETCH_NAME(dispatch, res.data.idToken, res.data.localId);
          console.log("[SIGNING NAME FETCH]");
        }
        localStorage.setItem("refreshToken", res.data.refreshToken);
        dispatch(
          authSuccess(res.data.idToken, res.data.localId, res.data.refreshToken)
        );
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.error.message);
        dispatch(authFail(err.response.data.error.message));
      });
  };
};
export const autoAuth = (token, userId, refreshToken) => {
  return (dispatch) => {
    dispatch(authStart());
    dispatch(authSuccess(token, userId, refreshToken));
    FETCH_NAME(dispatch, token, userId);
  };
};
