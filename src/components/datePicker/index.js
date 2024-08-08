import React, { useState } from 'react';
import { format, parse } from 'date-fns';
import { Datepicker } from 'flowbite-react';

const DateInput = ({ name, value, onSelectedDateChanged }) => {

  const [startDate, setStartDate] = useState(value ? new Date(value) : null);

  const handleDateChange = (date) => {
    setStartDate(date);
    onSelectedDateChanged(date);
  };
  const customtheme= {
    "popup": {
      "root": {
        "base": "absolute right-0 top-10 z-50 block pt-2",
      },
    },}
  return (
    <div className="custom-datepicker">
      <Datepicker
      theme={customtheme}
        name={name}
        selected={startDate}
        onSelectedDateChanged={handleDateChange}
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
      </div>
  );
};
export default DateInput;
