import React, { useEffect, useState } from "react";
import Post from "./Post/Post";
// firebase
import { db, auth } from "../../firebase";
import firebase from "firebase";
// css
import "./Posts.css";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

function Posts({ user }) {
  const [posts, setPosts] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    db.collection("posts")
      // .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // onSnapshot : every time a new post is added!
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  return (
    // <div className="posts">
    <Container className={classes.cardGrid} maxWidth="lg">
      <Grid container spacing={4}>
        {posts.map(({ id, post }) => (
          // 필요한 데이터가 뭐가 있을까?
          <Post
            key={id}
            postId={id}
            imageUrl={post.imageUrl}
            caption={post.caption}
            username={post.username}
            user={user}
          />
        ))}
      </Grid>
    </Container>
  );
}

export default Posts;
