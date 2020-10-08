import React, { useState } from "react";
import "./Header.css";

// firebase
import { db, auth } from "../../firebase";
import firebase from "firebase";

// uploadPost
import UploadPost from "../UploadPost/UploadPost";

// material-ui
import { Modal, Button, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

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

function Header({ user }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  return (
    <div className="app_header">
      {/* modal - uploadPost */}
      {user?.displayName ? (
        <Modal open={open} onClose={() => setOpen(false)}>
          <div style={modalStyle} className={classes.paper}>
            <UploadPost username={user.displayName} setOpen={setOpen} />
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
      {/* <center>
        <button>HOME</button>
        <button>MY</button>
        <button onClick={() => setOpen(true)}>ADD POST</button>
        <button onClick={() => auth.signOut()}>Log Out</button>
      </center> */}
      <div className="sub_header">
        <div className="sub_header_title">
          <Typography variant="h2">Lamastagram.</Typography>
        </div>
        <div className="sub_header_subtitle">
          <Typography variant="h3">subtitle.</Typography>
        </div>
      </div>
    </div>
  );
}

export default Header;
