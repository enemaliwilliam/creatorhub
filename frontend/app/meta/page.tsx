"use client";

import styles from "@/app/page.module.css";
import { useEffect, useState } from "react";
import { SignIn } from "./components/sign-in";
import type { AppProps } from "next/app";
import { useSession } from "next-auth/react";
import { SignOut } from "./components/sign-out";

export default function Meta() {
  const session = useSession();
  const [userProfile, setUserProfile] = useState(null);
  const getUserProfile = async () => {
    try {
      // Fetch Facebook pages connected to the user
      let response = await fetch(
        `https://graph.facebook.com/v20.0/me/accounts?access_token=${session.data?.accessToken}`
      );
      let data = await response.json();
      console.log("Page Data:", data);

      if (data.data && data.data.length > 0) {
        const pageId = data.data[0].id;

        // Fetch Instagram Business Account ID linked to the Facebook page
        response = await fetch(
          `https://graph.facebook.com/v20.0/${pageId}?fields=instagram_business_account&access_token=${session.data?.accessToken}`
        );
        data = await response.json();
        const instagramBusinessAccountId = data.instagram_business_account.id;

        // Fetch Instagram profile information
        response = await fetch(
          `https://graph.facebook.com/v20.0/${instagramBusinessAccountId}?fields=username,followers_count,follows_count,media_count&access_token=${session.data?.accessToken}`
        );
        const profileData = await response.json();
        console.log("Profile Data:", profileData);

        // Fetch recent media information
        response = await fetch(
          `https://graph.facebook.com/v20.0/${instagramBusinessAccountId}/media?fields=id,caption,like_count,comments_count&access_token=${session.data?.accessToken}`
        );
        const mediaData = await response.json();
        console.log("Recent Media Engagement Data:", mediaData.data);
        setUserProfile(profileData.data.username);
      } else {
        console.log("No pages found for this user.");
        alert("No pages found for this user.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <section className={styles.hero}>
        <h1>Meta Demo</h1>

        {session?.data && (
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-3">
              <p className="font-bold">Name:</p>
              <p className="font-bold text-gray-800">
                {session.data?.user?.name}
              </p>
            </div>
            <div className="grid grid-cols-3">
              <p className="font-bold">Email:</p>
              <p className="font-bold text-gray-800">
                {session.data?.user?.email}
              </p>
            </div>
            <div className="grid grid-cols-3">
              <p className="font-bold">ID:</p>
              <img
                src={
                  session?.data?.user?.image ??
                  "https://source.boringavatars.com/marble/120"
                }
                alt="User Avatar"
              />
            </div>
            <div className="grid grid-cols-3">
              <p className="font-bold"></p>
              <button
                className="p-2 font-bold bg-red-300 rounded-md"
                onClick={getUserProfile}
              >
                Get Detailed Profile
              </button>
            </div>
            {userProfile && (
              <div className="grid grid-cols-3">
                <p className="font-bold">Instagram Username:</p>
                <p>{userProfile}</p>
              </div>
            )}

            {session?.data && session?.data?.user?.email !== null ? (
              <SignOut />
            ) : (
              <SignIn />
            )}
          </div>
        )}
      </section>
    </>
  );
}
