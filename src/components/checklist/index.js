import React, { useEffect, useState } from "react";
import { Checkbox } from "flowbite-react";
import Label from "../label";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { HiOutlineCube } from "react-icons/hi";
import { LuUpload } from "react-icons/lu";
import { ACTIONTYPE, ACTIONTYPELABEL, STAGESNAMES } from "../../constants/constants";
import NewCaseDropdown from "../newcasedropdown";
import ComposeEmail from "../composeEmail/index"
import { useDispatch, useSelector } from "react-redux";
import { updateTaskStatusRequest } from "../../redux/actions/taskActions";
import { updateStageStatusRequest } from "../../redux/actions/stagesActions";
import UploadFileModal from "../caseModal/uploadFileModal";
import GoogleMeetModal from "../gmeet/googleMeetModal";
import { detectIncognito } from "detectincognitojs";
import { toast } from "react-toastify";
import { useMsal } from "@azure/msal-react";
import SignFileModal from "../signFile";

const ROOT_FOLDER_PATH = "https://graph.microsoft.com/v1.0/drive/root";
const ChecklistItem = ({ item, stageName, key, icon, label, status, action, actionInfo, optionsValue, checkboxId, currentStep, templates, stageId }) => {
  const { instance, accounts, inProgress } = useMsal();
  const [account, setAccount] = useState(instance.getActiveAccount());
  const dispatch = useDispatch();
  const [isCompose, setIsCompose] = useState(false);
  const [isSignUpload, setIsSignUpload] = useState(false);
  const [isUploadFileModalOpen, setIsUploadFileModalOpen] = useState(false);
  const [isGmeetModalOpen, setIsGmeetModalOpen] = useState(false);
  const [taskStatus, setTaskStatus] = useState(status);
  const [fileName, setFileName] = useState(null);
  const { casesData } = useSelector((state) => state.case);
  const caseObj = casesData?.cases?.find(item => item.caseId === localStorage.getItem('c_id'));
  const taskData = useSelector((state) => state.task);
  const { data } = useSelector((state) => state.auth.user)
  const toggleUploadFileModal = () => {
    setIsUploadFileModalOpen(!isUploadFileModalOpen);
  };
  const toggleGMeetModal = () => {
    setIsGmeetModalOpen(!isGmeetModalOpen);
  };
  const toggleComposeModal = () => {
    setIsCompose(!isCompose);
  };
  const getOptionsByAction = (option) => {
    switch (action) {
      // case "Action":
      case ACTIONTYPE.ACTION:
        return [
          { value: "addmeet", label: "Add Meeting" },
          // { value: "finished", label: "Finished" },
        ];
        break;
      // case "Contact":
      case ACTIONTYPE.CONTACT:
        if (option === 0) {
          return [
            { value: "compose message", label: "Compose Message" },
            { value: "request signature", label: "Request For Signature" },
          ];
        } else if (option === 1) {
          return [
            { value: "compose message", label: "Compose Message" },
            { value: "request signature", label: "Request For Signature" },
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
            { value: "request signature", label: "Request For Signature" },
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
      return false
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

  const handleOption = async (option) => {
    let fname = `${caseObj?.clientName}-${caseObj?.premisesName}-${item?.name}`
    // console.log(fname)
    setFileName(fname)
    if (option == "request signature") {
      setIsSignUpload(true)
    } else if (option == "compose message") {
      setIsCompose(true)
    } else if (option == "upload") {
      toggleUploadFileModal();
    } else if (option == "addmeet") {
      detectIncognito().then((result) => {
        // console.log(result.browserName, result.isPrivate);
        if (result.isPrivate) {
          toast.info("Please use a regular browser tab to sign in and access Google Calendar.")
        } else {
          toggleGMeetModal();
        }
      });
    }
    // if (option == "upload") {
    //   setIsUploadFileModalOpen(true)
    // }
  }
  useEffect(() => {
    setTaskStatus(status);
  }, [status]);
  async function login(e) {
    // e.preventDefault();
    const loginRequest = {
      scopes: ["User.ReadWrite"],
    };

    instance
      .loginPopup(loginRequest)
      .then((loginResponse) => {
        instance.setActiveAccount(loginResponse.account);
        setAccount(loginResponse.account);
        console.log("User signed in!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function getToken() {
    if (!accounts || accounts.length === 0) {
      return null;
    }

    const request = {
      scopes: ["User.Read", "Files.ReadWrite"],
      account: account,
    };

    const authResult = await instance.acquireTokenSilent(request).catch(() => instance.acquireTokenPopup(request));
    return authResult.accessToken;
  }
  const fetchAndPreviewFile = async (folderName, fileName) => {
    if (!folderName || !fileName) {
      toast.error("Folder name or file name is missing");
      return;
    }
  
    try {
      const token = await getToken();
      if (!token) {
        toast.error("Failed to fetch authentication token");
        return;
      }
  
      const encodedFolderPath = encodeURIComponent(folderName);
      const encodedFileName = encodeURIComponent(`${fileName}.pdf`);
  
      let fileUrl = `${ROOT_FOLDER_PATH}:/${encodedFolderPath}/${encodedFileName}`;
      if (data[0]?.uploadFolderName) {
        // Adjust file URL if uploadFolderName exists
        fileUrl = `${ROOT_FOLDER_PATH}:/${data[0]?.uploadFolderName}/${encodedFolderPath}/${encodedFileName}`;
      }
  
      const fileResponse = await fetch(fileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (fileResponse.ok) {
        const fileData = await fileResponse.json();
        const downloadUrl = fileData?.id
        openFilePreview(downloadUrl)
      }
    } catch (error) {
      console.error("Error fetching or previewing file:", error);
      toast.error(`Failed to fetch file: ${error.message}`);
    }
  };
  
  const openFilePreview = async (fileId) => {
    const authToken = await getToken();
    try {
        const response = await fetch(
            `https://graph.microsoft.com/v1.0/me/drive/items/${fileId}/preview`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.ok) {
            const data = await response.json();
            const previewUrl = data.getUrl; // The URL to preview the file

            if (previewUrl) {
                window.open(previewUrl, "_blank"); // Open the preview URL in a new tab
            } else {
                alert("Unable to retrieve file preview URL.");
            }
        } else {
            console.error("Error fetching preview URL:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }

};
  const handleChangeTaskStatus = async (value) => {
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
  const handleFileView = async () => {
    if (item.taskType == 2 && item.status == 2) {
      if (!account) {
        await login();
        setAccount(instance.getActiveAccount());
        toast.info("Please login and then try again.");
      }else if(instance.getActiveAccount()) {
        const folderName = `${caseObj?.clientName}-${caseObj?.premisesName}-${localStorage.getItem("c_id").split('-')[0]}`;
        const fileName = `${caseObj?.clientName}-${caseObj?.premisesName}-${item?.name}`;

        fetchAndPreviewFile(folderName, fileName)
      } else {
        toast.info("something went wrong.");
      }
    }
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
    } else if (completedCount === 0) { // dont have any completed task
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
        <li className="flex justify-between items-center mb-3 task-checklist mt-3">
          <div className="flex items-center gap-2 custom-radio">
            <Checkbox id={checkboxId} checked={taskStatus === 2} className="mr-6" onChange={() => handleChangeTaskStatus()} />
              <div onClick={() => handleFileView()}>
              <Label  className="flex items-center lg:text-base xl:text-base text-secondary-800 font-medium" >
              {displayIcon && <span className="mr-2 text-3xl">{displayIcon}</span>}
              {/* {stageId }: */}
              {actionInfo}
            </Label>
              </div>
          
          </div>
          <div>
            <p className="text-end mb-2">
              <span className={`bg-badge-${taskStatusColor?.badgeClass} text-secondary-100 text-sm font-semibold px-4 py-1 rounded-full inline-block`}>
                {taskStatusColor?.label}
              </span>
            </p>
            <div className="items-dropdown single-select option-dropdown mt-3">
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
      {isSignUpload && <SignFileModal fileName={fileName} taskName={item?.name} generalUpload={false} onUpload={(value) => handleChangeTaskStatus(value)} onClose={()=>setIsSignUpload(!isSignUpload)} />}
      {isUploadFileModalOpen && <UploadFileModal fileName={fileName} taskName={item?.name} generalUpload={false} onUpload={(value) => handleChangeTaskStatus(value)} onClose={toggleUploadFileModal} />}
      {isCompose ? <ComposeEmail taskItem={item} templates={templates} onClose={toggleComposeModal} onSendEmail={(value) => handleChangeTaskStatus(value)} /> : ""}
      {isGmeetModalOpen && <GoogleMeetModal title={`${caseObj?.clientName}-${caseObj?.premisesName}-${item?.name}`} onClose={toggleGMeetModal} />}
    </>
  );
};

export default ChecklistItem;
