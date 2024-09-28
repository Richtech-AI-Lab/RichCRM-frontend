import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import DetailCaseModal from './detailCaseModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCasesRequest } from '../../../redux/actions/caseAction';

const Calendar = ({ toggleAddReminderModal, filters }) => {
  const dispatch = useDispatch();
  const { cases } = useSelector((state) => state.case.casesData);
  const casesWithDates = cases.filter((caseItem) => caseItem.closingDate || caseItem.mortgageContingencyDate);
  const calendarRef = useRef(null);  

  const calendarEvents = casesWithDates.flatMap((caseItem) => [
    filters.closingDue && caseItem.closingDate ? {
      id: `${caseItem.caseId}_Closing Due`,
      title: `Closing Due`, 
      start: caseItem.closingDate,
      extendedProps: { caseItem }
    } : null,
    filters.mortgageDue && caseItem.mortgageContingencyDate ? {
      id: `${caseItem.caseId}_Mortgage Due`,
      title: `Mortgage Due`, 
      start: caseItem.mortgageContingencyDate,
      extendedProps: { caseItem }
    } : null
  ]).filter(event => event !== null);
  

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
  const [selectedCase, setSelectedCase] = useState(null);

  const toggleDetailModal = () => {
    setIsDetailOpen(!isDetailOpen);
  };

  const renderEventContent = (eventInfo) => {
    const { title, extendedProps } = eventInfo.event;
    const { premisesName, clientName } = extendedProps.caseItem;

  const handleEventClick = () => {
    setSelectedCase({
      ...extendedProps.caseItem, 
      title 
    });
    setIsDetailOpen(true);
  };
    return (
      <div onClick={handleEventClick} className={`calendar-info w-full ${title === "Closing Due" ? "yellow" : "gray"}`}>
        <div className="font-semibold mb-1">{title}</div>
        <div>{clientName}</div>
        <div className="truncate">{premisesName}</div>
      </div>
    );
  };

  return (
    <>
      <FullCalendar
        ref={calendarRef}
        height="100%"
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
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
    </>
  );
};

export default Calendar;
