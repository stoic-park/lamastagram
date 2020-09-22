import React, { useState } from "react";
// firebase
import { db, auth } from "../firebase";
import firebase from "firebase";

function Auth() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // email, password 변화된 스테이트를 동시에!
  const onChange = (event) => {
    // console.log(event.target.name);
    // const {target: {name, value}} = event;
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
  };
  // console.log(username);
  // var provider = new auth.GoogleAuthProvider();
  var provider = new firebase.auth.GoogleAuthProvider();

  // sign-up function
  const signUpGoogle = (event) => {
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
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={onChange}
          />
          <input
            type="password"
            placeholder="Password"
            required={password}
            onChange={onChange}
          />
          <input typ="submit" value="Log In" />
        </form>
        <div>
          <button onClick={signUpGoogle}>Continue with GOOGLE</button>
        </div>
      </div>
    </center>
  );
}

export default Auth;
