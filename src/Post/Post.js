import React, { useState, useEffect } from "react";
// material-ui
import { Modal, Button, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// about Modal
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

function Post(props) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [open, setOpen] = useState(false);
  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}></div>
      </Modal>
      <img
        key={props.id}
        onClick={() => setOpen(true)}
        className="item"
        src={props.src}
        alt=""
        width="500px"
      />
    </div>
  );
}

export default Post;
