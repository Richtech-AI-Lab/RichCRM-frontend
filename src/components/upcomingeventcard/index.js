import React from "react";

const UpcomingEventCard = ({ title, description, time }) => {
  return (
    <div className="py-4 listing-border">
      <p className="text-base leading-6 text-black font-medium">{title}</p>
      <p className="text-sm leading-5 text-secondary-600 font-medium mb-3">
        {description}
      </p>
      <p className="text-base text-secondary-600 font-medium">{time}</p>
    </div>
  );
};

export default UpcomingEventCard;
