import React, { useState } from "react";
import { Checkbox } from "flowbite-react";
import Label from "../label";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { HiOutlineCube } from "react-icons/hi";
import { LuUpload } from "react-icons/lu";
import { ACTIONTYPE, ACTIONTYPELABEL } from "../../constants/constants";
import NewCaseDropdown from "../newcasedropdown";
import ComposeEmail from "../composeEmail/index"
import { useDispatch } from "react-redux";
import { updateTaskStatusRequest } from "../../redux/actions/taskActions";

const ChecklistItem = ({ item, stageName, icon, label, status, action, actionInfo, optionsValue, checkboxId, currentStep, templates }) => {
  const dispatch = useDispatch();
  const [isCompose, setIsCompose] = useState(false);
  const [taskStatus, setTaskStatus] = useState(status);
  const toggleComposeModal = () => {
    setIsCompose(!isCompose);
  };
  const getOptionsByAction = (option) => {
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
        if (option === 0) {
          return [
            { value: "compose message", label: "Compose Message" },
          ];
        } else if (option === 1) {
          return [
            { value: "compose message", label: "Compose Message" },
          ];
          // return [
          //   { value: "reupload", label: "Resend Message" },
          //   { value: "view", label: "Extended Waiting Time" },
          // ];
          // } else if (option === "No Response") {
          //   // return [
          //   //   { value: "reupload", label: "Resend Message" },
          //   //   { value: "view", label: "Extended Waiting Time" },
          //   // ];
        } else if (option === 2) {
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
        if (option === 0) {
          return [
            { value: "upload", label: "Upload" },
          ];
        } else if (option === 1) {
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
        return <HiOutlineCube />
      case ACTIONTYPE.CONTACT:
        return <LuUpload />
      case ACTIONTYPE.UPLOAD:
        return <IoChatbubbleEllipsesOutline />
      default: <></>
    }
  }

  const isOptionDisable = (acc) => {
    if (acc == 0) {
      return true
    }
    return false
  };
  function getTaskLabelAndColor(taskType, status) {
    // console.log(taskType, status,"taskType, status")
    let label = '';
    let displayColor = '';

    switch (taskType) {
      case 'Action':
        if (status === 0) {
          label = 'To-do';
          displayColor = 'yellow';
        } else if (status === 2) {
          label = 'Done';
          displayColor = 'green';
        }
        break;

      case 'Upload':
        if (status === 0) {
          label = 'To-do';
          displayColor = 'yellow';
        } else if (status === 2) {
          label = 'Done';
          displayColor = 'green';
        }
        break;

      case 'Contact':
        if (status === 0) {
          label = 'To-do';
          displayColor = 'yellow';
        } else if (status === 1) {
          label = 'Waiting';
          displayColor = 'grey';
        } else if (status === 2) {
          label = 'Done';
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
  const handleOption = (option) => {
    if (option == "compose message") {
      setIsCompose(true)
    }
  }
  
  const handleChangeStatus = () => {
    const newStatus = taskStatus === 0 ? 2 : 0;
    setTaskStatus(newStatus)
    const updatedTask = {
      currentStep: stageName,  
      taskData: {
        taskId: item?.taskId,
        status: newStatus,
      },
    };
    dispatch(updateTaskStatusRequest(updatedTask));
  }

  const displayIcon = getIconByAction(action)
  const displayOption = getOptionsByAction(status);
  const disabled = isOptionDisable(action);
  const taskStatusColor = getTaskLabelAndColor(ACTIONTYPELABEL[action], status);

  // console.log(taskStatusColor?.badgeClass,"displayOption");
  return (
    <>
      <div className="border-t-2 border-black-10">
        <li className="flex justify-between items-center mb-5 pb-5 task-checklist mt-2">
          <div className="flex items-center gap-2 custom-radio">
            <Checkbox id={checkboxId} defaultChecked={taskStatus} className="mr-6" onChange={(e) => handleChangeStatus(e)} />
            <Label htmlFor={checkboxId} className="flex items-center lg:text-base xl:text-base text-title font-medium">
              {displayIcon && <span className="mr-2 text-2xl">{displayIcon}</span>}
              {/* {ACTIONTYPELABEL[action]}: */}
              {actionInfo}
            </Label>
          </div>
          <div>
            <p className="text-end mb-2">
              <span className={`bg-badge-${taskStatusColor?.badgeClass} text-secondary-100 text-sm font-semibold px-4 py-1 rounded-full inline-block`}>
                {taskStatusColor?.label}
              </span>
            </p>
            <div className="items-dropdown single-select mt-3">
              <NewCaseDropdown
                disabled={disabled}
                defaultLabel="Options"
                name="checklistSelect"
                // defaultChecked={!status}
                // value={!status}
                onChange={(e) => handleOption(e.target.value)}
                options={displayOption}
                inputClassName="border-border rounded-full py-[10px] px-[16px] text-secondary-700 leading-5 font-semibold"
              />
            </div>
            {/* <SelectInput
            disabled={disabled}
            name="checklistSelect"
            value={options}
            onChange={(e) => console.log(e.target.value)}
            options={displayOption}
            inputClassName="border-border rounded-full py-[10px] px-[16px] bg-transparent text-secondary-700 leading-5 font-semibold"
          /> */}
          </div>
        </li>
      </div>
      {isCompose ? <ComposeEmail templates={templates} onClose={toggleComposeModal} /> : ""}
    </>
  );
};

export default ChecklistItem;
