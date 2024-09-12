import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import DetailCaseModal from './detailCaseModal';
import { formatDate } from '../../../utils';
const events = [
  { id: '1', title: 'Event 1', start: '2024-09-22' },
  { id: '2', title: 'Event 2', start: '2024-09-10' }
];

// const events = [
//   {
//     "caseId": "95e8d47b-c054-404b-8517-79357cd98538",
//     "creatorId": "test1@gmail.com",
//     "premisesId": "8e5ac210-7c07-4dde-8ed2-f0d2b9f23699",
//     "premisesName": "130 W 3rd St # 1203_New York NY 10012-1296",
//     "stage": 4,
//     "caseStatus": 0,
//     "stageId": "355ed40c-c529-403a-8708-7adf656407bf",
//     "caseType": 1,
//     "buyerId": null,
//     "sellerId": "bffc41d3-4ef5-4cc8-8889-6524971e8299",
//     "clientName": "Woooo, Larry",
//     "createAt": "2024-07-18T19:52:16.672Z",
//     "closeAt": "2024-07-18T19:52:16.672Z",
//     "closingDate": "2024-07-20T20:04:24.740Z",
//     "mortgageContingencyDate": "2024-07-20T20:04:24.740Z",
//     "additionalClients": [
//       "738ffc97-299b-423a-b759-2116a402b18d",
//       "86a6d1d3-9644-40cc-bec5-e2710567d882"
//     ]
//   },
//   {
//     "caseId": "75d2b2b1-5be4-4ea0-9377-62c578227c73",
//     "creatorId": "test1@gmail.com",
//     "premisesId": "7320de16-7976-4790-a0af-f3ade99813da",
//     "premisesName": "227 Cumberland Ave CONDO",
//     "stage": 4,
//     "caseStatus": 0,
//     "stageId": "8c3ac4ef-c6ce-4ff4-9921-482ae3472025",
//     "caseType": 1,
//     "sellerId": "15762c61-4b5e-4509-a1b4-68a1b80da2ea",
//     "clientName": "Jacobson, Mina",
//     "createAt": "2024-07-18T19:52:16.672Z",
//     "closeAt": "2024-07-18T19:52:16.672Z",
//     "closingDate": "2024-07-20T20:04:24.740Z",
//     "mortgageContingencyDate": "2024-07-20T20:04:24.740Z",
//     "additionalClients": []
//   },
//   {
//     "caseId": "27930365-77b8-45a8-8381-acabdefdb4f9",
//     "creatorId": "test1@gmail.com",
//     "premisesId": "57a56cf8-2169-413b-a311-0694ac3c9405",
//     "premisesName": "12421 US 301 CONDO",
//     "stage": 4,
//     "caseStatus": 0,
//     "stageId": "ab74d790-e3a4-4d78-8a8e-4728b9afa385",
//     "caseType": 0,
//     "buyerId": "4b65fa14-16b3-44a6-9a2c-2e04c7305e58",
//     "clientName": "Mooo, cvret",
//     "createAt": "2024-07-18T19:52:16.672Z",
//     "closeAt": "2024-07-18T19:52:16.672Z",
//     "closingDate": "2024-07-20T20:04:24.740Z",
//     "mortgageContingencyDate": "2024-07-20T20:04:24.740Z",
//     "additionalClients": []
//   },
//   {
//     "caseId": "d3418048-e533-42b3-8cb2-95062f5aaf8c",
//     "creatorId": "test1@gmail.com",
//     "premisesId": "3ef02675-76ce-4889-809b-9763ac48566c",
//     "premisesName": "110 Sea Ln CONDO",
//     "stage": 4,
//     "caseStatus": 0,
//     "stageId": "c98725b9-b90f-4ad4-9f95-ac0e8a868346",
//     "caseType": 1,
//     "sellerId": "1bc6369b-8b88-4645-9917-e6566c9fbd77",
//     "clientName": "Rath, Myah ",
//     "createAt": "2024-07-18T19:52:16.672Z",
//     "closeAt": "2024-07-18T19:52:16.672Z",
//     "closingDate": "2024-07-20T20:04:24.740Z",
//     "mortgageContingencyDate": "2024-07-20T20:04:24.740Z",
//     "additionalClients": [
//       "1606a1c8-4f6f-4d0a-addd-11d3565ed108",
//       "aeaa159d-e5c7-4087-8590-dfc57c645551"
//     ]
//   },
//   {
//     "caseId": "00d9107b-915c-40be-8833-19a60666e34f",
//     "creatorId": "test1@gmail.com",
//     "premisesId": "8951f036-e37a-491c-8465-0fdf6c27f53d",
//     "premisesName": "3830 Douglas Ave CONDO",
//     "stage": 3,
//     "caseStatus": 0,
//     "stageId": "31d43ec0-eb18-4cd8-89c1-9fab214f7e34",
//     "caseType": 0,
//     "buyerId": "4569a30f-9d8b-46dd-adee-3acd600fd331",
//     "clientName": "Ferry, Chelsey",
//     "createAt": "2024-07-18T19:52:16.672Z",
//     "closeAt": "2024-07-18T19:52:16.672Z",
//     "closingDate": "2024-07-20T20:04:24.740Z",
//     "mortgageContingencyDate": "2024-07-20T20:04:24.740Z",
//     "additionalClients": [
//       "8b691a3e-b6a3-4a41-b7b4-8b55f6afef3d",
//       "a2d99bab-ca95-40c6-9469-02ced7ee4076"
//     ]
//   }
// ];

const Calendar = ({ toggleAddReminderModal, filters }) => {
  const calendarRef = useRef(null);  

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

  const transformEvents = (events) => {
    return events.flatMap(event => {
      const dateEvents = [];

      // Check if closingDate is available
      if (event.closingDate) {
        dateEvents.push({
          ...event,
          start: formatDate(event.closingDate),
          title: `${event.clientName} - Closing Date`
        });
      }

      // Check if mortgageContingencyDate is available
      if (event.mortgageContingencyDate) {
        dateEvents.push({
          ...event,
          start: formatDate(event.mortgageContingencyDate),
          title: `${event.clientName} - Mortgage Contingency Date`
        });
      }

      return dateEvents;
    });
  };
  const [filteredEvents, setFilteredEvents] = useState(transformEvents(events));
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  console.log(filteredEvents)
  useEffect(() => {
    console.log(filters)
    // let filtered = events;

    // if (filters.mortgageDue) {
    //   filtered = filtered.filter(event => event.type === 'mortgageDue');
    // }

    // if (filters.closingDue) {
    //   filtered = filtered.filter(event => event.type === 'closingDue');
    // }

    // setFilteredEvents(filtered);
  }, [filters]);



  const toggleDetailModal = () => {
    setIsDetailOpen(!isDetailOpen);
  };

  const renderEventContent = (eventInfo) => (
    <>
      <div onClick={toggleDetailModal} className="calendar-info">
        <div className="font-semibold mb-1">Mortgage Due</div>
        <div>Fu, Jack</div>
        <div className="truncate">1500, skyline avenue, t900</div>

      </div>
      {isDetailOpen && <DetailCaseModal onAddReminderClick={toggleAddReminderModal} onClose={toggleDetailModal} />}
    </>
  );

  return (
    <FullCalendar
    ref={calendarRef}
      height="100%"
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventContent={renderEventContent}
    />
  );
};

export default Calendar;
