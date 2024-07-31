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

const StagesChecklist = ({ label }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState('mortgage'); // State to track active tab

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
      action: "Upload",
      actionInfo: "Inspection report",
      options: "Uploaded",
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
      action: "Contact",
      actionInfo: "Inform the client about the upcoming timeline",
      options: "No Response",
      checkboxId: "accept",
    },
  ];

  const titleTasks = [
    {
      action: "Upload",
      actionInfo: "Upload title commitment",
      options: "Unuploaded",
      checkboxId: "accept",
    },
    {
      action: "Contact",
      actionInfo: "Contact title company",
      options: "Not Started",
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

  const handleNextStage = () => {
    if (currentStep < stepperItems.length - 1) {
      setCurrentStep(currentStep + 1);
      setActiveTab('mortgage'); // Reset active tab to mortgage when changing step
    }
  };

  const handlePreviousStage = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setActiveTab('mortgage'); // Reset active tab to mortgage when changing step
    }
  };

  const getChecklistItems = () => {
    if (currentStep === 3) {
      // Return the active tab's items for the Mortgage & Title step
      return activeTab === 'mortgage' ? stepperItems[currentStep].mortgageTasks : stepperItems[currentStep].titleTasks;
    }
    return stepperItems[currentStep];
  };
  console.log(currentStep, "step")
  return (
    <div className="col-span-8">
      <div className="bg-white py-4 rounded-2xl mb-5">
        <div className="px-4">
          <div className="mb-6">
            <span className="text-base text-secondary-800 font-medium">Stage Tracking</span>
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
            <div className="flex justify-start space-x-4">
              <span
                className={`py-0 px-3 cursor-pointer ${activeTab === 'mortgage' ? 'text-base text-secondary-800 font-medium border-b-2 border-black-600' : 'text-gray-400'}`}
                onClick={() => setActiveTab('mortgage')}
              >
                Mortgage Task
              </span>
              <span
                className={`py-0 px-3 cursor-pointer ${activeTab === 'title' ? 'text-base text-secondary-800 font-medium border-b-2 border-black-600' : 'text-gray-400'}`}
                onClick={() => setActiveTab('title')}
              >
                Title Task
              </span>
            </div>
          ) : (
            <span className="text-base text-secondary-800 font-medium">{getHeadLabel(currentStep)}</span>
          )}
          <div className="flex items-center gap-2">
            <FiPlus className="text-lg" />
            <BsThreeDotsVertical className="text-lg" />
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
            className="btn-theme"
            onClick={handlePreviousStage}
            disabled={currentStep === 0}
          />
          <XButton text="Move to next stage" className="btn-theme" onClick={handleNextStage} />
        </div>
      </div>
      <div className="flex justify-end justify-content:flex-end">
        <div className="grid gap-4 grid-cols-2 ">
          <XButton
            text="One Drive"
            icon={<CgFolder className="text-base mr-2 inline-block font-medium" />}
            className="bg-white shadow-shadow-light text-secondary-800 py-3 px-6 rounded-full font-medium"
          />
          <XButton
            text="Upload File"
            icon={<LuUpload className="text-base mr-2 inline-block font-medium" />}
            className="bg-white shadow-shadow-light text-secondary-800 py-3 px-6 rounded-full font-medium"
          />
        </div>
      </div>
    </div>
  );
};


export default StagesChecklist;
