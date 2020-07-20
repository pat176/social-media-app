import * as actions from "../actions/actionTypes";

const initialState = {
  name: "",
  followers: 0,
  likes: 0,
  gender: "male",
  bio: "",
  dob: new Date().toLocaleDateString(),
  profilePhoto: "",
};

const initializeApp = (state, action) => {
  return {
    ...state,
    name: action.name,
    followers: action.followers,
    likes: action.likes,
    gender: action.gender,
    bio: action.bio,
    dob: action.dob,
    profilePhoto: action.url,
  };
};

const genderChangeHandler = (state, action) => {
  return {
    ...state,
    gender: action.gender,
    profilePhoto: action.url,
  };
};

const updateProfileInfo = (state, action) => {
  return {
    ...state,
    bio: action.bio,
    dob: action.dob,
    gender: action.gender,
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.INITIALIZE_PROFILE:
      return initializeApp(state, action);
    case actions.GENDER_CHANGE_HANDLER:
      return genderChangeHandler(state, action);
    case actions.UPDATE_PROFILE_INFO:
      return updateProfileInfo(state, action);
    default:
      return state;
  }
};
