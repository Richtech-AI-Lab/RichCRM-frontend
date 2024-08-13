import React, { useState } from "react";
import { MdFileCopy } from "react-icons/md";
import { TbFolderSearch } from "react-icons/tb";
import XButton from "../button/XButton";
import ChecklistItem from "../checklist";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { PiFolderLight } from "react-icons/pi";
import { FaCircle, FaClipboardList } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { CgFolder } from "react-icons/cg";
import { BiMessageAltCheck } from "react-icons/bi";
import { LuUpload } from "react-icons/lu";
import StepperProgress from "../stepperProgress";
import { Dropdown } from "flowbite-react";
import MenuDropdown from "../menupopup";
import MenuPopup from "../menupopup";
import { useDispatch, useSelector } from "react-redux";
import { createStageRequest } from "../../redux/actions/stagesActions";
import { STAGESNAMES } from "../../constants/constants";

const StagesChecklist = ({ label }) => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState('mortgage');
  const menuOption1 = ['Create a Task', 'Add a Task']
  const menuOption2 = ['Finish all', 'Edit task']
  const { loading, data, error } = useSelector((state) => state.stages);


  const settingUpTasks = [
    {
      action: "Action",
      actionInfo: "Case set up",
      options: "Finished",
      checkboxId: "accept",
    },
    {
      action: "Upload",
      actionInfo: "Inspection report",
      options: "Uploaded",
      checkboxId: "accept",
    },
    {
      action: "Contact",
      actionInfo: "Confirm case details with client",
      options: "Not Started",
      checkboxId: "accept",
    },
  ];

  const contractReviewingTasks = [
    {
      action: "Upload",
      actionInfo: "Initial contract",
      options: "Uploaded",
      checkboxId: "accept",
    },
    {
      action: "Contact",
      actionInfo: "Schedule contract review with client",
      options: "Waiting",
      checkboxId: "accept",
    },
    {
      action: "Action",
      actionInfo: "Contract review",
      options: "Unfinished",
      checkboxId: "accept",
    },
    {
      action: "Contact",
      actionInfo: "Collect signed contract and deposit from client",
      options: "Not Started",
      checkboxId: "accept",
    },
    {
      action: "Upload",
      actionInfo: "Initial contract",
      options: "Unuploaded",
      checkboxId: "accept",
    },
    {
      action: "Upload",
      actionInfo: "Deposit",
      options: "Unuploaded",
      checkboxId: "accept",
    },

  ];

  const contractSigningTasks = [
    {
      action: "Action",
      actionInfo: "Confirm wire info with seller",
      options: "Finished",
      checkboxId: "accept",
    },
    {
      action: "Action",
      actionInfo: "Send the deposit",
      options: "Finished",
      checkboxId: "accept",
    },
    {
      action: "Contact",
      actionInfo: "Inform the seller about the sending, and request the fully signed contract",
      options: "Completed",
      checkboxId: "accept",
    },
    {
      action: "Upload",
      actionInfo: "Fully signed contract",
      options: "Uploaded",
      checkboxId: "accept",
    },
  ];

  // Separate items for Mortgage and Title tasks
  const mortgageTasks = [
    {
      action: "Action",
      actionInfo: "Set up mortgage due date",
      options: "Finished",
      checkboxId: "accept",
    },
    {
      action: "Action",
      actionInfo: "Set up mortgage due date",
      options: "Finished",
      checkboxId: "accept",
    },
    {
      action: "Contact",
      actionInfo: "Inform the client about the upcoming timeline",
      options: "No Response",
      checkboxId: "accept",
    },
    {
      action: "Upload",
      actionInfo: "Commitment Letter",
      options: "Unuploaded",
      checkboxId: "accept",
    },
    {
      action: "Contact",
      actionInfo: "Send the commitment to title company and seller ",
      options: "Not Started",
      checkboxId: "accept",
    },
    {
      action: "Upload",
      actionInfo: "Bank CTC",
      options: "Unuploaded",
      checkboxId: "accept",
    },
  ];

  const titleTasks = [
    {
      action: "Action",
      actionInfo: "Order title",
      options: "Finished",
      checkboxId: "accept",
    },
    {
      action: "Upload",
      actionInfo: "Title report",
      options: "Unuploaded",
      checkboxId: "accept",
    },
    {
      action: "Contact",
      actionInfo: "Confirm the title with client",
      options: "Not Started",
      checkboxId: "accept",
    },
    {
      action: "Upload",
      actionInfo: "All Cleared Title",
      options: "Unuploaded",
      checkboxId: "accept",
    },
  ];

  const closingTasks = [
    {
      action: "Action",
      actionInfo: "Schedule closing date",
      options: "Unfinished",
      checkboxId: "accept",
    },
    {
      action: "Contact",
      actionInfo: "Inform closing information to everyone engaged",
      options: "Not Started",
      checkboxId: "accept",
    },
    {
      action: "Contact",
      actionInfo: "Calculate the checks needed and inform the client",
      options: "Not Started",
      checkboxId: "accept",
    },
    {
      action: "Action",
      actionInfo: "Closing event",
      options: "Unfinished",
      checkboxId: "accept",
    },
    {
      action: "Upload",
      actionInfo: "All closing files",
      options: "Unuploaded",
      checkboxId: "accept",
    },
    {
      action: "Contact",
      actionInfo: "Collect feedbacks from the client",
      options: "Not Started",
      checkboxId: "accept",
    },
  ];

  const progressItems = [
    "Setting up",
    "Contract Reviewing",
    "Contract Signing",
    "Mortgage & Title",
    "Closing"
  ];

  const stepperItems = [
    settingUpTasks,
    contractReviewingTasks,
    contractSigningTasks,
    // Include mortgageTasks and titleTasks as separate items for the Mortgage & Title step
    { mortgageTasks, titleTasks },
    closingTasks,
  ];

  const getHeadLabel = (currentStep) => {
    switch (currentStep) {
      case 0:
        return "Setting up Tasks";
      case 1:
        return "Contract Reviewing Tasks";
      case 2:
        return "Contract Signing Tasks";
      case 3:
        return activeTab === 'mortgage' ? "Mortgage Tasks" : "Title Tasks"; // Update label based on active tab
      case 4:
        return "Closing Tasks";
      default:
        return <></>;
    }
  };


  const handlePreviousStage = async () => {
    if (currentStep > 0) {
      const createStagePayload = {
        stageType: currentStep - 1,
        caseId: "1_f7858dbf-70ea-4e42-a8b5-331a39d11296_e42e5350-6090-4576-bbd9-8c5180b606d5",
      };

      try {
        const stageExists = await checkStageExists(createStagePayload);
        if (stageExists === false) {
          const response = await dispatch(createStageRequest(createStagePayload));
          setCurrentStep(currentStep - 1);
          setActiveTab("mortgage");
        } else {
          setCurrentStep(currentStep - 1);
          setActiveTab("mortgage");
          console.log("Stage already exists. Skipping API call.");
        }
      } catch (error) {
        console.error("Error creating stage:", error.message);
      }
    }
  };

  const handleNextStage = async () => {
    if (currentStep < stepperItems.length - 1) {
      const createStagePayload = {
        stageType: currentStep + 1,
        caseId: "1_f7858dbf-70ea-4e42-a8b5-331a39d11296_e42e5350-6090-4576-bbd9-8c5180b606d5",
      };

      try {
        const stageExists = await checkStageExists(createStagePayload);
        if (stageExists === false) {
          const response = await dispatch(createStageRequest(createStagePayload));
          setCurrentStep(currentStep + 1);
          setActiveTab("mortgage"); // Reset active tab to mortgage when changing step
        } else {
          setCurrentStep(currentStep + 1);
          setActiveTab("mortgage");
          console.log("Stage already exists. Skipping API call.");
        }
      } catch (error) {
        console.error("Error creating stage:", error.message);
      }
    }
  };

  const checkStageExists = async ({ stageType, caseId }) => {
    let stagekey = `${stageType}`
    return data.hasOwnProperty(STAGESNAMES[stagekey])
  };


  const getChecklistItems = () => {
    if (currentStep === 3) {
      // Return the active tab's items for the Mortgage & Title step
      return activeTab === 'mortgage' ? stepperItems[currentStep].mortgageTasks : stepperItems[currentStep].titleTasks;
    }
    return stepperItems[currentStep];
  };
  return (
    <div className="col-span-8">
      <div className="bg-white py-4 rounded-2xl mb-5">
        <div className="px-4">
          <div className="mb-6">
            <span className="text-base text-secondary-800 font-medium">Stage</span>
          </div>
          <div className="w-full">
            <div className="flex gap-2 progress-bars">
              <StepperProgress steps={progressItems} currentStep={currentStep} />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-4 rounded-2xl mb-5">
        <div className="flex justify-between items-center mb-8 px-4">
          {/* <span className="text-base text-secondary-800 font-medium">{getHeadLabel(currentStep)}</span> */}

          {currentStep === 3 ? (
            <div className="flex justify-start gap-x-8">
              <span
                className={`pb-4 cursor-pointer ${activeTab === 'mortgage' ? 'text-base text-secondary-800 font-medium border-b-[3px] border-primary' : 'text-gray-400'}`} onClick={() => setActiveTab('mortgage')}
              >
                Mortgage Task (1/5)
              </span>
              <span
                className={`pb-4 cursor-pointer ${activeTab === 'title' ? 'text-base text-secondary-800 font-medium border-b-[3px] border-primary' : 'text-gray-400'}`}
                onClick={() => setActiveTab('title')}
              >
                Title Task (1/4)
              </span>
            </div>
          ) : (
            <span className="text-base text-secondary-800 font-medium">{`${getHeadLabel(currentStep)} (2/3)`}</span>
          )}
          <div className="flex items-center gap-2">

            <MenuPopup dropdownItems={menuOption1} icon={<FiPlus className="text-lg opacity-40" />} />
            <MenuPopup dropdownItems={menuOption2} icon={<BsThreeDotsVertical className="text-secondary-800 opacity-40" />} />
          </div>
        </div>
        <ul className="mb-6 overflow-y-auto">
          {getChecklistItems().map((item, index) => (
            <ChecklistItem
              key={index}
              action={item.action}
              actionInfo={item.actionInfo}
              options={item.options}
              checkboxId={item.checkboxId}
            />
          ))}
        </ul>
        <div className="flex justify-between items-center pt-5 px-4">
          <XButton
            text="Back to previous stage"
            className={`bg-card-300 rounded-full text-sm font-medium py-[10px] px-6 ${currentStep === 0 ? 'opacity-50 cursor-not-allowed text-secondary-300' : 'text-secondary-800'}`}
            onClick={handlePreviousStage}
            disabled={currentStep === 0}
          />
          <XButton
            text={currentStep === stepperItems?.length - 1 ? "Close Case" : "Move to next stage"}
            className="bg-active-blue text-active-blue-text shadow-shadow-light rounded-full text-sm font-medium py-[10px] px-6" onClick={handleNextStage} />
        </div>
      </div>
    </div>
  );
};


export default StagesChecklist;
