import React from "react";
import Post from "./Post/Post";

const Posts = (props) => {
  return (
    <div>
      {props.posts.reverse().map((post, index) => {
        return (
          <Post
            uploadTime="test"
            key={index}
            postDescription={post.description}
            images={post.images}
          />
        );
      })}
    </div>
  );
};

export default Posts;
