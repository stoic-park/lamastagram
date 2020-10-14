import React, { useEffect, useState } from "react";
import "./ProfilePosts.css";
import ProfilePost from "./ProfilePost/ProfilePost";
// firebase
import { db, auth } from "../../firebase";
import firebase from "firebase";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

//! 내가 작성한 글 모아보기
// => 1) 모든 포스트를 불러와서 클라이언트 사이드에서 내 user.displayName과 같을 경우 나타내는 방법... 비 효율적
// => 2) 특정 쿼리문을 활용해서 서버사이드에서 내 포스트만 보내주는 방법.. 이건 아직 모름

function ProfilePosts({ user }) {
  const [myPosts, setMyPosts] = useState([]);
  const classes = useStyles();
  //   console.log(myPosts);
  //   console.log(user.displayName);

  useEffect(() => {
    db.collection("posts")
      //   .where("username", "==", user.displayName)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // onSnapshot : every time a new post is added!

        setMyPosts(
          snapshot.docs.map(
            (doc) =>
              user.displayName === doc.data().username && {
                id: doc.id,
                myPost: doc.data(),
              }
          )
        );
      });
  }, []);

  return (
    <Container className={classes.cardGrid} maxWidth="xl">
      <div className="profilePostsHeader">내가 올린 글</div>
      <Grid container spacing={4}>
        {myPosts.map(
          ({ id, myPost }) =>
            myPost && (
              // 필요한 데이터가 뭐가 있을까?
              <ProfilePost
                key={id}
                postId={id}
                imageUrl={myPost.imageUrl}
                caption={myPost.caption}
                username={myPost.username}
                user={user}
                avatar={myPost.avatar}
              />
            )
        )}
      </Grid>
    </Container>
  );
}

export default ProfilePosts;
