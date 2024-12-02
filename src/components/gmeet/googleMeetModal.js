import React, { useEffect, useState } from "react";
import {
  initializeGapiClient,
  signInToGoogle,
  signOutFromGoogle,
  fetchUpcomingEvents,
  createCalendarEvent,
} from "./googleMeetFunc";
import { Label, Modal } from 'flowbite-react';
import XButton from "../button/XButton";
import { FiPlus } from "react-icons/fi";
import { Formik } from "formik";
import TextInput from "../TextInput";
import DateTimeInput from "../dateTimePicker";
import { toast } from "react-toastify";

const GoogleMeetModal = ({ onClose, title}) => {
  const [events, setEvents] = useState([]);
  const [auth, setAuth] = useState(false);
  // Initialize GAPI client on component mount
  useEffect(() => {
    initializeGapiClient();
  }, []);

    // Initialize GAPI client and handle persisted auth
    useEffect(() => {
      const initGapi = async () => {
        try {
          const isSignedIn = await initializeGapiClient();
          const persistedAuth = localStorage.getItem("googleAuth") === "true";
          if (isSignedIn || persistedAuth) {
            setAuth(true);
          }
        } catch (error) {
          console.error("Failed to initialize GAPI client: ", error);
        }
      };
      initGapi();
    }, []);
  
    const handleSignIn = async () => {
      try {
        await signInToGoogle();
        setAuth(true);
        toast.success("Signed In!");
      } catch (error) {
        console.error("Sign-in failed: ", error);
        setAuth(false);
      }
    };
  
    const handleSignOut = () => {
      signOutFromGoogle();
      setAuth(false);
      toast.success("Signed Out!");
    };

  // Handle sign-in
  // const handleSignIn = async () => {
  //   try {
  //     await signInToGoogle();
  //     setAuth(true)
  //     toast.success("Sign In!");
  //   } catch (error) {
  //     console.error("Sign-in failed:", error);
  //     setAuth(false)
  //   }
  // };

  // // Handle sign-out
  // const handleSignOut = () => {
  //   signOutFromGoogle();
  //   // alert("Signed out successfully!");
  //   setAuth(false)
  //   toast.success("Sign Out!");
  // };



  const handleFetchEvents = async () => {
    try {
      const fetchedEvents = await fetchUpcomingEvents(); // Ensure this returns an array of events
      console.log("Fetched Events:", fetchedEvents); // Debug log
      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  // Create a new event
  const handleCreateEvent = async (values, { resetForm }) => {
    if (values.title && values.description && values.endTime && values.startTime) {
      const newEvent = {
        summary: values.title,
        description: values.description,
        start: {
          dateTime: values.startTime,
          // timeZone: "America/Los_Angeles",
        },
        end: {
          dateTime: values.endTime,
          // timeZone: "America/Los_Angeles",
        },
        attendees: [
          // { email: "example1@yopmail.com" },
          // { email: "example2@yopmail.com" }, // Add attendees if needed
        ],
        conferenceData: {
          createRequest: {
            requestId: "sample123", // Unique ID to avoid duplication
            conferenceSolutionKey: {
              type: "hangoutsMeet", // Type of conference (Google Meet)
            },
            status: {
              statusCode: "success",
            },
          },
        },
      };

      try {
        const createdEvent = await createCalendarEvent(newEvent);

        if (createdEvent.conferenceData) {
          console.log(createdEvent,"createdEvent")
          const { htmlLink } = createdEvent; // Extract the Google Calendar event link

          // Open the Google Calendar event in a new tab
          window.open(htmlLink, '_blank');
  
          // const { summary, start, end, description, location } = createdEvent;

          // const startDate = new Date(start).toISOString().replace(/-|:|\.\d+/g, '');
          // const endDate = new Date(end).toISOString().replace(/-|:|\.\d+/g, '');
  
          // const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
          //   summary
          // )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
          //   description
          // )}&location=${encodeURIComponent(location)}`;
  
          // // Open in new tab
          // window.open(googleCalendarUrl, '_blank');
          toast.success("Meeting created!");
          resetForm()
          onClose()
          // alert(`Google Meet Link: ${createdEvent.conferenceData.entryPoints[0].uri}`);
        }
      } catch (error) {
        toast.error("Something went wrong!");
        console.error("Failed to create event:", error);
      }
    }
  };

  const initialValues = {
    title: title,
    description: "",
    startTime: null,
    endTime: null
  }

  return (
    <Modal show={true} size="md" onClose={onClose} className="new-case-modal">
      <Modal.Header className="border-b-0">
        <h2 className="text-4 font-medium text-secondary-800">Add Meeting</h2>
      </Modal.Header>
      <Modal.Body className="pt-3">
        <div>

          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={handleCreateEvent}
            enableReinitialize
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue
            }) => (

              <form onSubmit={handleSubmit} className="">
                <div className="block">

                  <div className="grid grid-cols-2 mt-3">
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
                    {/* <XButton
                      text="Fetch Events"
                      icon={<FiPlus className="text-base mr-2 inline-block" />}
                      className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium ml-4"
                      onClick={handleFetchEvents}
                    />
                    <XButton
                      text="Create Event"
                      icon={<FiPlus className="text-base mr-2 inline-block" />}
                      className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium ml-4"
                      onClick={handleCreateEvent}
                    /> */}
                  </div>
                  {auth?<>
                  <TextInput
                  name="title"
                    type="text"
                    placeholder="Title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    field={{ name: "title" }}
                    form={{ errors, touched }}
                    data-lpignore="true"
                    />
                  <TextInput
                    name="description"
                    type="text"
                    placeholder="Description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    field={{ name: "description" }}
                    form={{ errors, touched }}
                    data-lpignore="true"
                    />
                    </>
                    :<>
                    </>
                  }
                    
                </div>
                
               { auth && <>
               <div className="grid grid-cols-2 mt-3">
                  <DateTimeInput
                    name="startTime"
                    value={values.startTime}
                    placeHolder="Select Start Time"
                    onSelectedDateChanged={(date) => setFieldValue("startTime", date)}

                  />
                  <DateTimeInput
                    name="endTime"
                    value={values.endTime}
                    placeHolder="Select End Time"
                    onSelectedDateChanged={(date) => setFieldValue("endTime", date)}

                  />

                </div>
                <div className="text-end mt-8">
                  <XButton
                    text={"Cancel"}
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="bg-card-300 text-sm text-primary2 py-[10px] px-6 rounded-[100px]"
                  />
                  <XButton
                    type="submit"
                    text={"Create"}
                    disabled={isSubmitting}
                    className="bg-primary text-sm text-white py-[10px] px-6 rounded-[100px] ml-4"
                  />
                </div></>}
              </form>
            )}
          </Formik>

          {/* <h1>Google Calendar API Integration</h1>
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
                text="Fetch Events"
                icon={<FiPlus className="text-base mr-2 inline-block" />}
                className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium ml-4"
                onClick={handleFetchEvents}
              />
              <XButton
                text="Create Event"
                icon={<FiPlus className="text-base mr-2 inline-block" />}
                className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium ml-4"
                onClick={handleCreateEvent}
              />
            </div>
          </div> */}


          {/* <h2>Upcoming Events:</h2>
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                <strong>{event.summary}</strong> - {event.start.dateTime || event.start.date}
              </li>
            ))}
          </ul> */}


        </div>
      </Modal.Body>
    </Modal>
  );
};

export default GoogleMeetModal;
