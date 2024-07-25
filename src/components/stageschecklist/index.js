import React from "react";
import { MdFileCopy } from "react-icons/md";
import { TbFolderSearch } from "react-icons/tb";
import { Progress } from "flowbite-react";
import XButton from "../button/XButton";
import ChecklistItem from "../checklist";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { PiFolderLight } from "react-icons/pi";
import { FaCircle } from "react-icons/fa";
import { CgFolder } from "react-icons/cg";
import { BiMessageAltCheck } from "react-icons/bi";
import { LuUpload } from "react-icons/lu";

const StagesChecklist = ({label}) => {
  const checklistItems = [
    {
      icon: <MdFileCopy />,
      label: "Purchase Binder",
      options: [
        { value: "Option1", label: "Option1" },
        { value: "Option2", label: "Option2" },
      ],
      checkboxId: "accept",
    },
    {
      icon: <TbFolderSearch />,
      label: "Premises research",
      options: [
        { value: "Option1", label: "Option1" },
        { value: "Option2", label: "Option2" },
      ],
      checkboxId: "accept",
    },
    {
      icon: <BiMessageAltCheck />,
      label: "Client Confirmation",
      options: [
        { value: "Option1", label: "Option1" },
        { value: "Option2", label: "Option2" },
      ],
      checkboxId: "accept",
    },
  ];

  const progressItems = [
    { progress: 50, textLabel: "Start" },
    { progress: 50, textLabel: "Contract" },
    { progress: 50, textLabel: "Mortgage & Title" },
    { progress: 50, textLabel: "Closing" },
  ];
  return (
    <div className="col-span-8">
      <div className="bg-white py-4 rounded-2xl mb-5">
        <div className="px-4">
        <div className="mb-6">
          <span className="text-base text-secondary-800 font-medium">Stage Tracking</span>
        </div>   
        <div className="w-full">
        <div className="flex gap-2 progress-bars">
          {progressItems.map((item, index) => (
            <Progress
              key={index}
              progress={item.progress}
              textLabel={item.textLabel}
              size="lg"
              labelProgress
              labelText
              className="custom-progress"
            />
          ))}
        </div>
          {label && <span className="block mt-4 text-sm text-secondary-800 font-medium"><FaCircle className="inline-block text-[6px] mr-1" /> {label}</span>}
        </div>
        </div>
      </div>
      <div className="bg-white py-4 rounded-2xl mb-5">
          <div className="flex justify-between items-center mb-8 px-4">
            <span className="ext-base text-secondary-800 font-medium">Task Checklist</span>
            {/* <span className="text-base text-text-purple font-medium">
              + Add Item
            </span> */}
         <div className="flex items-center gap-2">
            <FiPlus className="text-lg"/>
            <BsThreeDotsVertical className="text-lg"/>
          </div>     
          </div>
          <ul className="mb-6 overflow-y-auto">
            {checklistItems.map((item, index) => (
              <ChecklistItem
                key={index}
                icon={item.icon}
                label={item.label}
                options={item.options}
                isChecked={item.isChecked}
                checkboxId={item.checkboxId}
              />
            ))}
          </ul>
          <div className="flex justify-between items-center pt-5 px-4">
            <XButton
              text="Back to previous stage
"
              className="btn-theme btn-disabled"
            />
            <XButton text="Move to next stage" className="btn-theme btn-disabled" />
        </div>
      </div>
       <div className="grid gap-4 grid-cols-6">
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
  );
};

export default StagesChecklist;
