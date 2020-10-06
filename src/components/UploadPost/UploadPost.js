import React, { useState } from "react";
import { Input, Button } from "@material-ui/core";

// firebase
import { storage, db, auth } from "../../firebase";
import firebase from "firebase";

// CSS
import "./UploadPost.css";

function UploadPost(props) {
  // 스테이트
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  // preview
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  // 함수 - 이미지 파일 선택
  const handleFileChange = (e) => {
    //! 여러장의 이미지를 업로드 할 때는? 일단 보류.
    //! 데이터의 크기 적인 부분에서부터 제한사항 발생.
    //! 그 외에 제한사항들에 대해서 알아보자... 좋은 글감이네

    //! 프리뷰
    let reader = new FileReader();
    let file = e.target.files[0];

    if (e.target.files[0]) {
      // 이미지 미리보기
      reader.onloadend = () => {
        setImage(file);
        setImagePreviewUrl(reader.result);
      };
    }
    reader.readAsDataURL(file);
  };
  // 함수 - 업로드
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function
        console.log(error);
        alert(error.message);
      },
      () => {
        // Complete function
        // storage에 제대로 저장이 됐다면 경로 받아오기..!
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post image inside db
            db.collection("posts").add({
              caption: caption,
              imageUrl: url,
              username: props.username,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            // 완료 후 셋팅
            setProgress(0);
            setCaption("");
            setImage(null);
            props.setOpen(false);
          });
      }
    );
  };

  return (
    <div className="uploadPost">
      <div className="previewForm">
        {imagePreviewUrl ? (
          <img className="previewImage" src={imagePreviewUrl} alt=""></img>
        ) : (
          <div className="previewText">Please select an Image</div>
        )}
      </div>
      <div className="uploadForm">
        {/* <img src={image} alt="" /> */}
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <Button onClick={handleUpload}>Upload</Button>
        <Input
          type="text"
          placeholder="Enter a comment"
          onChange={(event) => setCaption(event.target.value)}
          value={caption}
        />
      </div>
    </div>
  );
}

export default UploadPost;
