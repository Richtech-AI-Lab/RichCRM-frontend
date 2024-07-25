import React from "react";
import { Checkbox } from "flowbite-react";
import Label from "../label";
import SelectInput from "../selectinput";

const ChecklistItem = ({ icon, label, options, checkboxId }) => {
  return (
    <li className="flex justify-between items-center mb-5 pb-5 task-checklist">
      <div className="flex items-center gap-2 custom-radio">
        <Checkbox id={checkboxId} defaultChecked className="mr-6" />
        <Label htmlFor={checkboxId} className="flex items-center text-lg text-title font-medium">
          {icon && <span className="mr-2">{icon}</span>}
          {label}
        </Label>
      </div>
      {/* <div>
        <p className="text-end mb-2">
          <span className="bg-badge-yellow text-secondary-100 text-sm font-semibold px-4 py-1 rounded-full inline-block">
            Unfinished
          </span>
        </p>
        <SelectInput
          name="checklistSelect"
          value=""
          onChange={(e) => console.log(e.target.value)}
          options={options}
          inputClassName="border-border rounded-full py-[10px] px-[16px] bg-transparent text-secondary-700 leading-5 font-semibold"
        />
      </div> */}
    </li>
  );
};

export default ChecklistItem;
