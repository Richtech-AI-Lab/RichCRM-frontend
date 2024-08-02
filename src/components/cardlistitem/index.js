import React from "react";
import { Radio } from "flowbite-react";
import Label from "../label";
import SelectInput from "../selectinput";

const CardListItem = ({
  label,
  value,
  isCheckbox = false,
  checkboxOptions = [],
  isDropdown = false,
  dropdownOptions = [],
  nestedItems = [],
  icon,
  isInput = false,
  inputProps,
  floor
}) => (

  <li className={floor ? "list-w-full" : "flex justify-between"}>
    {isCheckbox && (
      <div
        className="flex justify-between items-center w-full"
      >
        <span className="left-txt w-full">{label}</span>

        <div className="flex justify-end items-center w-full gap-7">
          <div className="grid grid-cols-2 gap-3">
            {checkboxOptions.map((option, index) => (
              <div
                className="flex items-center gap-2 custom-radio w-[160px]"
                key={index}
              >
                <Radio
                  id={option.id}
                  name={label}
                  defaultChecked={option.defaultChecked}
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
    {isDropdown && (
      <div
        className="flex justify-between items-center w-full"
      >
        <span className="left-txt w-full">{label}</span>

        <div className="flex justify-end items-center w-full gap-7">
          <div className="grid gap-3">
            <SelectInput
              inputClassName="bg-white shadow-shadow-light py-[12px] px-6 rounded-full border-0 text-base leading-5 font-semibold text-label"
              labelClassName="ext-label mr-3"
              name={label}
              options={dropdownOptions.map((option) => ({
                value: option.id,
                label: option.label,
              }))}
            />
          </div>
        </div>
      </div>
    )}
    {(!isDropdown && !isCheckbox)  && (
      <>
        <span className="left-txt flex items-center">
          {icon && <span className="icon mr-2">{icon}</span>} {label}
        </span>
        {/* {isInput ? ( */}
        {nestedItems.length === 0 &&
          <input
            className="text-right border-none focus:ring-transparent"
            value={value}
            {...inputProps}
          />
        }
        {/* ) : (
          <span className="text-right">{value}</span>
        )} */}

      </>
    )}
    {nestedItems.length > 0 && (
      <ul className="mt-4">
        {nestedItems.map((nestedItem, index) => (
          <CardListItem key={index} {...nestedItem} />
        ))}
      </ul>
    )}
  </li>
);

export default CardListItem;
