import React from "react";
import classes from "./SwitchMode.module.css";

const SwitchMode = (props) => {
  return (
    <button className={classes.SwitchMode} onClick={props.switchMode}>
      {props.theme === "dark" ? (
        <i className="fas fa-sun"></i>
      ) : (
        <i className="fas fa-moon"></i>
      )}
    </button>
  );
};

export default SwitchMode;
