import React from 'react';
import XButton from '../../../components/button/XButton';
import { FiPlus } from 'react-icons/fi';
import { IoCalendarClearOutline } from "react-icons/io5";
import { Checkbox, Label } from 'flowbite-react';

const Sidebar = ({ onAddReminderClick, filters, onFilterChange, setSelectedCase }) => {
  const setNullCallReminderModal = () => {
    setSelectedCase(null)
    onAddReminderClick()
  };
  return (
    <div className="sidebar p-4">
      
      <XButton
        icon={<IoCalendarClearOutline className="text-base mr-2 inline-block" />}
        onClick={setNullCallReminderModal}
        text="Create an event"
        type="button"
        // onClick={onCancel} 
        className="bg-primary text-base text-white py-[10px] px-6 rounded-[100px] ml-4"
      />

      {/* <div className="p-5">
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={filters.mortgageDue}
            onChange={(e) => onFilterChange('mortgageDue', e.target.checked)}
            className="mr-2"
          />
          Mortgage Due Date
        </label>
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={filters.closingDue}
            onChange={(e) => onFilterChange('closingDue', e.target.checked)}
            className="mr-2"
          />
          Closing Due Date
        </label>
      </div> */}
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-center gap-2">
          <Checkbox 
          checked={filters.mortgageDue}
          onChange={(e) => onFilterChange('mortgageDue', e.target.checked)}
          />
          <Label className="text-secondary-800">
            Mortgage Due Date
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox 
           checked={filters.closingDue}
           onChange={(e) => onFilterChange('closingDue', e.target.checked)}
           />
          <Label className="text-secondary-800">
            Closing Due Date
          </Label>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
