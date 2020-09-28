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

function Home(props) {
  const [posts, setPosts] = useState([]);
  // console.log(posts);
  // console.log(props.user.displayName);
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
      {props.user?.displayName ? (
        <Modal open={open} onClose={() => setOpen(false)}>
          <div style={modalStyle} className={classes.paper}>
            <UploadPost username={props.user.displayName} setOpen={setOpen} />
          </div>
        </Modal>
      ) : (
        <Modal open={open} onClose={() => setOpen(false)}>
          <div style={modalStyle} className={classes.paper}>
            <center className="infor">
              <strong>회원가입 후 글을 올려보세요!</strong>
            </center>
          </div>
        </Modal>
      )}

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
          <button onClick={() => auth.signOut()}>Log Out</button>
        </center>
      </div>

      {/* navbar - home / mypost* / addPost /}

      {/* posts */}
      <div className="posts">
        {posts.map(({ id, post }) => (
          // 필요한 데이터가 뭐가 있을까?
          <Post
            key={id}
            postId={id}
            imageUrl={post.imageUrl}
            caption={post.caption}
            username={post.username}
            user={props.user}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
