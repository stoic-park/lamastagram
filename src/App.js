import React, { useEffect, useState } from "react";

import AppRouter from "./AppRouter";

// firebase
import { storage, db, auth } from "../src/firebase";
import firebase from "firebase";

// material-ui
import { Modal, Button, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
    height: 500,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  // state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  // modal
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  // auth
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in
        console.log(authUser);
        setUser(authUser);
        if (!user.displayName) {
          setOpen(true);
        } else {
          console.log("nickname exist");
        }
        setIsLoggedIn(true);
      } else {
        // user has logged out
        console.log("no user");
        setUser(null);
      }
    });

    return () => {
      // perform some cleanup actions
      unsubscribe();
    };
  }, [user, username]);

  // function
  // 구글 인증 후 앱 안에서 사용할 닉네임 설정
  const handleUsername = () => {
    user.updateProfile({
      displayName: username,
    });
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <Input
            type="text"
            placeholder="input your nickname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button disabled={!username} type="submit" onClick={handleUsername}>
            Post
          </Button>
        </div>
      </Modal>
      <button onClick={() => auth.signOut()}>Log Out</button>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>copy</footer>
    </>
  );
}

export default App;
