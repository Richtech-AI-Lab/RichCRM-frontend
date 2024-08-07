import React, { useState } from "react";
import { Field, useFormikContext } from "formik";
import Label from "../label";
import SelectInput from "../selectinput";
import DateInput from "../datePicker";

const CardListItem = ({
  formerror,
  type,
  funcHandleHideClick,
  label,
  name,
  value,
  optional,
  options = [],
  icon,
  inputProps,
  floor
}) => {
  const { setFieldValue } = useFormikContext();
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFieldValue(name, date);
  };

  const renderContent = () => {
    switch (type) {
      case "checkboxes":
        return (
          <div className="flex justify-between items-center w-full">
            <span className="left-txt w-full">{label}</span>
            <div className="flex justify-end items-center w-full gap-7">
              <div className="grid grid-cols-2 gap-x-12">
                {options.map((option, index) => (
                  <div className="flex items-center gap-2 custom-radio" key={index}>
                    <Field
                      type="radio"
                      id={option.id}
                      name={name}
                      value={option.id}
                      checked={value?.includes(option.id)}
                      className="mr-2"
                    />
                    <Label
                      htmlFor={option.id}
                      className="flex items-center text-base text-label font-normal"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "dropdown":
        return (
          <div className="flex justify-between items-center w-full">
            <span className="left-txt w-full">{label}</span>
            <div className="flex justify-end items-center w-full gap-7">
              <div className="grid gap-3">
                <Field
                  as={SelectInput}
                  inputClassName="bg-input-surface py-[6px] px-4 rounded-full border-0 text-sm leading-5 font-semibold text-label"
                  labelClassName="ext-label mr-3"
                  name={name}
                  options={options.map((option) => ({
                    value: option.id,
                    label: option.label,
                  }))}
                />
              </div>
            </div>
          </div>
        );

      case "datepicker":
        return (
          <>
            <span className={`${optional === true ? "cursor-pointer" : ""} left-txt flex items-center`}>
              {label}
            </span>
            <DateInput
              name={name}
              value={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setFieldValue(name, date);
              }}
              onSelectedDateChanged={handleDateChange}
            />
          </>
        );

      case "text":
        return (
          <>
            <span
              className={`${optional === true ? "cursor-pointer" : ""} left-txt flex items-center`}
              onClick={optional === true ? funcHandleHideClick : null}
            >
              {icon && (
                <span className="icon mr-2">
                  <img src={icon} alt="icon" />
                </span>
              )}
              {label}
            </span>
            <input
              className="text-right p-0 border-none focus:ring-transparent"
              value={value}
              name={name}
              field={{ name: name }}
              {...inputProps}
            />
            {formerror?.errors[name] && formerror?.touched[name] && (
              <span className="text-sm text-red-500">{formerror?.errors[name]}</span>
            )}
          </>
        );

      case "inputdropdown":
        console.log(name)
        return (
          <>
            <span className={`${optional === true ? "cursor-pointer" : ""} left-txt flex items-center`}>
              {label}
            </span>
            <div className="flex">
              <input
                className="text-right p-0 border-none focus:ring-transparent"
                value={value}
                name="premisesMaintenace.amount"
                field={{ name: name.amount }}
                {...inputProps}
              />
               <Field
                  as={SelectInput}
                 inputClassName="bg-input-surface ml-3 py-[6px] px-4 rounded-full border-0 text-sm leading-5 font-semibold text-label"
                  labelClassName="ext-label mr-3"
                   name="premisesMaintenace.period"
                  options={options.map((option) => ({
                    value: option.id,
                    label: option.label,
                  }))}
                />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <li className={floor ? "list-w-full" : "flex justify-between"}>
      {renderContent()}
    </li>
  );
};

export default CardListItem;
