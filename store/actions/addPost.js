import * as actionTypes from "./actionTypes";
import Axios from "axios";

const addPostStart = () => {
  return {
    type: actionTypes.ADD_POST_START,
  };
};

const addPostSuccess = () => {
  return {
    type: actionTypes.ADD_POST_SUCCESS,
  };
};

const addPostFail = (error) => {
  return {
    type: actionTypes.ADD_POST_FAIL,
    error,
  };
};

export const updatePostCount = (count) => {
  return {
    type: actionTypes.UPDATE_POST_COUNT,
    count,
  };
};
export const fetchPostCount = (token, userId) => {
  let count;
  let userData;
  return (dispatch) => {
    Axios.get(
      "https://social-media-website-13b03.firebaseio.com/users.json?auth=" +
        token
    ).then((res) => {
      let keyArr = Object.keys(res.data);
      const uniqueKey = keyArr.filter((key) => {
        return res.data[key].userId === userId;
      });
      count = res.data[uniqueKey].postCount;
      dispatch(updatePostCount(count));
    });
  };
};
export const updateCount = (token, userId) => {
  let count;
  return (dispatch) => {
    Axios.get(
      "https://social-media-website-13b03.firebaseio.com/users.json?auth=" +
        token
    ).then((res) => {
      let keyArr = Object.keys(res.data);
      const uniqueKey = keyArr.filter((key) => {
        return res.data[key].userId === userId;
      });
      count = res.data[uniqueKey].postCount + 1;
      const data = res.data;
      const userData = {
        ...res.data[uniqueKey],
        postCount: count,
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
          dispatch(updatePostCount(count));
        })
        .catch((err) => {
          console.log(err.response);
        });
    });
  };
};
export const addPost = (description, postCount, images, userId, idToken) => {
  const keys = Object.keys(images);
  const urls = [];
  keys.map((key) => {
    urls.push(images[key].url);
  });
  const data = {
    postCount: postCount + 1,
    description,
    images: [...urls],
    userId,
  };
  console.log(data);
  return (dispatch) => {
    dispatch(addPostStart());
    Axios.post(
      "https://social-media-website-13b03.firebaseio.com/posts.json?auth=" +
        idToken,
      JSON.stringify(data)
    )
      .then((res) => {
        console.log(res.data);
        dispatch(addPostSuccess());
        dispatch(updateCount(idToken, userId));
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(addPostFail(err.response.data.error.message));
      });
  };
};

const uploadPhotosStart = (name) => {
  return {
    type: actionTypes.UPLOAD_PHOTO_START,
    name,
  };
};

const uploadPhotosSuccess = (name, url) => {
  return {
    type: actionTypes.UPLOAD_PHOTO_SUCCESS,
    name,
    url,
  };
};

export const uploadPhotos = (files, storage, userId, postCount) => {
  return (dispatch) => {
    const storageRef = storage.ref(
      userId + "/" + "posts" + "/" + (parseInt(postCount) + 1)
    );
    // Get the file from DOM
    // var file = document.getElementById("files").files[0];

    files.map((file, index, arr) => {
      console.log(file);
      dispatch(uploadPhotosStart(file.name));
      //dynamically set reference to the file name
      const childRef = storageRef.child(file.name);
      //put request upload file to firebase storage
      childRef.put(file).then((snapshot) => {
        // alert("File Uploaded");
        console.log("Uploaded a blob or file!");
        // const storageRef = storage.ref(
        //   this.props.userId
        //   // "/" +
        //   // "posts" +
        //   // "/" +
        //   // (parseInt(this.props.postCount) + 1)
        // );
        const gsReference = storage.refFromURL(
          `gs://social-media-website-13b03.appspot.com/${userId}/posts/${
            postCount + 1
          }/${file.name}`
        );
        gsReference
          .getDownloadURL()
          .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'
            console.log(url);
            // This can be downloaded directly:
            var xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = function (event) {
              var blob = xhr.response;
            };
            xhr.open("GET", url);
            xhr.send();
            console.log(url);
            // Or inserted into an <img> element:
            dispatch(uploadPhotosSuccess(file.name, url));
            // return url;
          })
          .catch(function (error) {
            // Handle any errors
          });
      });
    });
  };
};

const deletePhotoAction = (name) => {
  return {
    type: actionTypes.DELETE_PHOTO,
    name,
  };
};

export const deletePhoto = (name, storage, postCount, userId) => {
  return (dispatch) => {
    const storageRef = storage.ref(
      userId + "/" + "posts" + "/" + (parseInt(postCount) + 1)
    );
    const image = storageRef.child(name);

    // Delete the file
    image
      .delete()
      .then(() => {
        dispatch(deletePhotoAction(name));
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };
};

export const clearCurrentPhotos = (userId, postCount, storage) => {
  return (dispatch) => {
    console.log(userId, postCount, storage);
    const ref = storage.ref(
      userId + "/" + "posts" + "/" + (parseInt(postCount) + 1)
    );
    console.log("its here");
    ref
      .listAll()
      .then((dir) => {
        dir.items.forEach((fileRef) => {
          var dirRef = storage.ref(fileRef.fullPath);
          dirRef.getDownloadURL().then(function (url) {
            var imgRef = storage.refFromURL(url);
            imgRef
              .delete()
              .then(function () {
                // File deleted successfully
                console.log("all files deleted");
              })
              .catch(function (error) {
                // There has been an error
                console.log(error);
              });
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
