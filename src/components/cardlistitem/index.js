import { Checkbox } from "flowbite-react";
import React from "react";
import Label from "../label";

const CardListItem = ({
  label,
  value,
  isCheckbox = false,
  checkboxOptions = [],
}) => (
  <li>
    {isCheckbox ? (
      <div className="flex justify-between items-center w-full">
        {checkboxOptions.map((option, index) => (
          <div className="flex items-center gap-2 custom-checkbox" key={index}>
            <Checkbox
              id={option.id}
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
    ) : (
      <>
        <span className="left-txt">{label}</span>
        <span className="text-right">{value}</span>
      </>
    )}
  </li>
);

export default CardListItem;
