import React from "react";
import { Checkbox } from "flowbite-react";
import Label from "../label";
import SelectInput from "../selectinput";
import { IoChatbubbles } from "react-icons/io5";
import { LuUpload } from "react-icons/lu";
import { FaClipboardList } from "react-icons/fa";
import Badge from "../badge";
import { ACTIONTYPE, ACTIONTYPELABEL } from "../../constants/constants";

const ChecklistItem = ({ icon, label, status, options, action, actionInfo, optionsValue, checkboxId, currentStep }) => {

  const getOptionsByAction = ( option = "Not Started") => {
    switch (action) {
      // case "Action":
      case ACTIONTYPE.ACTION:
        return [
          { value: "unfinished", label: "Unfinished" },
          { value: "finished", label: "Finished" },
        ];
        break;
      // case "Contact":
      case ACTIONTYPE.CONTACT:
        if (option === "Not Started") {
          return [
            { value: "compose message", label: "Compose Message" },
          ];
        } else if (option === "Waiting") {
          return [
            { value: "reupload", label: "Resend Message" },
            { value: "view", label: "Extended Waiting Time" },
          ];
        } else if (option === "No Response") {
          return [
            { value: "reupload", label: "Resend Message" },
            { value: "view", label: "Extended Waiting Time" },
          ];
        } else if (option === "Completed") {
          return [
            { value: "compose message", label: "Compose Message" },
          ];
        } else {
          return [
            { value: "no option", label: "No option" },]
        }
        break;
      // case "Upload":
      case ACTIONTYPE.UPLOAD:
        if (option === "Unuploaded") {
          return [
            { value: "upload", label: "Upload" },
          ];
        } else if (option === "Uploaded") {
          return [
            { value: "reupload", label: "Re-upload" },
            { value: "view", label: "View" },
          ];
        } else {
          return [
            { value: "no option", label: "No option" },
          ];
        }
        break;
      default:
        return [];
    }
  };

  const getIconByAction = (action) => {
    switch (action) {
      case ACTIONTYPE.ACTION:
        return <FaClipboardList />
      case ACTIONTYPE.CONTACT:
        return <LuUpload />
      case ACTIONTYPE.UPLOAD:
        return <IoChatbubbles />
      default: <></>
    }
  }

  const isOptionDisable = (acc, opt) => {
    if (acc == "Action" && (opt == "Finished" || opt == "Unfinished")) {
      return true
    }
    return false
  };
  function getTaskLabelAndColor(taskType, status) {
    console.log(taskType, status,"taskType, status")
    let label = '';
    let displayColor = '';

    switch (taskType) {
        case 'Action':
            if (status === 0) {
                label = 'Unfinished';
                displayColor = 'yellow';
            } else if (status === 2) {
                label = 'Finished';
                displayColor = 'green';
            }
            break;
        
        case 'Upload':
            if (status === 0) {
                label = 'Unuploaded';
                displayColor = 'yellow';
            } else if (status === 2) {
                label = 'Uploaded';
                displayColor = 'green';
            }
            break;
        
        case 'Contact':
            if (status === 0) {
                label = 'Unfinished';
                displayColor = 'yellow';
            } else if (status === 1) {
                label = 'Waiting';
                displayColor = 'grey';
            } else if (status === 2) {
                label = 'Finished';
                displayColor = 'green';
            } else if (status === 3) {
                label = 'No response';
                displayColor = 'red';
            }
            break;

        default:
            label = 'Unknown';
            displayColor = 'black';
    }

    return { label, badgeClass: displayColor };
}

  const displayIcon = getIconByAction(action)
  const displayOption = getOptionsByAction();
  const disabled = isOptionDisable(action, options);
  const taskStatusColor = getTaskLabelAndColor(ACTIONTYPELABEL[action], status);
  
// console.log(taskStatusColor?.badgeClass,"displayOption");
  return (
    <div className="border-t-2 border-black-10">
      <li className="flex justify-between items-center mb-5 pb-5 task-checklist mt-2">
        <div className="flex items-center gap-2 custom-radio">
          <Checkbox  id={checkboxId} defaultChecked={status} className="mr-6" />
          <Label htmlFor={checkboxId} className="flex items-center text-lg text-title font-medium">
            {displayIcon && <span className="mr-2">{displayIcon}</span>}
            {ACTIONTYPELABEL[action]}: {actionInfo}
          </Label>
        </div>
        <div>
          <p className="text-end mb-2">
            <span className={`bg-badge-${taskStatusColor?.badgeClass} text-secondary-100 text-sm font-semibold px-4 py-1 rounded-full inline-block`}>
              {taskStatusColor?.label}
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
            disabled={disabled}
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
