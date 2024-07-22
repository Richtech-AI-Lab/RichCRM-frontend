import React from "react";
import { Radio } from "flowbite-react";
import Label from "../label";

const CardListItem = ({
  label,
  value,
  isCheckbox = false,
  checkboxOptions = [],
  nestedItems = [],
  icon,
}) => (
  <li className={isCheckbox ? "" : "flex justify-between"}>
    {isCheckbox ? (
      <div className="flex justify-between items-center w-full">
        <span className="left-txt w-full">{label}</span>
        <div className="flex justify-end items-center w-full gap-7">
          {checkboxOptions.map((option, index) => (
            <div
              className="flex items-center gap-2 custom-checkbox"
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
    ) : (
      <>
        <span className="left-txt flex items-center">
          {icon && <span className="icon mr-2">{icon}</span>}{" "}
          {label}
        </span>
        <span className="text-right">{value}</span>
      </>
    )}
    {nestedItems.length > 0 && (
      <ul className="nested-list">
        {nestedItems.map((nestedItem, index) => (
          <CardListItem key={index} {...nestedItem} />
        ))}
      </ul>
    )}
  </li>
);

export default CardListItem;
