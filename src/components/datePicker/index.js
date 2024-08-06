import React, { useState } from 'react';
import { format, parse } from 'date-fns';
import { Datepicker } from 'flowbite-react';

const DateInput = ({ value, onChange }) => {
  const [startDate, setStartDate] = useState(value);

  const handleDateChange = (date) => {
    setStartDate(date);
    onChange(date);
  };

  return (

      <Datepicker
        selected={startDate}
        onChange={handleDateChange}
        dateFormat="MMMM dd, yyyy"
        customInput={
          <input
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
