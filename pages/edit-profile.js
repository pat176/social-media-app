import React, { Component } from "react";
import Router from "next/router";
import { connect } from "react-redux";
import {
  initializeProfileAction,
  genderChangeHandler,
  updateProfileInfo,
} from "../store/actions/profileInfo";
import Axios from "axios";

export class EditProfile extends Component {
  state = {
    data: {
      date: "",
      gender: "",
      bio: ''
    },
  };
  componentDidMount() {
    if (this.props.token === null) {
      Router.replace("/");
    }
    this.props.onInitializeProfileAction(Axios);
  }
  dateChangeHandler = (e) => {
    const stateData = { ...this.state.data };
    stateData.date = e.target.value;
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
    this.props.onGenderChange(e.target.value);
  };

  bioChangeHandler = (e) => {
    const stateData = { ...this.state.data };
    stateData.bio = e.target.value;
    this.setState({
      data: stateData,
    });
  };
  submitHandler = (e) => {
      e.preventDefault();
      console.log("running it");
      Router.replace("/home")
      this.props.onUpdateProfileInfo(this.state.gender, this.state.bio, this.state.dob, this.props.token, this.props.userId)
  }
  render() {
    return (
      <div>
        <div className="profilePhoto">
          {this.props.profilePhoto !== "" ? (
            <img src={this.props.profilePhoto} alt="profilePhoto" />
          ) : null}
          <input type="file" name="profilePhoto" id="profilePhoto" />
        </div>
        <form
          onSubmit={() =>{this.submitHandler()}}
        >
          <input onChange={() => {this.dateChangeHandler()}} type="date" name="dob" id="dob" />
          <select onChange={() => {this.genderChangeHandler()}} name="gender" id="gender" style={{ display: "block" }}>
            <option defaulValue="choose-your-option" disabled>
              Choose Your Gender
            </option>
            <option
              defaulValue="male"
              selected={this.props.gender === "male" ? true : false}
            >
              Male
            </option>
            <option
              defaulValue="female"
              selected={this.props.gender === "female" ? true : false}
            >
              Female
            </option>
            <option
              defaulValue="not-say"
              selected={this.props.gender === "not-say" ? true : false}
            >
              Prefer Not To Say
            </option>
          </select>
          <textarea onChange={() => {this.bioChangeHandler()}} name="bio" id="bio" cols="30" rows="10"></textarea>
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
      dispatch(updateProfileInfo(gender, bio, dob, token, userId))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
