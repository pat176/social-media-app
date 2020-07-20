import auth from "./auth";
import addPost from "./addPost";
import fetchPosts from "./fetchPosts";
import profileInfo from "./profileInfo";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth,
  addPost,
  fetchPosts,
  profileInfo,
});

export default rootReducer;
