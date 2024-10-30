import React, { useState } from 'react';
import { format, parse } from 'date-fns';
import { Datepicker } from 'flowbite-react';
import DatePicker from 'react-datepicker';

const DateInput = ({ name, value, onSelectedDateChanged }) => {

  const [startDate, setStartDate] = useState(value ? new Date(value) : null);

  const handleDateChange = (date) => {
    // if(!date== null){
      setStartDate(date);
      onSelectedDateChanged(date);
    // }
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
      {/* <Datepicker
        showClearButton={true}
        showTodayButton={true}
        theme={customtheme}
        defaultDate={value ? new Date(startDate) : undefined}
        name={name}
        onSelectedDateChanged={handleDateChange}
        dateFormat="MMMM dd, yyyy"
      /> */}
      <DatePicker
      autoComplete={false}
        name={name}
        selected={startDate}
        onChange={(date) => handleDateChange(date)}
        isClearable
        placeholderText="Select a date"
        dateFormat="MMMM dd, yyyy"
      />
    </div>
  );
};
export default DateInput;
