import React, { useState } from "react";
import { Input, Button } from "@material-ui/core";

// firebase
import { storage, db } from "../firebase";
import firebase from "firebase";

// CSS
import "./UploadPost.css";

function UploadPost() {
  // 스테이트
  const [caption, setCaption] = useState("");

  // 함수
  const handleUpload = (event) => {
    event.preventDefault();
    db.collection("posts").add({
      caption: caption,
      src: "https://source.unsplash.com/random",
      // 시간 ?? 왜 안들어가냐?
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // 완료 후 셋팅
    setCaption("");
  };

  return (
    <div className="uploadPost">
      <Input
        type="text"
        placeholder="Enter a comment"
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
      />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default UploadPost;
