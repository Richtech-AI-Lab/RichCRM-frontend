import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { TextInput, XButton, XSpinnerLoader } from "../../components";
import { HiOutlineLogout } from "react-icons/hi";
import { IMAGES } from "../../constants/imagePath";
import detectIncognito from "detectincognitojs";
import { toast } from "react-toastify";
import {
  checkGoogleSignInStatus,
  fetchUpcomingEvents,
  getCurrentUserProfile,
  signInToGoogle,
  signOutFromGoogle,
} from "../gmeet/googleMeetFunc";

export const GoogleSetting = ({ title }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [auth, setAuth] = useState(false);
  const [profileData, setProfileData] = useState({});
  const authenticateAndFetchEvents = async () => {
    try {
      setIsLoading(true);
      const isSignedIn = await checkGoogleSignInStatus(); // Custom function to check sign-in status
      // console.log(isSignedIn,"isSignedIn")
      if (isSignedIn) {
        setAuth(true);
        setIsLoading(false);
      } else {
        setAuth(false);
        setIsLoading(false);
      }
    } catch (err) {
      setAuth(false);
      setIsLoading(false);
      console.error("Error during sign-in or fetching events:", err);
    }
  };
  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInToGoogle();
      setAuth(true);
      toast.success("Signed In!");
    } catch (error) {
      console.error("Sign-in failed:", error);
      setAuth(false);
      toast.error("Failed to sign in!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      signOutFromGoogle();
      setAuth(false);
      toast.success("Signed Out!");
    } catch (error) {
      console.error("Sign-out failed:", error);
      toast.error("Failed to sign out!");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    detectIncognito().then((result) => {
      // console.log(result.browserName, result.isPrivate);
      if (result.isPrivate) {
        toast.info(
          "Please use a regular browser tab to sign in and access Google Calendar."
        );
      } else {
        authenticateAndFetchEvents();
      }
    });
    // window.onload = authenticateAndFetchEvents();
  }, []);

  useEffect(() => {
    if (auth) {
      setProfileData(getCurrentUserProfile());
    } else {
      setProfileData({});
    }
  }, [auth]);

  return (
    <>
      <XSpinnerLoader loading={isLoading} size="lg" />
      <div className="bg-white rounded-2xl mb-5 shadow-card ">
        {true && (
          <div className="flex flex-col p-4 justify-center items-start gap-2 self-stretch">
            <span className="text-base font-bold">Google</span>
            {/* <p className="text-sm font-normal">Mattis amet eu velit viverra aliquet porta at a. Auctor lectus tincidunt facilisis pellentesque maecenas enim sed dolor adipiscing.</p> */}
          </div>
        )}
        
        <div className="flex flex-col px-4 py-3 items-start gap-4 self-stretch">
          <div className="flex flex-col items-start gap-2 self-stretch">
            <span className="text-base font-medium">Calendar Connection</span>
            <p className="text-sm font-normal">
              Add and sync calendar with Google calendar.
            </p>
          </div>
          <div className="flex justify-between items-start self-stretch">
            {auth && (
              <div className="mb-2 flex-1 mr-4">
                <div className="flex items-center cursor-pointer">
                  <img
                    src={profileData?.profilePic || IMAGES.avatarpic}
                    className="w-8 h-8 mr-3 rounded-full"
                    alt="Avatar"
                  />
                  <div>
                    <p className="text-base text-secondary-800">
                      {profileData?.name && profileData?.name}
                    </p>
                    <span className="text-text-gray-100 text-sm">
                      {profileData?.email && profileData?.email}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {auth ? (
              <XButton
              icon={<HiOutlineLogout className="text-base mr-2 inline-block" />}
                type="button"
                text="Sign Out"
                onClick={() => {
                  handleSignOut();
                }}
                className="bg-active-blue text-base text-active-blue-text py-[10px] px-6 rounded-[100px]"
              />
            ) : (
              <XButton
                type="button"
                text="Sign In"
                onClick={() => {
                  handleSignIn();
                }}
                className="bg-active-blue text-base text-active-blue-text py-[10px] px-6 rounded-[100px]"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
