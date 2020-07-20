import React from "react";

const Post = (props) => {
  return (
    <div>
      <div className="postHeader">
        <img className="profilePhoto" alt="profilePhoto" src={null} />
        <span className="uploadTime">{props.uploadTime}</span>
      </div>
      <div className="postMain">
        <div className="postDescription">{props.postDescription}</div>
        {props.images !== undefined
          ? props.images.map((image, index) => {
              console.log(image);
              return (
                <img
                  src={image}
                  key={image + index}
                  alt="postImage"
                  className="postImages"
                />
              );
            })
          : null}
      </div>
      <div className="postFooter">
        <button className="likeButton">Like</button>
        <button className="commentButton">Comment</button>
        <button className="shareButton">Share</button>
      </div>
    </div>
  );
};

export default Post;
