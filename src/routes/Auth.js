import React, { useState } from "react";
// firebase
import { db, auth } from "../firebase";
import firebase from "firebase";

// material-ui
import {
  Modal,
  Button,
  Input,
  TextField,
  FormControlLabel,
  Container,
  Typography,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//
import "./Auth.css";
import SignUpModal from "../components/Modal/SignUpModal/SignUpModal";

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
  // const [username, setUsername] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [openSignUpModal, setOpenSignUpModal] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
  };
  // console.log(username);
  // var provider = new auth.GoogleAuthProvider();
  var provider = new firebase.auth.GoogleAuthProvider();

  // sign-in Email function
  const signInEmail = (event) => {
    event.preventDefault();

    // power simple.. 더 간단하네?
    auth
      .signInWithEmailAndPassword(loginEmail, loginPassword)
      .catch((error) => alert(error.message));
    setLoginEmail("");
    setLoginPassword("");
  };

  const onChange = (event) => {
    // console.log(event.target.name);
    // const {target: {name, value}} = event;
    const { name, value } = event.target;
    if (name === "email") {
      setLoginEmail(value);
    } else if (name === "password") {
      setLoginPassword(value);
    }
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
    <Container className="auth_container" maxWidth="xs">
      <SignUpModal
        openSignUpModal={openSignUpModal}
        setOpenSignUpModal={setOpenSignUpModal}
      />
      {/* header - app name */}
      <div className="auth_inputbox">
        <center>
          <Typography component="h1" variant="h5">
            lamastagram
          </Typography>
        </center>

        <form className="auth_formbox" onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={loginEmail}
            onChange={onChange}
          />
          {/* <Input
            name="email"
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={onChange}
          /> */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            autoComplete="password"
            autoFocus
            value={loginPassword}
            onChange={onChange}
            type="password"
          />
          {/* <Input
            name="password"
            type="password"
            placeholder="Password"
            required={password}
            onChange={onChange}
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            // value="Log In"
            color="primary"
            onClick={signInEmail}
          >
            Sign In
          </Button>
        </form>
      </div>
      <div className="auth_anotherbox">
        <Button onClick={() => setOpenSignUpModal(true)}>Sign Up</Button>
        <Button onClick={signUpGoogle}>Continue with GOOGLE</Button>
      </div>
    </Container>
  );
}

export default Auth;
