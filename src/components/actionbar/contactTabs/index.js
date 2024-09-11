import React from "react";

const ContactTabs = ({ active, setActive, tabs, isAddFromContactModal }) => {
  return (
    <div className="flex">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => {
            setActive(tab.id);
          }}
          className={`${active === tab.id
              ? `${isAddFromContactModal ? "bg-input-surface" : "bg-bg-gray-100"
              }`
              : ""
            } px-4 py-2 rounded-full mr-4 cursor-pointer`}
        >
          <span className="text-base font-medium text-secondary-800">
            {tab.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ContactTabs;
