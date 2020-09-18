import React, { useState } from "react";
// firebase
import { db, auth } from "../firebase";
import firebase from "firebase";

function Auth() {
  const [username, setUsername] = useState("");
  // console.log(username);
  // var provider = new auth.GoogleAuthProvider();
  var provider = new firebase.auth.GoogleAuthProvider();

  // sign-up function
  const signUp = (event) => {
    // 왜 쓰는지 알제?
    event.preventDefault();

    // power simple
    auth
      .signInWithPopup(provider)
      .then((authUser) => {
        // console.log(authUser);
        // return authUser.user.updateProfile({
        //   displayName: username,
        // });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <center>
      <div>
        <button onClick={signUp}>GOOGLE</button>
      </div>
    </center>
  );
}

export default Auth;
