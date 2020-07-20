import React, { Component } from "react";
import { connect } from "react-redux";

import { storage } from "../../firebase/index";
import classes from "./AddPostForm.module.css";
import {
  uploadPhotos,
  deletePhoto,
  addPost,
} from "../../store/actions/addPost";
import { updatePostsArray } from "../../store/actions/fetchPosts";
import UploadImage from "../UI/UploadImage/UploadImage";

export class AddPostForm extends Component {
  state = {
    description: "",
  };
  uploadFile = () => {
    const files = document.getElementById("files").files;
    const keys = Object.keys(files);
    const stateArr = [];
    keys.map((key) => {
      stateArr.push(files[key]);
    });
    this.props.onUploadPhotos(
      stateArr,
      storage,
      this.props.userId,
      this.props.postCount
    );
  };
  submitHandler = (e) => {
    e.preventDefault();
    const urls = [];
    Object.keys(this.props.fileDownloadUrls).map((key) => {
      urls.push(this.props.fileDownloadUrls[key].url);
    });
    const data = {
      postCount: this.props.postCount + 1,
      description: this.state.description,
      images: [...urls],
      userId: this.props.userId,
    };
    this.props.onUpdatePostArray(data);
    this.props.onAddPost(
      this.state.description,
      this.props.postCount,
      this.props.fileDownloadUrls,
      this.props.userId,
      this.props.token
    );
    this.setState({ description: "" });
  };
  inputChangeHandler = (e) => {
    this.setState({ description: e.target.value });
  };
  componentWillUnmount() {
    console.log("it is unmounting");
  }

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        {Object.keys(this.props.fileDownloadUrls).map((key, index) => {
          const url = this.props.fileDownloadUrls[key].url;
          if (url !== null) {
            return (
              <UploadImage
                delete={() => {
                  this.props.onDeletePhoto(
                    key,
                    storage,
                    this.props.postCount,
                    this.props.userId
                  );
                }}
                imageUrl={url}
                imageAlt={key}
                key={key + index}
              />
            );
          }
        })}
        <input
          type="text"
          value={this.state.description}
          onChange={this.inputChangeHandler}
        />
        <input
          type="file"
          onChange={this.uploadFile}
          className={classes.ImageInput}
          id="files"
          name="files"
          accept="image/*"
          multiple
          required={this.props.fileDownloadUrls.length === 0}
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    postCount: state.addPost.postCount,
    fileDownloadUrls: state.addPost.fileDownloadUrls,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onUploadPhotos: (files, storage, userId, postCount) => {
      dispatch(uploadPhotos(files, storage, userId, postCount));
    },
    onDeletePhoto: (name, storage, postCount, userId) => {
      dispatch(deletePhoto(name, storage, postCount, userId));
    },
    onAddPost: (description, postCount, images, userId, token) => {
      dispatch(addPost(description, postCount, images, userId, token));
    },
    onUpdatePostArray: (newPost) => {
      dispatch(updatePostsArray(newPost));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddPostForm);
