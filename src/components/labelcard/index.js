import React from "react";

const LabelCard = ({ labelCardText,icon }) => {
  return (
    <div className="flex  items-center  px-4  mb-[20px]">
      <span>
        {icon}
        {labelCardText}
      </span>
    </div>
  );
};

export default LabelCard;
