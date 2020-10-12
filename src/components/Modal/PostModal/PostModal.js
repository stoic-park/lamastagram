import React, { useState, useEffect } from "react";
import "./PostModal.css";
import {
  Modal,
  Button,
  Input,
  Avatar,
  Grid,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { db } from "../../../firebase";
import firebase from "firebase";

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
    width: "60%",
    height: 800,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

function PostModal({
  imageUrl,
  caption,
  user,
  postId,
  username,
  open,
  setOpen,
}) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(
            // snapshot.docs.map((doc) => ({
            //   id: doc.id,
            //   comment: doc.data(),
            // }))
            snapshot.docs.map((doc) => ({
              id: doc.id,
              comment: doc.data(),
            }))
          );
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const handlePostComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      comment: comment,
      avatar: user.photoURL,
      // username: props.username,
      // 로그인한 유저네임이 들어가야지?
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Container maxWidth="xl">
        <Grid
          container
          spacing={12}
          xs={12}
          sm={12}
          md={8}
          lg={8}
          // style={modalStyle}
          // className={classes.paper}
          className="post_modal_container"
        >
          <div className="post_modal">
            <div className="post_modal_left">
              <img
                className="post_modal_left_image"
                src={imageUrl}
                alt=""
                width="100%"
              />
            </div>
            <div className="post_modal_right">
              <div className="post_modal_right_info">
                <div className="post_modal_right_info_user">
                  {user.photoURL ? (
                    <Avatar
                      className={classes.avatar}
                      alt="Remy Sharp"
                      src={user.photoURL}
                    />
                  ) : (
                    <Avatar className={classes.avatar}>H</Avatar>
                  )}
                  <div className="post_modal_username">{username}</div>
                </div>
                <p className="post_modal_caption">{caption}</p>
              </div>
              <div className="post_modal_right_commentsBox">
                <div className="post_modal_right_commentsBox_comments">
                  <p className="p_mgbot20px">댓글을 남겨보세요!</p>
                  {user && (
                    <form className="post_modal_right_commentsBox_commentInput">
                      {user.photoURL ? (
                        <Avatar
                          className={classes.avatar}
                          alt="Remy Sharp"
                          src={user.photoURL}
                        />
                      ) : (
                        <Avatar className={classes.avatar}>H</Avatar>
                      )}
                      <div className="post_modal_right_commentBox_commentInput_rightbox">
                        <Input
                          className="post_input"
                          type="text"
                          placeholder="Add a Comment!"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                        <Button
                          className="post_button"
                          disabled={!comment}
                          type="submit"
                          onClick={handlePostComment}
                        >
                          Post
                        </Button>
                      </div>
                    </form>
                  )}
                  {/* key? */}
                  {comments.map(({ id, comment }) => (
                    <div className="commentBox">
                      <div className="commentBox_comment" key={id}>
                        <Avatar
                          className={classes.avatar}
                          alt="Remy Sharp"
                          src={comment.avatar}
                        />
                        <strong className="strong_pl10px">
                          {comment.username}
                        </strong>
                        <p className="p_lp10px"> {comment.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Container>
    </Modal>
  );
}

export default PostModal;
