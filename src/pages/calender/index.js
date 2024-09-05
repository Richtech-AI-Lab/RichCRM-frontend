import React, { useState } from 'react';
import Sidebar from './calenderView/sidebar';
import Calendar from './calenderView';
import AddReminderModal from './calenderView/addReminderModal';

const CalendarPage = () => {
  const [isAddReminderOpen, setIsAddReminderOpen] = useState(false);
  const [filters, setFilters] = useState({
    mortgageDue: true,
    closingDue: true,
  });
  const toggleAddReminderModal = () => {
    setIsAddReminderOpen(!isAddReminderOpen);
  };
  const handleFilterChange = (filterName, checked) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: checked,
    }));
  };
  return (
    <div className="calendar-page-container" style={{ display: 'flex', height: '100vh' }}>
     
      <div className="calendar-container" style={{ width: '75%' , borderRight: '1px solid #ddd'}}>
        <Calendar toggleAddReminderModal={toggleAddReminderModal} filters={filters}/>
      </div>
      <div className="sidebar-container" style={{ width: '25%' }}>
        <Sidebar onAddReminderClick={toggleAddReminderModal}   filters={filters} onFilterChange={handleFilterChange} />
      </div>

      {/* Add Reminder Modal */}
      <AddReminderModal isOpen={isAddReminderOpen} onClose={toggleAddReminderModal}  />
    </div>
  );
};

export default CalendarPage;
