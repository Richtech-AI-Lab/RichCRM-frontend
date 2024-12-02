import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import DetailCaseModal from './detailCaseModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCasesRequest } from '../../../redux/actions/caseAction';
import { fetchUpcomingEvents, signInToGoogle } from '../../../components/gmeet/googleMeetFunc';
import MeetingDetailModal from './meetingDetailModal';

const Calendar = ({ toggleAddReminderModal, filters, selectedCase, setSelectedCase }) => {
  const dispatch = useDispatch();
  const [googleEvents, setGoogleEvents] = useState([]);
  const { cases } = useSelector((state) => state.case.casesData);
  const casesWithDates = cases.filter((caseItem) => caseItem.closingDate || caseItem.mortgageContingencyDate);
  const calendarRef = useRef(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status

  const calendarEvents = casesWithDates.flatMap((caseItem) => [
    filters.closingDue && caseItem.closingDate ? {
      id: `${caseItem.caseId}_Closing Due`,
      title: `Closing Due`,
      start: caseItem.closingDate,
      extendedProps: { caseItem, type: "case" }
    } : null,
    filters.mortgageDue && caseItem.mortgageContingencyDate ? {
      id: `${caseItem.caseId}_Mortgage Due`,
      title: `Mortgage Due`,
      start: caseItem.mortgageContingencyDate,
      extendedProps: { caseItem, type: "case" }
    } : null
  ]).filter(event => event !== null);

  const mapGoogleEvents = (events) =>
    events.map((event) => ({
      id: event.id,
      title: event.summary || "Google Meet Event",
      start: event.start.dateTime,
      end: event.end.dateTime,
      extendedProps: {
        description: event.description || "",
        attendees: event.attendees || [],
        meetLink: event.conferenceData?.entryPoints?.find((entry) => entry.entryPointType === "video")?.uri || "",
        type: "googleMeet",
      },
    }));

  useEffect(() => {
    const fetchAllCases = async () => {
      try {
        const payload = {
          creatorId: localStorage.getItem("authEmail"),
          closed: false,
        };
        dispatch(fetchAllCasesRequest(payload));
      } catch (error) {
        console.error("Error fetching cases:", error);
      }
    };

    const authenticateAndFetchEvents = async () => {
      try {
        // Check if the user is signed in
        await signInToGoogle(); // Custom function to handle Google Sign-In
        // console.log(isSignedIn,"isSignedIn")
        // if (isSignedIn) {
          setIsAuthenticated(true);
          const fetchedEvents = await fetchUpcomingEvents(); // Fetch events after sign-in
          setGoogleEvents(mapGoogleEvents(fetchedEvents));
          console.log(fetchedEvents,"fetchedEvents")
        // } else {
        //   console.error("User not authenticated.");
        // }
      } catch (err) {
        console.error("Error during sign-in or fetching events:", err);
      }
    };

    fetchAllCases();
    authenticateAndFetchEvents();
  }, [dispatch]);

  const handleResize = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.updateSize();
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isMeetOpen, setIsMeetOpen] = useState(false);

  const toggleDetailModal = () => {
    setIsDetailOpen(!isDetailOpen);
  };

  const toggleMeetModal = () => {
    setIsMeetOpen(!isMeetOpen);
  };

  const renderEventContent = (eventInfo) => {
    const { title, extendedProps } = eventInfo.event;
    const { type } = extendedProps;

    const handleEventClick = () => {
      setSelectedCase({
        ...extendedProps.caseItem,
        title,
      });
      setIsDetailOpen(true);
    };

    const handleMeetClick = () => {
      setSelectedCase(eventInfo?.event);
      setIsMeetOpen(true);
    };

    return (
      <>
        {type === "googleMeet" ? (
          <div onClick={handleMeetClick} className="calendar-info w-full">
            <div className="font-semibold mb-1 truncate overflow-hidden whitespace-nowrap">{title}</div>
            <div>
              <a href={extendedProps.meetLink} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                Join Meet
              </a>
            </div>
          </div>
        ) : (
          <div
            onClick={handleEventClick}
            className={`calendar-info w-full ${title === "Closing Due" ? "yellow" : "gray"}`}
          >
            <div className="font-semibold mb-1">{title}</div>
            <div>{extendedProps?.caseItem?.clientName}</div>
            <div className="truncate">{extendedProps?.caseItem?.premisesName}</div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <FullCalendar
        ref={calendarRef}
        height="100%"
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={[...calendarEvents, ...googleEvents]}
        eventContent={renderEventContent}
      />
      {isDetailOpen && selectedCase && (
        <DetailCaseModal
          onAddReminderClick={toggleAddReminderModal}
          onClose={toggleDetailModal}
          eventData={selectedCase}
          title={selectedCase.title}
          clientName={selectedCase.clientName}
          premisesName={selectedCase.premisesName}
        />
      )}
      {isMeetOpen && (
        <MeetingDetailModal
          onClose={toggleMeetModal}
          eventData={selectedCase}
          title={selectedCase?.title}
        />
      )}
    </>
  );
};

export default Calendar;
