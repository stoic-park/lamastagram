import React, { useState } from "react";
// firebase
import { db, auth } from "../firebase";
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
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Auth() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSignUpModal, setOpenSignUpModal] = useState(false);

  // email, password 변화된 스테이트를 동시에!
  const onChange = (event) => {
    // console.log(event.target.name);
    // const {target: {name, value}} = event;
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
  };
  // console.log(username);
  // var provider = new auth.GoogleAuthProvider();
  var provider = new firebase.auth.GoogleAuthProvider();

  // sign-up Email function
  const signUpEmail = (event) => {
    // 왜 쓰는지 알제?
    event.preventDefault();

    // power simple
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        // return authUser.user.updateProfile({
        //   displayName: username,
        // });
      })
      .catch((error) => alert(error.message));

    setOpenSignUpModal(false);
    setEmail("");
    setPassword("");
  };

  // sign-in Email function
  const signInEmail = (event) => {
    event.preventDefault();

    // power simple.. 더 간단하네?
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setEmail("");
    setPassword("");
  };

  // sign-up Google function
  const signUpGoogle = (event) => {
    // 왜 쓰는지 알제?
    event.preventDefault();

    // power simple
    auth
      .signInWithPopup(provider)
      .then((authUser) => {
        // console.log(authUser);
        // return authUser.user.updateProfile({
        //   displayName: username,
        // });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <center>
      <Modal open={openSignUpModal} onClose={() => setOpenSignUpModal(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
            <center>
              <img
                // className="app_headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>
            <input
              placeholder="username"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" onClick={signUpEmail}>
              signUp
            </button>
          </form>
        </div>
      </Modal>
      <div>
        <form onSubmit={onSubmit}>
          <Input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={onChange}
          />
          <input
            type="password"
            placeholder="Password"
            required={password}
            onChange={onChange}
          />
          <input type="submit" value="Log In" onClick={signInEmail} />
        </form>
        <div>
          <button onClick={() => setOpenSignUpModal(true)}>Sign Up</button>
          <button onClick={signUpGoogle}>Continue with GOOGLE</button>
        </div>
      </div>
    </center>
  );
}

export default Auth;
