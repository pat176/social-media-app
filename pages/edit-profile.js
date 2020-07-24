import React, { Component } from "react";
import Router from "next/router";
import { connect } from "react-redux";
import {
  initializeProfileAction,
  genderChangeHandler,
  updateProfileInfo,
} from "../store/actions/profileInfo";
import Axios from "axios";
import { titleCase } from "../utils/titleCase";

export class EditProfile extends Component {
  state = {
    data: {
      date: "",
      gender: "",
      bio: "",
    },
  };
  componentDidMount() {
    if (this.props.token === null) {
      Router.replace("/");
    }
    this.setState({
      data: {
        date: this.props.dob,
        gender: this.props.gender,
        bio: this.props.bio,
      },
    });
    this.props.onInitializeProfileAction(Axios);
  }
  dateChangeHandler = (e) => {
    const stateData = { ...this.state.data };
    stateData.date = e.target.value;
    console.log(stateData.date);
    this.setState({
      data: stateData,
    });
  };
  genderChangeHandler = (e) => {
    const stateData = { ...this.state.data };
    stateData.gender = e.target.value;
    this.setState({
      data: stateData,
    });
    console.log(this.state);
    this.props.onGenderChange(e.target.value);
  };

  bioChangeHandler = (e) => {
    const stateData = { ...this.state.data };
    stateData.bio = e.target.value;
    this.setState({
      data: stateData,
    });
    console.log(this.state);
  };
  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);
    console.log("running it");
    Router.replace("/home");
    this.props.onUpdateProfileInfo(
      this.state.data.gender.toLowerCase(),
      this.state.data.bio,
      this.state.data.date,
      this.props.token,
      this.props.userId
    );
  };
  closePageHandler = () => {
    Router.replace("/home");
  };
  render() {
    return (
      <div>
        {this.props.dob === new Date().toLocaleDateString() ? null : (
          <button className="close-btn" onClick={this.closePageHandler}>
            <i className="fas fa-close" />
          </button>
        )}
        <div className="profilePhoto">
          {this.props.profilePhoto !== "" ? (
            <img src={this.props.profilePhoto} alt="profilePhoto" />
          ) : null}
          <input type="file" name="profilePhoto" id="profilePhoto" />
        </div>
        <form onSubmit={this.submitHandler}>
          <input
            onChange={this.dateChangeHandler}
            type="date"
            name="dob"
            id="dob"
            defaultValue={this.props.dob}
            min={`${new Date().getFullYear - 13}-${new Date().getMonth}-${
              new Date().getDate
            }`}
            min={`${new Date().getFullYear - 120}-${new Date().getMonth}-${
              new Date().getDate
            }`}
            required
          />
          <select
            onChange={this.genderChangeHandler}
            defaultValue={
              this.props.gender !== ""
                ? titleCase(this.props.gender)
                : "Choose Your Gender"
            }
            name="gender"
            id="gender"
            style={{ display: "block" }}
          >
            <option disabled>Choose Your Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Prefer Not To Say</option>
          </select>
          <textarea
            onChange={this.bioChangeHandler}
            name="bio"
            id="bio"
            cols="30"
            rows="10"
            defaultValue={this.props.bio}
          ></textarea>
          <button type="submit">SAVE CHANGES</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    bio: state.profileInfo.bio,
    gender: state.profileInfo.gender,
    dob: state.profileInfo.dob,
    profilePhoto: state.profileInfo.profilePhoto,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitializeProfileAction: (axios) => {
      dispatch(initializeProfileAction(axios));
    },
    onGenderChange: (gender) => {
      dispatch(genderChangeHandler(gender));
    },
    onUpdateProfileInfo: (gender, bio, dob, token, userId) => {
      dispatch(updateProfileInfo(gender, bio, dob, token, userId));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
