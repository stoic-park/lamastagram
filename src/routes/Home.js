import React, { useEffect, useState } from "react";
import "./Home.css";

// Component
import Post from "../components/Post/Post";
import UploadPost from "../components/UploadPost/UploadPost";

// firebase
import { db, auth } from "../firebase";
import firebase from "firebase";

// material-ui
import { Modal, Button, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import AppRouter from "./Router";

// modal - for upload

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Home() {
  const [posts, setPosts] = useState([]);
  // console.log(posts);
  // modal
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

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
    <div className="Home">
      {/* modal - uploadPost */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <UploadPost />
        </div>
      </Modal>

      {/* header - logo, userinfo */}
      <div className="app_header">
        <center>
          <h1>petstagram</h1>
        </center>
      </div>
      <div className="app_navbar">
        <center>
          <button>HOME</button>
          <button>MY</button>
          <button onClick={() => setOpen(true)}>ADD POST</button>
        </center>
      </div>

      {/* navbar - home / mypost* / addPost /}

      {/* posts */}
      <div className="posts">
        {posts.map(({ id, post }) => (
          <Post key={id} src={post.src} caption={post.caption} />
        ))}
      </div>
    </div>
  );
}

export default Home;
