import React, { useState } from 'react';
import { format, parse } from 'date-fns';
import { Datepicker } from 'flowbite-react';

const DateInput = ({ name, value, onChange }) => {
  const [startDate, setStartDate] = useState(value ? new Date(value) : null);

  const handleDateChange = (date) => {
    setStartDate(date);
    onChange(date);
  };

  return (
      <Datepicker
        name={name}
        selected={startDate}
        onChange={handleDateChange}
        dateFormat="MMMM dd, yyyy"
        customInput={
          <input
          name={name}
            className="text-right border-none focus:ring-transparent"
            value={startDate ? format(startDate, 'MMMM dd, yyyy') : ''}
            placeholder="Month day, year"
            readOnly
          />
        }
      />
  );
};
export default DateInput;
