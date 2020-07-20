import * as actionTypes from "./actionTypes";

const fetchPostsSuccess = (postArr) => {
  return {
    type: actionTypes.FETCH_POSTS_SUCCESS,
    postArr,
  };
};

export const fetchPosts = (Axios, token) => {
  return (dispatch) => {
    Axios.get(
      "https://social-media-website-13b03.firebaseio.com/posts.json?auth=" +
        token
    )
      .then((res) => {
        const posts = [];
        const keys = Object.keys(res.data);
        keys.map((key) => {
          posts.push(res.data[key]);
        });
        dispatch(fetchPostsSuccess(posts));
      })
      .catch((err) => [console.log(err)]);
  };
};
export const updatePostsArray = (newPost) => {
  return {
    type: actionTypes.UPDATE_POST_ARRAY,
    newPost,
  };
};
