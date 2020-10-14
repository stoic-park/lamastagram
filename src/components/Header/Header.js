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
import AddIcon from "@material-ui/icons/Add";
import CreateIcon from "@material-ui/icons/Create";

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
            <UploadPost
              username={user.displayName}
              user={user}
              setOpen={setOpen}
            />
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
      {/* <button onClick={() => setOpen(true)}>ADD POST</button> */}
      <div className="sub_header">
        <div className="sub_header_title">
          <Typography variant="h2">Lamastagram.</Typography>
          {/* <h1>Lamastagram.</h1> */}
        </div>
        <div className="sub_header_subtitle">
          {/* <Typography variant="h3">subtitle.</Typography> */}
          {/* <h3>subtitle</h3> */}
        </div>
        <CreateIcon
          fontSize="large"
          className="icon_add_post"
          onClick={() => setOpen(true)}
        />
        {/* <button onClick={() => setOpen(true)}>ADD POST</button> */}
      </div>
    </div>
  );
}

export default Header;
