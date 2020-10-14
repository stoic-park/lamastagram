import React from "react";
import "./Navbar.css";
import InputBase from "@material-ui/core/InputBase";
import Input from "@material-ui/core/Input";

import { Route, Link } from "react-router-dom";

// firebase
import { db, auth } from "../../firebase";
import firebase from "firebase";

function Navbar() {
  return (
    <div className="app_navbar">
      <div className="navbar_container">
        <div className="navbar_logo_container">
          <div className="navbar_logo_main">
            <Link to="/">LAMASTAGRAM</Link>
          </div>
        </div>
        <div className="navbar_search_container">
          {/* <Input placeholder="Search…" /> */}
        </div>
        <div className="navbar_right_container">
          <li>
            <Link to="/profile">mypage</Link>
          </li>
          {/* <li>addpost</li> */}
          <li>
            <button onClick={() => auth.signOut()}>Log Out</button>
          </li>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
