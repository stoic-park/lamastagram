import React, { useEffect, useState } from "react";
// import Gallery from "react-photo-gallery";

// Component
import Post from "./Post/Post";
import "./App.css";

// firebase
import { db, auth } from "./firebase";
import firebase from "firebase";

function App() {
  const [posts, setPosts] = useState([]);
  console.log(posts);

  useEffect(() => {
    db.collection("posts")
      // .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // onSnapshot : every time a new post is added!
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
            // caption: doc.data().caption,
            // imageUrl: doc.data().imageUrl,
            // username: doc.data().username,
          }))
        );
      });
  }, []);

  return (
    <div className="App">
      <center>
        <h1>petstagram</h1>
      </center>
      {/* header - logo, userinfo */}
      {/* navbar - home / mypost* / addPost /}

      {/* posts */}
      <div className="posts">
        {posts.map(({ id, post }) => (
          <Post key={id} src={post.src} />
        ))}
      </div>
    </div>
  );
}

export default App;
