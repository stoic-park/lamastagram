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
// import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import ImageModal from "../ImageModal/ImageModal";

const useStyles = makeStyles((theme) => ({
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
  avatar,
  open,
  setOpen,
}) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const classes = useStyles();
  // const [modalStyle] = useState(getModalStyle);
  const [openImage, setOpenImage] = useState(false);

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
    // console.log(comments);

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

  // update & delete
  const handleCommentUpdate = ({ id }) => {
    // db.collection("posts").doc(postId).collection("comments").set({
    //   comment: input,
    // }, {
    //   merge: true
    // });
  };

  const handleCommentDelete = ({ id }) => {
    db.collection("posts").doc(postId).collection("comments").doc(id).delete();
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Container spacing={12} maxWidth="xl">
        <Grid
          key={postId}
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          className="post_modal_container"
        >
          <ImageModal
            imageUrl={imageUrl}
            open={openImage}
            setOpen={setOpenImage}
          />
          <div className="post_modal">
            <div className="post_modal_left">
              <img
                className="post_modal_left_image"
                src={imageUrl}
                alt=""
                width="100%"
                onClick={() => setOpenImage(true)}
              />
              {/* <AspectRatioIcon className="icon_aspectratio" /> */}
            </div>
            <div className="post_modal_right">
              <div className="post_modal_right_info">
                <div className="post_modal_right_info_user">
                  <Avatar className={classes.avatar} src={avatar}></Avatar>
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
                        <Avatar className={classes.avatar}></Avatar>
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
                    <div key={id} className="commentBox">
                      {/* comment.username 과 user.displayName이 같을 경우 삭제 버튼 */}
                      {user.displayName === comment.username ? (
                        <div className="commentBox_comment">
                          <Avatar
                            className={classes.avatar}
                            alt="Remy Sharp"
                            src={comment.avatar}
                          />
                          <strong className="strong_pl10px">
                            {comment.username}
                          </strong>
                          <p className="p_lp10px"> {comment.comment}</p>
                          {/* <button>update</button> */}
                          <HighlightOffIcon
                            fontSize="small"
                            className="icon_delete_comment"
                            onClick={() => handleCommentDelete({ id })}
                          />
                          {/* <button onClick={() => handleCommentDelete({ id })}>
                            delete
                          </button> */}
                        </div>
                      ) : (
                        <div className="commentBox_comment">
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
                      )}
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
