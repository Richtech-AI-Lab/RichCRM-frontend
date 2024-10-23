import React, { useEffect, useState } from "react";
import { Checkbox } from "flowbite-react";
import Label from "../label";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { HiOutlineCube } from "react-icons/hi";
import { LuUpload } from "react-icons/lu";
import UploadFileModal from "../caseModal/uploadFileModal";
import { ACTIONTYPE, ACTIONTYPELABEL, STAGESNAMES } from "../../constants/constants";
import NewCaseDropdown from "../newcasedropdown";
import ComposeEmail from "../composeEmail/index"
import { useDispatch, useSelector } from "react-redux";
import { updateTaskStatusRequest } from "../../redux/actions/taskActions";
import { updateStageStatusRequest } from "../../redux/actions/stagesActions";
import UploadFileModal from "../caseModal/uploadFileModal";

const ChecklistItem = ({ item, stageName, key, icon, label, status, action, actionInfo, optionsValue, checkboxId, currentStep, templates, stageId }) => {
  const dispatch = useDispatch();
  const [isCompose, setIsCompose] = useState(false);
  const [taskStatus, setTaskStatus] = useState(status);
  const [fileName, setFileName] = useState(null);
  const { casesData } = useSelector((state) => state.case);
  const caseObj = casesData?.cases?.find(item => item.caseId === localStorage.getItem('c_id'));
  const taskData = useSelector((state) => state.task);
  const [isUploadFileModalOpen, setIsUploadFileModalOpen] = useState(false);
  const toggleUploadFileModal = () => {
    setIsUploadFileModalOpen(!isUploadFileModalOpen);
  };
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
        return <IoChatbubbleEllipsesOutline />
      case ACTIONTYPE.UPLOAD:
        return <LuUpload />
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
          displayColor = 'gray';
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

  const [isUploadFileModalOpen, setIsUploadFileModalOpen] = useState(false);
  const toggleUploadFileModal = () => {
    setIsUploadFileModalOpen(!isUploadFileModalOpen);
  };

  const handleOption = (option) => {
    // console.log(item?.name)
    // console.log(item?.status)
    // console.log(localStorage.getItem("c_id"))
    let fname=`${caseObj?.clientName}-${caseObj?.premisesName}-${item?.name}`
    setFileName(fname)
    if (option == "compose message") {
      setIsCompose(true)
    } else if (option == "upload") {
      toggleUploadFileModal();
    }
    if (option == "upload") {
      setIsUploadFileModalOpen(true)
    }
  }
  useEffect(() => {
    setTaskStatus(status);
  }, [status]);

  const handleChangeTaskStatus = (value) => {
    let newStatus;

    if (value) {
      newStatus = value
    } else {
      newStatus = taskStatus === 0 || taskStatus === 1 ? 2 : 0;
    }
    setTaskStatus(newStatus)
    // console.log(newStatus)
    const currentStageTasks = taskData?.data[STAGESNAMES[stageName ? stageName : 0]];

    const otherTasks = currentStageTasks.filter(task => task.taskId != item?.taskId);

    let updatedTask = {
      ...item,
      status: newStatus,
    };
    const updatedTasksArray = [...otherTasks, updatedTask];

    const newStageStatus = handleChangeStageStatus(updatedTasksArray, getCompletedTasksCount(updatedTasksArray), getWaitingTasksCount(updatedTasksArray))
    const updatedStatusTask = {
      currentStep: stageName,
      taskData: {
        taskId: item?.taskId,
        status: newStatus,
      },
    };

    const updatedStatusStage = {
      stageId: stageId,
      stageStatus: newStageStatus
    };
    dispatch(updateTaskStatusRequest(updatedStatusTask));
    dispatch(updateStageStatusRequest(updatedStatusStage));
  }


  const getCompletedTasksCount = (tasks) => {
    return tasks?.filter((task) => {
      switch (task.taskType) {
        case 0:
          return task.status === 2; // 'Finished'

        case 1:
          return task.status === 2; // 'Uploaded'

        case 2:
          return task.status === 2; // 'Finished'

        default:
          return false; // For unknown task types
      }
    }).length || 0;
  };


  const getWaitingTasksCount = (tasks) => {
    return tasks?.filter((task) => {
      switch (task.taskType) {
        case 0:
          return task.status === 1; // 'Finished'

        case 1:
          return task.status === 1; // 'Uploaded'

        case 2:
          return task.status === 1; // 'Finished'

        default:
          return false; // For unknown task types
      }
    }).length || 0;
  };


  // const handleChangeStageStatus = () => {
  //   if(getCompletedTasksCount(taskData.data[STAGESNAMES[stageName? stageName : 0]]) == taskData.data[STAGESNAMES[stageName? stageName : 0]]?.length){
  //     return 0;
  //   }else if (getCompletedTasksCount(taskData.data[STAGESNAMES[stageName? stageName : 0]]) == 0) {
  //     return 2
  //   } else {
  //     return 1
  //   }
  // }

  const handleChangeStageStatus = (updatedTaskStatuses, completedCount, waitingCount) => {
    const totalTasks = Object.keys(updatedTaskStatuses).length;
    if (completedCount === totalTasks) { // all task is completed
      return 2; // All tasks completed
    } else if (waitingCount > 0) { // if there is any task in waiting
      return 1; // No tasks completed
    }else if (completedCount === 0) { // dont have any completed task
      return 0; // No tasks completed
    } else {
      return 1; // Some tasks completed
    }
  };

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
            <Checkbox id={checkboxId} checked={taskStatus === 2} className="mr-6" onChange={() => handleChangeTaskStatus()} />
            <Label htmlFor={checkboxId} className="flex items-center lg:text-base xl:text-base text-title font-medium">
              {displayIcon && <span className="mr-2 text-2xl">{displayIcon}</span>}
              {/* {stageId }: */}
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
      {isUploadFileModalOpen && <UploadFileModal fileName={fileName} onClose={toggleUploadFileModal} />}
      {isCompose ? <ComposeEmail templates={templates} onClose={toggleComposeModal} onSendEmail={(value) => handleChangeTaskStatus(value)} /> : ""}
      {isUploadFileModalOpen && <UploadFileModal onClose={toggleUploadFileModal} />}
    </>
  );
};

export default ChecklistItem;
