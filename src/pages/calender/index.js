import React, { useEffect, useState } from 'react';
import Sidebar from './calenderView/sidebar';
import Calendar from './calenderView';
import AddReminderModal from './calenderView/addReminderModal';
import { clearStageData } from '../../redux/actions/stagesActions';
import { clearTaskData } from '../../redux/actions/taskActions';
import { useDispatch } from 'react-redux';

const CalendarPage = () => {
  const dispatch = useDispatch();
  const [isAddReminderOpen, setIsAddReminderOpen] = useState(false);
  const [filters, setFilters] = useState({
    mortgageDue: true,
    closingDue: true,
  });
  const [selectedCase, setSelectedCase] = useState(null);

  const toggleAddReminderModal = () => {
    setIsAddReminderOpen(!isAddReminderOpen);
  };

  const handleFilterChange = (filterName, checked) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: checked,
    }));
  };
  useEffect(()=>{
    dispatch(clearStageData())
    dispatch(clearTaskData())
  },[])
  return (
    <div className="calendar-page-container" style={{ display: 'flex', height: '100vh' }}>
     
      <div className="calendar-container" style={{ width: '80%' , borderRight: '1px solid #ddd'}}>
        <Calendar toggleAddReminderModal={toggleAddReminderModal} isAddReminderOpen={isAddReminderOpen} filters={filters} selectedCase={selectedCase} setSelectedCase={setSelectedCase}/>
      </div>
      <div className="sidebar-container" style={{ width: '20%' }}>
        <Sidebar onAddReminderClick={toggleAddReminderModal}   filters={filters} onFilterChange={handleFilterChange} setSelectedCase={setSelectedCase}/>
      </div>

      {/* Add Reminder Modal */}
      {isAddReminderOpen && <AddReminderModal  onClose={toggleAddReminderModal} reminderData={selectedCase} />}
    </div>
  );
};

export default CalendarPage;
