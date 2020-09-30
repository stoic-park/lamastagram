import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
// firebase
import { db, auth } from "../../firebase";
import firebase from "firebase";
// css
import "./Posts.css";

function Posts({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      // .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // onSnapshot : every time a new post is added!
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <div className="posts">
      {posts.map(({ id, post }) => (
        // 필요한 데이터가 뭐가 있을까?
        <Post
          key={id}
          postId={id}
          imageUrl={post.imageUrl}
          caption={post.caption}
          username={post.username}
          user={user}
        />
      ))}
    </div>
  );
}

export default Posts;
