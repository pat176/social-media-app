// import Head from "next/head";
import { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import Router from "next/router";

import LoginForm from "../components/LoginForm/LoginForm";
import * as authActions from "../store/actions/auth";
import refreshLogin from "../utils/refreshLogin";
import * as profileInfoActions from "../store/actions/profileInfo";

class Home extends Component {
  componentDidMount() {
    refreshLogin(this.props.onAutoAuth, null, Router, Axios);
    this.props.onInitializeProfileAction(Axios);
    // Axios.post("gs://social-media-website-13b03.appspot.com?auth=test", "test");
  }

  componentDidUpdate() {
    if (this.props.token !== null) {
      Router.replace("/edit-profile");
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="loginForm">
          <LoginForm />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.token,
    token: state.auth.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAutoAuth: (token, userId, refreshToken) => {
      dispatch(authActions.autoAuth(token, userId, refreshToken));
    },
    onInitializeProfileAction: (axios) => {
      dispatch(profileInfoActions.initializeProfileAction(axios));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
