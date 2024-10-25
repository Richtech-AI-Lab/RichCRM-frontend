import React, { useState } from 'react';
import { format, parse } from 'date-fns';
import { Datepicker } from 'flowbite-react';

const DateInput = ({ name, value, onSelectedDateChanged }) => {

  const [startDate, setStartDate] = useState(value ? new Date(value) : null);

  const handleDateChange = (date) => {
    let v= new Date(date)
    v.setHours(23, 30, 0);
    setStartDate(v);
    onSelectedDateChanged(v);
  };
  const customtheme = {
    "popup": {
      "root": {
        "base": "absolute right-0 top-10 z-50 block pt-2",
      },
    },
  }
  return (
    <div className="custom-datepicker">
      {/* {value} */}
      <Datepicker
        showClearButton={true}
        showTodayButton={true}
        theme={customtheme}
        defaultDate={value ? new Date(startDate) : undefined}
        name={name}
        onSelectedDateChanged={handleDateChange}
        dateFormat="MMMM dd, yyyy"
      />
    </div>
  );
};
export default DateInput;
