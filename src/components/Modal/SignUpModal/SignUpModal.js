import React, { useState } from "react";

// firebase
import { db, auth } from "../../../firebase";
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

// main function
function SignUpModal({ openSignUpModal, setOpenSignUpModal }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [openSignUpModal, setOpenSignUpModal] = useState(false);

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

  return (
    <Modal open={openSignUpModal} onClose={() => setOpenSignUpModal(false)}>
      <div style={modalStyle} className={classes.paper}>
        <form className="app_signup">
          <input
            name="email"
            placeholder="email"
            type="text"
            value={email}
            onChange={onChange}
          />
          <input
            name="password"
            placeholder="password"
            type="password"
            value={password}
            onChange={onChange}
          />

          <button type="submit" onClick={signUpEmail}>
            signUp
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default SignUpModal;
