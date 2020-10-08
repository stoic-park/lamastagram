import React, { useEffect, useState } from "react";
import "./Home.css";

// Component
// import Post from "../components/Post/Post";
import Posts from "../components/Posts/Posts";
import UploadPost from "../components/UploadPost/UploadPost";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";

// firebase
import { db, auth } from "../firebase";
import firebase from "firebase";

// material-ui
import { Modal, Button, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import AppRouter from "./Router";

// modal - for upload

function Home(props) {
  const [posts, setPosts] = useState([]);
  // console.log(posts);
  // console.log(props.user.displayName);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
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
    <div className="Home">
      <Navbar />
      <main>
        <Header user={props.user} />
        <Posts user={props.user} />
      </main>
    </div>
  );
}

export default Home;
