import Axios from "axios";

import * as actions from "./actionTypes";
import getDownloadUrl from "../../utils/getDownloadUrl";
import { storage } from "../../firebase";

const initializeProfile = (name, followers, likes, gender, bio, dob, url) => {
  return {
    type: actions.INITIgenALIZE_PROFILE,
    bio,
    dob,
    likes,
    followers,
    name,
    gender,
    url,
  };
};
const changeGender = (gender, url) => {
  return {
    type: actions.GENDER_CHANGE_HANDLER,
    gender,
    url,
  };
};
export const genderChangeHandler = (gender) => {
  return (dispatch) => {
    if (gender !== "female") {
      getDownloadUrl("male", storage, (url) => {
        dispatch(changeGender(gender, url));
      });
    } else {
      getDownloadUrl("female", storage, (url) => {
        dispatch(changeGender(gender, url));
      });
    }
  };
};

const updateProfile = (gender, bio, dob) => {
  return {
    type: actions.UPDATE_PROFILE_INFO,
    bio,
    dob,
    gender,
  };
};

export const updateProfileInfo = (gender, bio, dob, token, userId) => {
  return (dispatch, getState) => {
    Axios.get(
      "https://social-media-website-13b03.firebaseio.com/users.json?auth=" +
        token
    ).then((res) => {
      let keyArr = Object.keys(res.data);
      const uniqueKey = keyArr.filter((key) => {
        return res.data[key].userId === userId;
      });
      const data = res.data;
      const userData = {
        ...res.data[uniqueKey],
        gender,
        bio,
        dob,
        profilePhoto: getState().profileInfo.profilePhoto,
      };
      Axios.put(
        "https://social-media-website-13b03.firebaseio.com/users.json?auth=" +
          token,
        {
          ...data,
          [uniqueKey]: userData,
        }
      )
        .then((res) => {
          dispatch(updateProfile(gender, bio, dob));
        })
        .catch((err) => {
          console.log(err.response);
        });
    });
  };
};

export const initializeProfileAction = (axios) => {
  console.clear();
  console.log("ITS RUNNING");
  return (dispatch, getState) => {
    console.log("ITS IN RETURN");
    const { token, userId } = getState().auth;
    console.log(token);
    if (token !== null) {
      axios
        .get(
          "https://social-media-website-13b03.firebaseio.com/users.json?auth=" +
            token +
            '&orderBy="userId"&equalTo="' +
            userId +
            '"'
        )
        .then((res) => {
          const key = Object.keys(res.data)[0];
          const data = res.data[key];
          console.log(data);
          // getDownloadUrl(data.gender, storage, (url) => {
          dispatch(
            initializeProfile(
              data.name,
              data.followers,
              data.likes,
              data.gender,
              data.bio,
              data.dob,
              data.profilePhoto
            )
          );
          // });
        });
    }
  };
};
