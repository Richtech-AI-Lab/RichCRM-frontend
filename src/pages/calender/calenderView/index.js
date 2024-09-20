import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import DetailCaseModal from './detailCaseModal';
import { formatDate } from '../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCasesRequest } from '../../../redux/actions/caseAction';
// const events = [
//   {
//     id: "1",
//     title: "Event 2",
//     start: "2024-09-28T20:24:24.740Z"
// }
//   // { id: '1', title: 'ss', start: '2024-09-22' },
//   // { id: '2', title: 'Event 2', start: '2024-09-10' }
// ];
// fc-event fc-event-start fc-event-end fc-event-future fc-daygrid-event fc-daygrid-dot-event
// fc-event fc-event-start fc-event-end fc-event-future fc-daygrid-event fc-daygrid-block-event fc-h-event

const Calendar = ({ toggleAddReminderModal, filters }) => {
  const dispatch = useDispatch();
  const { cases } = useSelector((state) => state.case.casesData);
  const casesWithDates = cases.filter((caseItem) => caseItem.closingDate || caseItem.mortgageContingencyDate);
  const calendarRef = useRef(null);  

  const calendarEvents = casesWithDates.map((caseItem) => {
    return [
      caseItem.closingDate ? {
        id: caseItem.caseId,
        title: `Closing Due`, 
        start: caseItem.closingDate,
        extendedProps:{
          caseItem
        }
        // Add additional fields as needed
      } : null,
      caseItem.mortgageContingencyDate ? {
        id: caseItem.caseId,
        title: `Mortgage Due`, 
        start: caseItem.mortgageContingencyDate,
        extendedProps:{
          caseItem
        }
        // Add additional fields as needed
      } : null
    ];
  }).flat().filter(event => event !== null);  // Flatten and remove nulls

  useEffect(() => {
    const fetchAllCases = async () => {
      try {
        const payload = {
          creatorId: localStorage.getItem("authEmail"),
          closed: false
        };
        dispatch(fetchAllCasesRequest(payload));
      } catch (error) {
        console.error("Error fetching cases:", error);
      }
    };

    fetchAllCases();
  }, [dispatch]);

  // Function to force resize
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

  // const transformEvents = (events) => {
  //   return cases.flatMap(event => {
  //     const dateEvents = [];

  //     // Check if closingDate is available
  //     if (event.closingDate) {
  //       dateEvents.push({
  //         ...event,
  //         start: formatDate(event.closingDate),
  //         title: `${event.clientName} - Closing Date`
  //       });
  //     }

  //     // Check if mortgageContingencyDate is available
  //     if (event.mortgageContingencyDate) {
  //       dateEvents.push({
  //         ...event,
  //         start: formatDate(event.mortgageContingencyDate),
  //         title: `${event.clientName} - Mortgage Contingency Date`
  //       });
  //     }

  //     return dateEvents;
  //   });
  // };
  // const [filteredEvents, setFilteredEvents] = useState(transformEvents(events));
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // console.log(filteredEvents)
  useEffect(() => {
    // console.log(filters)
    // let filtered = events;

    // if (filters.mortgageDue) {
    //   filtered = filtered.filter(event => event.type === 'mortgageDue');
    // }

    // if (filters.closingDue) {
    //   filtered = filtered.filter(event => event.type === 'closingDue');
    // }

    // setFilteredEvents(filtered);
  }, [filters]);

  const renderEventContent = (eventInfo) => {
    // console.log(eventInfo.options?.events)
    const { title, extendedProps } = eventInfo.event;
    const {premisesName, clientName} = extendedProps.caseItem;
    // console.log(extendedProps) // Additional data passed with the event
    const toggleDetailModal = () => {
      setIsDetailOpen(!isDetailOpen);
    };
  
    return (
      <>
        <div onClick={toggleDetailModal} className={`calendar-info w-full ${title=="Closing Due"? "yellow": "gray"}`}>
          <div className="font-semibold mb-1">{title}</div>
          <div>{clientName}</div>
          <div className="truncate">{premisesName}</div>
        </div>
  
        {/* Conditionally render the modal if detail is open */}
        {isDetailOpen && (
          <DetailCaseModal 
            onAddReminderClick={toggleAddReminderModal} 
            onClose={toggleDetailModal} 
            eventData={extendedProps.caseItem}
            title={title}
            clientName={clientName}
            premisesName={premisesName}
            
          />
        )}
      </>
    );
  };
  return (
    <FullCalendar
      ref={calendarRef}
      height="100%"
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={calendarEvents}
      eventContent={renderEventContent}
    />
  );
};

export default Calendar;
