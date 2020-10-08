import React from "react";
import "./Navbar.css";
import InputBase from "@material-ui/core/InputBase";
import Input from "@material-ui/core/Input";

function Navbar() {
  return (
    <div className="app_navbar">
      <div className="navbar_container">
        <div className="navbar_logo_container">
          <div>LAMASTAGRAM</div>
        </div>
        <div className="navbar_search_container">
          <Input placeholder="Search…" />
        </div>
        <div className="navbar_right_container">
          <li>mypage</li>
          <li>addpost</li>
          <li>logout</li>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
