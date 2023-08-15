"use client";
import React, { useEffect, useState } from "react";
import { UserProfile } from "@clerk/nextjs";
const ProfilePage = () => {
  const [style, setStyle] = useState(``);
  useEffect(() => {
    setStyle(`
    .cl-card > div:last-child{
      display:none !important
    }`);
  }, []);

  return (
    <div>
      <style>{style}</style>
      <UserProfile
        appearance={{
          elements: {
            navbar: {
              display: "none !important",
            },
            card: {
              boxShadow: "none !important",
              width: "100%",
              margin: "0",
            },
            pageScrollBox: {
              paddingTop: "0",
            },
            rootBox: {
              width: "100%",
            },
            navbarMobileMenuRow: {
              display: "none !important",
            },
          },
        }}
      />
    </div>
  );
};

export default ProfilePage;
