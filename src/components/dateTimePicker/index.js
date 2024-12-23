import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

const DateTimeInput = ({ name, value, onSelectedDateChanged , placeHolder}) => {

  const [startDate, setStartDate] = useState(value ? new Date(value) : null);

  const handleDateChange = (date) => {
    // if(!date== null){
    setStartDate(date);
    onSelectedDateChanged(date);
    // }
  };
  useEffect(() => {
    setStartDate(value ? new Date(value) : null);
  }, [value]);

  const customtheme = {
    "popup": {
      "root": {
        "base": "absolute right-0 top-10 z-50 block pt-2",
      },
    },
  }
  return (
    <div className="custom-datepicker">
      <DatePicker
        autoComplete={false}
        name={name}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        // dateFormat="LLL"
        selected={startDate}
        onChange={(date) => handleDateChange(date)}
        isClearable
        placeholderText={placeHolder}
        dateFormat="MMMM dd, HH:mm"
      />
    </div>
  );
};
export default DateTimeInput;
