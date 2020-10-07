import React, { useState, useEffect } from "react";
import "./Post.css";
// material-ui
import { Modal, Button, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

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
    width: 600,
    height: 800,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    // width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

function Post({ key, postId, imageUrl, caption, username, user }) {
  // modal
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  console.log(user);

  // 댓글 기능 추가
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  // console.log(comments);

  // 댓글 받아오기
  // 파이어베이스에서 컬렉션 추가하는것도 신기하넹
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

  // 함수 - 댓글 달기
  const handlePostComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      comment: comment,
      // username: props.username,
      // 로그인한 유저네임이 들어가야지?
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <Grid item key={key} xs={12} sm={6} md={6} lg={4}>
      {/* <div className="post"> */}
      {/* 이미지 선택시 이미지 및 설명, 댓글 등을 볼 수 있다, 사실상 본체 */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <img src={imageUrl} alt="" width="300px" />
          <p>{caption}</p>
          <div className="post_comments">
            {/* key? */}
            {comments.map(({ id, comment }) => (
              <p key={id}>
                <strong>{comment.username}</strong> {comment.comment}
              </p>
            ))}
          </div>

          {user && (
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
          )}
        </div>
      </Modal>

      {/* 이미지 클릭 시 모달창 오픈 */}
      {/* <div className="cover_image">
        <img
          key={props.id}
          onClick={() => setOpen(true)}
          className="post_item"
          src={props.imageUrl}
          alt=""
          sizes="404px"
          width="404px"
          // height="400px"
        />
      </div> */}
      {/* </div> */}

      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          onClick={() => setOpen(true)}
          image={imageUrl}
          title="Image title"
        />

        <CardActions>
          <Typography>nickname</Typography>
          <Button size="small" color="primary">
            like
          </Button>
          <Button size="small" color="primary">
            view
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default Post;
