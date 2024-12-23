import React, { useEffect, useState } from "react";
import {
  initializeGapiClient,
  signInToGoogle,
  signOutFromGoogle,
  fetchUpcomingEvents,
  createCalendarEvent,
} from "./googleMeetFunc";
import { Checkbox, Label, Modal, Spinner } from 'flowbite-react';
import XButton from "../button/XButton";
import { FiPlus } from "react-icons/fi";
import { Formik } from "formik";
import TextInput from "../TextInput";
import DateTimeInput from "../dateTimePicker";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { IoIosClose, IoIosLogOut } from "react-icons/io";
import avatar from '../../assets/images/contact_avtar.png'
import { IMAGES } from "../../constants/imagePath";
import NewCaseDropdown from "../newcasedropdown";
import language from "../../constants/language.json";
import ParticipantListEmail from "../composeEmail/participantListEmail";
import { format } from "date-fns";
import DateInput from "../datePicker";

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
  const [showParticipant, setShowParticipant] = useState(false);
  const [allDay, setAllDay] = useState(false);

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
        setAuth(false);
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

  const handleFetchEvents = async () => {
    try {
      const fetchedEvents = await fetchUpcomingEvents(); // Ensure this returns an array of events
      // console.log("Fetched Events:", fetchedEvents); // Debug log
      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  const handleCreateEvents = async (values, { resetForm }) => {
    if (values.title && values.endTime && values.startTime) {
      const isAllDay = allDay; // A flag in your form to determine if it's an all-day event

      const newEvent = {
        summary: values.title,
        description: values.description,
        start: isAllDay
          ? { date: format(values.startTime, "yyyy-MM-dd") }
          : { dateTime: values.startTime },
        end: isAllDay
          ? { date: format(values.endTime, "yyyy-MM-dd") }
          : { dateTime: values.endTime },
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
          const { htmlLink } = createdEvent; // Extract the Google Calendar event link
          window.open(htmlLink, '_blank');
          toast.success("Meeting created!");
          resetForm();
          onClose();
        }
      } catch (error) {
        toast.error("Something went wrong!");
        console.error("Failed to create event:", error);
      }
    } else {
      toast.error("Start time & End time must be filled");
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
        {title && <div className="flex flex-col justify-center items-start gap-2 self-stretch">
          <span className="font-sans text-[28px] font-medium leading-[36px]">Create an Event</span>
          <p className="font-sans text-sm font-normal leading-[20px] tracking-[0.25px]">Create a event by filling the basic information about the event.</p>
        </div>}
      </Modal.Header>
      <Modal.Body className="flex items-center self-stretch p-3 px-4">
        <div className="flex flex-col gap-8 w-full">

          {!auth && <div className="flex flex-col justify-center items-center"><XButton
            text="Sign In"
            icon={<FiPlus className="text-base mr-2 inline-block" />}
            className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium"
            onClick={handleSignIn}
          />
          </div>
          }
          {isLoading ?
            <div className="flex justify-center">
              <Spinner
                size="xl"
                animation="border"
                role="status"
                variant="primary"
              // className={`spinner-${size}`}
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div> : <Formik
              initialValues={initialValues}
              // validationSchema={validationSchema}
              // onSubmit={handleCreateEvent}
              onSubmit={handleCreateEvents}
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

                <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">


                  {auth && <>
                    <div className="flex flex-col items-start gap-4 self-stretch">
                      <label className="text-base font-medium leading-6 tracking-wide">Participants</label>
                      <div className="flex items-start justify-between gap-4 self-stretch bg-bg-gray-200 rounded  px-1 py-1">
                        <ul className="flex flex-col justify-between gap-2">
                          {toEmail?.map((item, index) =>
                            <li className="flex items-start justify-between p-2 bg-white rounded-full ">
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
                        {/* <input
                          type="text"
                          className="inline border-0 focus:ring-transparent bg-bg-gray-200"
                          value={inputValue}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur} // or use onKeyDown to detect 'Enter' key
                          placeholder="Enter email"
                        /> */}
                        {!showParticipant ?
                          <span className="flex w-10 h-10 flex-col justify-center items-center gap-2.5 cursor-pointer" onClick={() => setShowParticipant(true)}>
                            <img src={IMAGES.addIcon} alt="icon" />
                          </span> :
                          <span className="flex w-10 h-10 flex-col justify-center items-center gap-2.5 cursor-pointer" onClick={() => setShowParticipant(false)}>
                            <img src={IMAGES.removeIcon} alt="icon" />
                          </span>}
                      </div>

                      {showParticipant && <ParticipantListEmail meetModal={true} setToEmail={setToEmail} toEmail={toEmail} onClose={() => setShowParticipant(prevState => !prevState)} />}
                      {/* {searchResults?.length > 0 && <SearchListEmail setInputValue={setInputValue} searchResults={searchResults} setSearchResults={setSearchResults} setToEmail={setToEmail} onClose={() => setShowParticipant(prevState => !prevState)} />} */}

                    </div>
                    <div className='flex flex-col gap-4 self-stretch'>
                      <div className={`text-base font-medium leading-6 tracking-wide`}>Event Type</div>
                      <div className={`items-dropdown single-select gray-btn `}  >
                        <NewCaseDropdown
                          defaultLabel="Online Meeting (Google Meet)"
                          name="state"
                          // value={values.state}
                          // onChange={handleChange}
                          // onBlur={handleBlur}
                          options={[]}
                        // field={{ name: "state" }}
                        // form={{ errors, touched }}
                        />
                      </div>
                    </div>
                    <div className="hidden">
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
                    </div>

                    <div className="flex flex-col gap-4 self-stretch">
                      <div className={`text-base font-medium leading-6 tracking-wide`}>Time</div>
                      {!allDay ?
                      <div className="flex flex-row justify-around">
                        <DateTimeInput
                          name="startTime"
                          value={values.startTime}
                          placeHolder="Select Start Time"
                          onSelectedDateChanged={(date) => {
                            setFieldValue("startTime", date);
                            if (date) {
                              const endTime = new Date(date.getTime() + 60 * 60 * 1000); // Add 1 hour
                              setFieldValue("endTime", endTime);
                            }
                          }}
                        />
                        <DateTimeInput
                          name="endTime"
                          value={values.endTime}
                          placeHolder="Select End Time"
                          onSelectedDateChanged={(date) => setFieldValue("endTime", date)}

                        />
                      </div>:
                      <div className="flex flex-row justify-around">
                        <DateInput
                          name="startTime"
                          value={values.startTime}
                          onSelectedDateChanged={(date) => setFieldValue("startTime", date)}
                          placeHolder="Select Start Time"
                        />
                       <DateInput
                          name="endTime"
                          value={values.endTime}
                          onSelectedDateChanged={(date) => setFieldValue("endTime", date)}
                          placeHolder="Select End Time"
                        />
                      </div>}
                      <div className="flex flex-row justify-start">
                        <div className="flex items-start gap-2">
                          <Checkbox checked={allDay}
                            onClick={() => setAllDay(!allDay)} />
                          <Label className="text-secondary-800">
                            All Day
                          </Label>
                        </div>
                      </div>
                    </div>




                    <div className="flex gap-4 justify-end">
                      <XButton
                        text="Sign Out"
                        icon={<IoIosLogOut className="text-base mr-2 inline-block" />}
                        className="bg-badge-red shadow-shadow-light text-sm text-primary2 py-[10px] px-6 rounded-[100px] font-medium ml-4"
                        onClick={handleSignOut}
                      />
                      <XButton
                        text={"Cancel"}
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="bg-card-300 text-sm text-primary2 py-[10px] px-6 rounded-[100px]"
                      />
                      <XButton
                        type="submit"
                        text={"Start Creating"}
                        disabled={isSubmitting}
                        className="bg-primary text-sm text-white py-[10px] px-6 rounded-[100px]"
                      />
                    </div>

                  </>
                  }
                </form>
              )}
            </Formik>}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default GoogleMeetModal;
