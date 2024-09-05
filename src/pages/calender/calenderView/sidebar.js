import React from 'react';

const Sidebar = ({ onAddReminderClick , filters, onFilterChange }) => {
  return (
    <div className="sidebar p-4">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded w-full mb-4"
        onClick={onAddReminderClick}
      >
        Add a reminder
      </button>

      <div className="checkboxes">
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
      </div>
    </div>
  );
};

export default Sidebar;
