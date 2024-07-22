import React from "react";

const UpcomingEventCard = ({ title, description, time }) => {
  return (
    <div className="p-4 bg-input-surface rounded-2xl mb-2">
      <div className="flex items-center">
      <div className="text-center mr-4">
        <p className="text-[34px] leading-8 text-secondary-800 mb-1">8</p>
        <p className="text-[14px] leading-5 text-secondary-800 font-medium">AUG</p>
      </div>
      <div>
      <p className="text-base leading-6 text-secondary-800 font-medium">{title}</p>
      <p className="text-sm leading-5 text-secondary-700 mb-3">
        {description}
      </p>
      <p className="text-base text-secondary-800 font-medium">{time}</p>
      </div>
      </div>
    </div>
  );
};

export default UpcomingEventCard;
