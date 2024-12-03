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
import { useSelector } from "react-redux";
import { IoIosClose } from "react-icons/io";
import avatar from '../../assets/images/contact_avtar.png'

const GoogleMeetModal = ({ onClose, title }) => {
  const { casesData } = useSelector((state) => state.case);
  const caseObj = casesData?.cases?.find(item => item.caseId === localStorage.getItem('c_id'));
  const { client, additionalClient } = useSelector((state) => state.client);
  const clientObj = client?.data?.length > 0 ? client?.data : [];
  const { organization, additionalOrganization } = useSelector((state) => state.organization);
  const organizationObj = organization?.data?.length > 0 ? organization?.data : [];
  const [events, setEvents] = useState([]);
  const [auth, setAuth] = useState(false);
  const [toEmail, setToEmail] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize GAPI client on component mount
  useEffect(() => {
    initializeGapiClient();
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(inputValue)) {
      setToEmail((prevEmails) => [...prevEmails, inputValue]);
      setInputValue('');
    }
  };
  const removeToEmail = (index) => {
    const updatedEmails = toEmail.filter((_, i) => i !== index);
    setToEmail(updatedEmails);
  }
  useEffect(() => {
    const isClientTypeIndividual = caseObj?.clientType === 0;
    const targetObj = isClientTypeIndividual ? clientObj : organizationObj;
    const additionalData = isClientTypeIndividual ? additionalClient : additionalOrganization;

    let emailArray = [];

    if (targetObj?.length > 0) {
      // Extract the main target email
      const mainEmail = targetObj[0]?.email;
      if (mainEmail) {
        emailArray.push(mainEmail);
      }

      // Extract emails from additional data if available
      if (additionalData?.length > 0) {
        const additionalEmails = additionalData
          .map(item => item.email)
          .filter(email => email); // Filter out undefined/null emails
        emailArray = [...emailArray, ...additionalEmails];
      }

      if (emailArray.length > 0) {
        setToEmail(emailArray);
      } else {
        toast.error("Please update client email, No email exists!");
      }
    } else {
      toast.error("No primary client or organization found!");
    }
  }, []);
  // Initialize GAPI client and handle persisted auth
  useEffect(() => {
    const initGapi = async () => {
      setIsLoading(true);
      try {
        const isSignedIn = await initializeGapiClient();
        const persistedAuth = localStorage.getItem("googleAuth") === "true";
        if (isSignedIn || persistedAuth) {
          setAuth(true);
        }
      } catch (error) {
        console.error("Failed to initialize GAPI client:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initGapi();
  }, []);

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
      // console.log("Fetched Events:", fetchedEvents); // Debug log
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
        attendees: toEmail?.map(email => ({ email })),
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
          // console.log(createdEvent, "createdEvent")
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
                  {auth ? <>
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
                    : <>
                    </>
                  }

                </div>


                {auth && <>
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
</>}

                  {auth && 
                  <>
                      <div className="border-b border-b-border py-[6px] items-center">
                      <label className="inline text-sm font-medium text-text-gray-100 mr-2">Participants</label>
                      <ul>
                        {toEmail?.map((item, index) =>
                          <li className="flex items-center justify-between p-2 bg-bg-gray-300 rounded-full mb-2">
                            <div className='flex items-center'>
                              <img src={avatar} alt="" className="mr-2" />
                              <span className='overflow-hidden'>{item}</span>
                            </div>
                            <IoIosClose size={28} className="text-text-gray-100 cursor-pointer" 
                            onClick={() => removeToEmail(index)} 
                            />
                          </li>
                        )}

                      </ul>
                      <input
                        type="text"
                        className="inline border-0 focus:ring-transparent w-full"
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur} // or use onKeyDown to detect 'Enter' key
                        placeholder="Enter email"
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
                                    </div>
                                    </>
}
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
