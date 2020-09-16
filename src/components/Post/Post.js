import React, { useState, useEffect } from "react";
// material-ui
import { Modal, Button, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { db } from "../../firebase";
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
    width: 400,
    height: 500,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Post(props) {
  // modal
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  // 댓글 기능 추가
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  console.log(comments);

  // 댓글 받아오기
  // 파이어베이스에서 컬렉션 추가하는것도 신기하넹
  useEffect(() => {
    let unsubscribe;
    if (props.postId) {
      unsubscribe = db
        .collection("posts")
        .doc(props.postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(
            // snapshot.docs.map((doc) => ({
            //   id: doc.id,
            //   comment: doc.data(),
            // }))
            snapshot.docs.map((doc) => doc.data())
          );
        });
    }

    return () => {
      unsubscribe();
    };
  }, [props.postId]);

  // 함수 - 댓글 달기
  const handlePostComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(props.postId).collection("comments").add({
      comment: comment,
      // username: props.username,
      // 로그인한 유저네임이 들어가야지?
      username: props.user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div>
      {/* 이미지 선택시 이미지 및 설명, 댓글 등을 볼 수 있다, 사실상 본체 */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <img src={props.imageUrl} alt="" width="300px" />
          <p>{props.caption}</p>
          <div className="post_comments">
            {/* key? */}
            {comments.map((comment) => (
              <p>
                <strong>{comment.username}</strong> {comment.comment}
              </p>
            ))}
          </div>
          <form className="post_commentBox">
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
          </form>
        </div>
      </Modal>
      <img
        key={props.id}
        onClick={() => setOpen(true)}
        className="item"
        src={props.imageUrl}
        alt=""
        width="500px"
      />
    </div>
  );
}

export default Post;
