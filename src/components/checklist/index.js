import React from "react";
import { Checkbox } from "flowbite-react";
import Label from "../label";
import SelectInput from "../selectinput";

const ChecklistItem = ({ icon, label, options, checkboxId }) => {
  return (
    <li className="flex justify-between items-center mb-10">
      <div className="flex items-center gap-2 custom-checkbox">
        <Checkbox id={checkboxId} defaultChecked className="mr-6" />
        <Label htmlFor={checkboxId} className="flex items-center text-lg">
          {icon && <span className="mr-2">{icon}</span>}
          {label}
        </Label>
      </div>
      <div>
        <p className="text-end mb-2">
          <span className="bg-badge-gray text-secondary-100 text-sm font-semibold px-4 py-1 rounded-full inline-block">
            Ready
          </span>
        </p>
        <SelectInput
          name="checklistSelect"
          value=""
          onChange={(e) => console.log(e.target.value)}
          options={options}
          inputClassName="border-none rounded-lg py-[6px] px-[16px] bg-select text-select-text leading-5 font-semibold shadow-full"
        />
      </div>
    </li>
  );
};

export default ChecklistItem;
