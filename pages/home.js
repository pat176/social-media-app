import React from "react";
import Router from "next/router";
import { connect } from "react-redux";
import Axios from "axios";

import refreshLogin from "../utils/refreshLogin";
import AddPostForm from "../components/AddPostForm/AddPostForm";
import * as authActions from "../store/actions/auth";
import * as addPostActions from "../store/actions/addPost";
import * as fetchPostActions from "../store/actions/fetchPosts";
import Posts from "../components/Posts/Posts";
import { initializeProfileAction } from "../store/actions/profileInfo";
class Home extends React.Component {
  componentDidMount() {
    refreshLogin(this.props.onAutoAuth, this.props.onFetchPosts, Router, Axios);
    this.props.onInitializeProfileAction(Axios);
    // if (this.props.token === null) {
    //   Router.replace("/");
    // }
    // this.props.onAddPost(this.props.userId, this.props.token);
  }

  render() {
    return (
      <div>
        <AddPostForm />
        {this.props.posts.length !== 0 ? (
          <Posts posts={this.props.posts} />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    posts: state.fetchPosts.postsArr,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAutoAuth: (token, userId, refreshToken) => {
      dispatch(authActions.autoAuth(token, userId, refreshToken));
    },
    onAddPost: (userId, token) => {
      dispatch(addPostActions.addPost("test", "test", userId, token));
    },
    onFetchPosts: (Axios, token) => {
      dispatch(fetchPostActions.fetchPosts(Axios, token));
    },
    onInitializeProfileAction: (axios) => {
      dispatch(initializeProfileAction(axios));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
