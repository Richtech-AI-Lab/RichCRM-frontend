import React, { useEffect, useState } from "react";
import {
  initializeGapiClient,
  signInToGoogle,
  signOutFromGoogle
} from "./googleMeetFunc";
import { Modal } from 'flowbite-react';
import XButton from "../button/XButton";
import { FiPlus } from "react-icons/fi";

const GoogleMeetModal = ({ onClose }) => {
  const [events, setEvents] = useState([]);

  // Initialize GAPI client on component mount
  useEffect(() => {
    initializeGapiClient();
  }, []);

  // Handle sign-in
  const handleSignIn = async () => {
    try {
      await signInToGoogle();
      alert("Signed in successfully!");
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  // Handle sign-out
  const handleSignOut = () => {
    signOutFromGoogle();
    alert("Signed out successfully!");
  };

  // Create a new event
  const handleCreateEvent = async () => {
    const newEvent = {
      summary: "React Event",
      description: "This is a test event created in React",
      start: {
        dateTime: new Date().toISOString(),
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
        timeZone: "America/Los_Angeles",
      },
    };
  };
  return (
    <Modal show={true} size="md" onClose={onClose} className="new-case-modal calendar-modal">
      <Modal.Header className="border-b-0">
        <h2 className="text-4 font-medium text-secondary-800">Schedule Google Meet</h2>
      </Modal.Header>
      <Modal.Body className="pt-3">
        <div>
          <h1>Google Calendar API Integration</h1>
          <div className="flex justify-between items-center mb-6">
            <div className="grid gap-2">
              <XButton
                text="Sign In"
                icon={<FiPlus className="text-base mr-2 inline-block" />}
                className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium ml-4"
                onClick={handleSignIn}
              />
              <XButton
                text="Sign Out"
                icon={<FiPlus className="text-base mr-2 inline-block" />}
                className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium ml-4"
                onClick={handleSignOut}
              />
              <XButton
                text="Create Event"
                icon={<FiPlus className="text-base mr-2 inline-block" />}
                className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium ml-4"
                onClick={handleCreateEvent}
              />
            </div></div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default GoogleMeetModal;
