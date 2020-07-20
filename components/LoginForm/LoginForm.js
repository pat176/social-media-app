import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import Router from "next/router";

import classes from "./LoginForm.module.css";
import * as actions from "../../store/actions/auth";
import Spinner from "../UI/Spinner/Spinner";
import Backdrop from "../UI/Backdrop/Backdrop";

const LoginForm = (props) => {
  const [mode, setMode] = useState("signup");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const changeMode = () => {
    props.onResetError();
    if (mode === "signup") {
      setMode("signin");
    } else {
      setMode("signup");
    }
  };
  const authHandler = (e) => {
    e.preventDefault();
    props.onAuth(name, email, password, mode, Router);
  };
  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const errorMessage = () => {
    if (props.error !== null) {
      return <p style={{ textAlign: "center" }}>{props.error}</p>;
    } else {
      return null;
    }
  };

  return (
    <Fragment>
      <Backdrop show={props.loading}>
        <Spinner />
      </Backdrop>

      <form className={classes.form__root} onSubmit={authHandler}>
        <h4 className={classes.heading}>
          {mode === "signup" ? "Sign Up Now!" : "Sign In."}
        </h4>
        {errorMessage()}

        {mode === "signup" ? (
          <Fragment>
            <input
              type="text"
              style={{ display: "block", margin: "10px auto" }}
              id="name"
              value={name}
              onChange={nameChangeHandler}
              validate="true"
              required
            />
            <label htmlFor="name">Your Name</label>
          </Fragment>
        ) : null}
        <input
          type="email"
          style={{ display: "block", margin: "10px auto" }}
          id="email"
          value={email}
          onChange={emailChangeHandler}
          validate="true"
          required
        />
        <label htmlFor="email">Your E-mail</label>
        <input
          type="password"
          style={{ display: "block", margin: "10px auto" }}
          id="password"
          value={password}
          onChange={passwordChangeHandler}
          validate="true"
          minLength="6"
          maxLength="12"
          required
        />
        <label htmlFor="password">Your Password</label>
        <p className={classes.changeMode}>
          {mode === "signup" ? "Already a Member?" : "Not A Member?"}{" "}
          <a onClick={changeMode} className={classes.modeHandler}>
            {mode === "signup" ? "Sign In" : "Sign Up"}
          </a>{" "}
          Instead!
        </p>
        <button
          type="submit"
          style={{ display: "block" }}
          className={`btn red accent-3 ${classes.submitButton}`}
        >
          {mode === "signup" ? "Sign Up" : "Sign In"}
        </button>
        <a
          className={classes.reset__password}
          style={{ display: "block", textAlign: "center" }}
          onClick={() => {
            Axios.post(
              "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAaxgPQIhxzY0df_51sT_NLZiIuYZ_aKeI",
              {
                requestType: "PASSWORD_RESET",
                email: email,
              }
            ).then((res) => {
              alert("Reset Password Link Sent To " + email);
            });
          }}
        >
          Reset Password
        </a>
      </form>
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (name, email, password, mode, Router) =>
      dispatch(actions.auth(name, email, password, mode, Router)),
    onResetError: () => {
      dispatch(actions.resetAuthError());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
