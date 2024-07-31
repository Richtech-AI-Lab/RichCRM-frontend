import React from "react";
import { Checkbox } from "flowbite-react";
import Label from "../label";
import SelectInput from "../selectinput";
import { IoChatbubbles } from "react-icons/io5";
import { LuUpload } from "react-icons/lu";
import { FaClipboardList } from "react-icons/fa";
import Badge from "../badge";

const ChecklistItem = ({ icon, label, options, action, actionInfo, optionsValue, checkboxId, currentStep }) => {

  const getOptionsByAction = (action) => {
    switch (action) {
      case "Action":
        return [
          { value: "unfinished", label: "Unfinished" },
          { value: "finished", label: "Finished" },
        ];
      case "Upload":
        return [
          { value: "unuploaded", label: "Unuploaded" },
          { value: "uploaded", label: "Uploaded" },
        ];
      case "Contact":
        return [
          { value: "notStarted", label: "Not Started" },
          { value: "waiting", label: "Waiting" },
          { value: "noResponse", label: "No Response" },
          { value: "completed", label: "Completed" },
        ];
      default:
        return [];
    }
  };

  const getIconByAction = (action) => {
    switch (action) {
      case "Action":
        return <FaClipboardList />
      case "Upload":
        return <LuUpload />
      case "Contact":
        return <IoChatbubbles />
      default: <></>
    }
  }

  const getColorByOptions = (option) => {
    switch (option) {
      case "Unfinished":
      case "Unuploaded":
      case "Not Started":
        return "yellow";
      case "Finished":
      case "Uploaded":
      case "Completed":
        return "green";
      case "Waiting":
        return "gray";
      case "No Response":
        return "red";
      default:
        return "";
    }
  };


  const displayColor = getColorByOptions(options)
  const displayIcon = getIconByAction(action)
  const displayOption = getOptionsByAction(action);


  return (
    <div class="border-t-2 border-black-10">
      <li className="flex justify-between items-center mb-5 pb-5 task-checklist mt-2">
        <div className="flex items-center gap-2 custom-radio">
          <Checkbox id={checkboxId} defaultChecked className="mr-6" />
          <Label htmlFor={checkboxId} className="flex items-center text-lg text-title font-medium">
            {displayIcon && <span className="mr-2">{displayIcon}</span>}
            {action}: {actionInfo}
          </Label>
        </div>
        <div>
          <p className="text-end mb-2">
            <span className={`bg-badge-${displayColor} text-secondary-100 text-sm font-semibold px-4 py-1 rounded-full inline-block`}>
              {options}
            </span>
          </p>
          {/* <SelectInput
          name="checklistSelect"
          value=""
          onChange={(e) => console.log(e.target.value)}
          options={options}
          inputClassName="border-border rounded-full py-[10px] px-[16px] bg-transparent text-secondary-700 leading-5 font-semibold"
        /> */}
          <SelectInput
            name="checklistSelect"
            value={options}
            onChange={(e) => console.log(e.target.value)}
            options={displayOption}
            inputClassName="border-border rounded-full py-[10px] px-[16px] bg-transparent text-secondary-700 leading-5 font-semibold"
          />
        </div>
      </li>
    </div>
    // </div>
  );
};

export default ChecklistItem;
