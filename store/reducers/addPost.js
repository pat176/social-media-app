import * as actionTypes from "../actions/actionTypes";

const initialState = {
  error: null,
  loading: null,
  postCount: 0,
  fileDownloadUrls: {},
};

const addPostStart = (state) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const addPostSuccess = (state) => {
  return {
    ...state,
    loading: false,
    fileDownloadUrls: {},
  };
};

const addPostFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};
const updatePostCount = (state, action) => {
  return {
    ...state,
    postCount: action.count,
  };
};
const uploadPhotoStart = (state, action) => {
  return {
    ...state,
    fileDownloadUrls: {
      ...state.fileDownloadUrls,
      [action.name]: { loading: true, url: null },
    },
  };
};
const uploadPhotoSuccess = (state, action) => {
  return {
    ...state,
    fileDownloadUrls: {
      ...state.fileDownloadUrls,
      [action.name]: { loading: false, url: action.url },
    },
  };
};

const deletePhoto = (state, action) => {
  const urlCopy = { ...state.fileDownloadUrls };
  delete urlCopy[action.name];
  return {
    ...state,
    fileDownloadUrls: {
      ...urlCopy,
    },
  };
};

const addPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_POST_START:
      return addPostStart(state);
    case actionTypes.ADD_POST_SUCCESS:
      return addPostSuccess(state);
    case actionTypes.ADD_POST_FAIL:
      return addPostFail(state, action);
    case actionTypes.UPDATE_POST_COUNT:
      return updatePostCount(state, action);
    case actionTypes.UPLOAD_PHOTO_START:
      return uploadPhotoStart(state, action);
    case actionTypes.UPLOAD_PHOTO_SUCCESS:
      return uploadPhotoSuccess(state, action);
    case actionTypes.DELETE_PHOTO:
      return deletePhoto(state, action);
    default:
      return state;
  }
};

export default addPostReducer;
