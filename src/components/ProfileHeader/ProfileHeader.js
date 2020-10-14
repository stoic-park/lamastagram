import React from "react";
import { Modal, Button, Input, Avatar } from "@material-ui/core";
import "./ProfileHeader.css";

function ProfileHeader({ user }) {
  // console.log(user);
  return (
    <div className="profileHeader_container">
      <div className="profileHeader_infoBox">
        <div className="profileHeader_infoBox_avatar">
          {/* avatar, name, nickname */}
          {user.photoURL ? (
            <Avatar alt="Remy Sharp" src={user.photoURL} />
          ) : (
            <Avatar alt="Remy Sharp" src="s">
              ?
            </Avatar>
          )}
        </div>
        <div className="profileHeader_username">{user.displayName}</div>
        <div className="profileHeader_email">{user.email}</div>
      </div>
    </div>
  );
}

export default ProfileHeader;
