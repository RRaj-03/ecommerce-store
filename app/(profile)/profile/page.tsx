import React from "react";
import { UserProfile } from "@clerk/nextjs";
const ProfilePage = () => {
  return (
    <div>
      <UserProfile routing="path" path="/profile" />
    </div>
  );
};

export default ProfilePage;
