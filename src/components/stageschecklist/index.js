import React from "react";
import { MdFileCopy } from "react-icons/md";
import { TbFolderSearch } from "react-icons/tb";
import { Progress } from "flowbite-react";
import XButton from "../button/XButton";
import ChecklistItem from "../checklist";

const StagesChecklist = () => {
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
  ];

  const progressItems = [
    { progress: 50, textLabel: "Start" },
    { progress: 50, textLabel: "Contract" },
    { progress: 50, textLabel: "Mortgage & Title" },
    { progress: 50, textLabel: "Closing" },
  ];
  return (
    <div className="col-span-8">
      <div className="bg-white py-4 px-6 rounded-lg mb-5">
        <div className="mb-6">
          <span className="text-base text-title font-medium">Stages</span>
        </div>
        <div className="flex gap-2 w-full progress-bars border-b border-b-border mb-10 pb-10">
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
        <div>
          <div className="flex justify-between items-center mb-8">
            <span className="text-base text-label">Checklist</span>
            <span className="text-base text-text-purple font-medium">
              + Add Item
            </span>
          </div>
          <ul className="h-96 mb-6 overflow-y-auto">
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
          <div className="flex justify-between items-center border-t border-t-border pt-6 mb-10">
            <XButton
              text="Move to previous stage
"
              className="btn-theme btn-disabled"
            />
            <XButton text="Move to next status" className="btn-theme" />
          </div>
        </div>
      </div>
      <XButton
        text="One Drive->"
        className="bg-white text-base text-label py-5 px-7 rounded-lg w-80"
      />
    </div>
  );
};

export default StagesChecklist;
