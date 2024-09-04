import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
// import './Calendar.css'; // Add custom styles if needed

const events = [
  {
    id: '1',
    title: 'Event 1',
    start: '2024-09-10',
  },
  {
    id: '2',
    title: 'Event 2',
    start: '2024-09-15',
  }
];

const Calendar = () => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        right: 'prev,next today',
        center: 'title',
        left: ''
      }}
      events={events}
      editable={false}
      selectable={false}
      dayMaxEventRows={true}
      eventColor='#3788d8'
    />
  );
};

export default Calendar;


// import React from 'react';
// import { Calendar } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';


// const CalendarData = () => {
//   const events = [
//     { title: 'Event 1', date: '2024-09-10' },
//     { title: 'Event 2', date: '2024-09-15' },
//     // Add more events as needed
//   ];
//   const calendarRef = React.useRef(null);

//   React.useEffect(() => {
//     const calendar = new Calendar(calendarRef.current, {
//       plugins: [dayGridPlugin],
//       initialView: 'dayGridMonth',
//       events: events, // Pass your events here
//     });

//     calendar.render();

//     return () => calendar.destroy(); // Cleanup on unmount
//   }, [events]);

//   return <div ref={calendarRef} />;
// };

// export default CalendarData;