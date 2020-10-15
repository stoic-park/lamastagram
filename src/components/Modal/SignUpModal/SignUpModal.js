import React, { useState } from "react";
import "./SignUpModal.css";

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

// main function
function SignUpModal({ openSignUpModal, setOpenSignUpModal }) {
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
      <Container spacing={12} maxWidth="xl">
        <div className="signup_container">
          <div className="signup_header">회원 가입</div>
          <form className="app_signup">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="email"
              // placeholder="email"
              id="email"
              label="이메일 주소"
              autoComplete="email"
              autoFocus
              // type="text"
              value={email}
              onChange={onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              // placeholder="password"
              id="password"
              label="비밀 번호"
              type="password"
              autoComplete="password"
              autoFocus
              value={password}
              onChange={onChange}
            />

            <Button type="submit" onClick={signUpEmail}>
              signUp
            </Button>
          </form>
        </div>
      </Container>
    </Modal>
  );
}

export default SignUpModal;
