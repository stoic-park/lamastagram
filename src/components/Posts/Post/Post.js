import React, { useState, useEffect } from "react";
import "./Post.css";
import PostModal from "../../Modal/PostModal/PostModal";
// material-ui
import { Modal, Button, Input, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// import Container from "@material-ui/core/Container";

import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import { db } from "../../../firebase";
import firebase from "firebase";

// about Modal
// function getModalStyle() {
//   const top = 50;
//   const left = 50;

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

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
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

function Post({ key, postId, imageUrl, caption, username, user, avatar }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  // console.log(user);

  return (
    <Grid item key={key} xs={12} sm={6} md={4} lg={3}>
      <PostModal
        imageUrl={imageUrl}
        caption={caption}
        user={user}
        postId={postId}
        username={username}
        open={open}
        setOpen={setOpen}
      />
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          onClick={() => setOpen(true)}
          image={imageUrl}
          title="Image title"
        />
        {/* <CardActions> */}
        <div className="card_actions">
          <div className="card_actions_left">
            <Avatar className={classes.avatar} alt="Remy Sharp" src={avatar} />
            <Typography className="post_username">{username}</Typography>
          </div>
          <div className="card_actions_right">
            <Button size="small" color="primary">
              like
            </Button>
            <Button size="small" color="primary">
              view
            </Button>
          </div>
        </div>
      </Card>
    </Grid>
  );
}
export default Post;
