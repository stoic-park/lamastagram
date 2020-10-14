import React from "react";
import Navbar from "../components/Navbar/Navbar";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
import ProfilePosts from "../components/ProfilePosts/ProfilePosts";

function Profile({ user, setIsLoggedIn }) {
  return (
    <div className="Profile">
      <Navbar setIsLoggedIn={setIsLoggedIn} />
      <main>
        <ProfileHeader user={user} />
        <ProfilePosts user={user} />
      </main>
    </div>
  );
}

export default Profile;
