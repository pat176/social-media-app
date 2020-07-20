import * as actionTypes from "../actions/actionTypes";

const initialState = {
  postsArr: [],
};
const fetchPostsSuccess = (state, action) => {
  return {
    ...state,
    postsArr: action.postArr,
  };
};

const updatePostsArray = (state, action) => {
  return {
    ...state,
    postsArr: [...state.postsArr, action.newPost],
  };
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_POSTS_SUCCESS:
      return fetchPostsSuccess(state, action);
    case actionTypes.UPDATE_POST_ARRAY:
      return updatePostsArray(state, action);
    default:
      return state;
  }
};
