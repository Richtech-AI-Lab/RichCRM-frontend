import React, { useState } from "react";
import { Radio } from "flowbite-react";
import Label from "../label";
import SelectInput from "../selectinput";
import DateInput from "../datePicker";
import { Field, useFormikContext } from "formik";

const CardListItem = ({
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
  return (

    <li className={floor ? "list-w-full" : "flex justify-between"}>
      {type === "checkboxes" && (
        <div
          className="flex justify-between items-center w-full"
        >
          <span className="left-txt w-full">{label}</span>

          <div className="flex justify-end items-center w-full gap-7">
            <div className="grid grid-cols-2 gap-x-12">
              {options.map((option, index) => (
                <div
                  className="flex items-center gap-2 custom-radio "
                  key={index}
                >
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
      )}
      {type === "dropdown" && (
        <div
          className="flex justify-between items-center w-full"
        >
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
              {/* <SelectInput
              inputClassName="bg-input-surface py-[6px] px-4 rounded-full border-0 text-sm leading-5 font-semibold text-label"
              labelClassName="ext-label mr-3"
              name={label}
              options={options.map((option) => ({
                value: option.id,
                label: option.label,
              }))}
            /> */}
            </div>
          </div>
        </div>
      )}
      {type === "datepicker" && (
        <>
          <span className={`${optional === true ? "cursor-pointer" : ""} left-txt flex items-center`} >{label}
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
          {/* <DateInput value={selectedDate} onChange={setSelectedDate} /> */}
          {/* <input
          className="text-right border-none focus:ring-transparent"
          value={value}
          name={name}
          field={{ name: name }}
          {...inputProps}
        /> */}
        </>
      )}
      {type === "text" && (
        <>
          <span className={`${optional === true ? "cursor-pointer" : ""} left-txt flex items-center`} onClick={optional === true ? funcHandleHideClick : null}>
            {icon && <span className="icon mr-2"><img
              src={icon}
              alt="icon"
            /></span>}{label}
          </span>
          <input
            className="text-right p-0 border-none focus:ring-transparent"
            value={value}
            name={name}
            field={{ name: name }}
            {...inputProps}
          />
          {/* {isInput ? ( */}
          {/* {nestedItems.length === 0 &&
        } */}
          {/* ) : (
          <span className="text-right">{value}</span>
        )} */}

        </>
      )}
      {
        type === "inputdropdown" && (
          <>
            <span className={`${optional === true ? "cursor-pointer" : ""} left-txt flex items-center`} onClick={optional === true ? funcHandleHideClick : null}>
              {icon && <span className="icon mr-2"><img
                src={icon}
                alt="icon"
              /></span>}{label}
            </span>
            <div className="flex">
              <input
                className="text-right p-0 border-none focus:ring-transparent"
                value={value}
                name={name}
                field={{ name: name }}
                {...inputProps}
              />
              <SelectInput
                inputClassName="bg-input-surface ml-3 py-[6px] px-4 rounded-full border-0 text-sm leading-5 font-semibold text-label"
                labelClassName="ext-label mr-3"
                name={label}
                options={options.map((option) => ({
                  value: option.id,
                  label: option.label,
                }))}
              />
            </div>
          </>
        )
      }
      {/* {nestedItems.length > 0 && (
      <ul className="mt-4">
        {nestedItems.map((nestedItem, index) => (
          <CardListItem key={index} {...nestedItem} />
        ))}
      </ul>
    )} */}
    </li>
  )
};

export default CardListItem;
