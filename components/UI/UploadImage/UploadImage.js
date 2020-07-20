import React from "react";
import classes from "./UploadImage.module.css";

const UploadImage = (props) => {
  return (
    <div className={classes.ImageRoot}>
      <button
        className={classes.CloseButton}
        type="button"
        onClick={props.delete}
      >
        <i className="fas fa-times"></i>
      </button>
      <img
        src={props.imageUrl}
        alt={props.imageAlt}
        className={classes.image}
      />
    </div>
  );
};

export default UploadImage;
