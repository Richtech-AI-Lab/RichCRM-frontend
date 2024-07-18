import React from "react";
import Badge from "../badge";

const LabelCard = ({ labelCardText, count, badgeColor }) => {
  return (
    <div className="flex justify-between items-center border border-border px-4 py-[10px] rounded-lg mb-[30px]">
      <Badge color={badgeColor}>{labelCardText}</Badge>
      <span className="text-text-blue-300 font-extrabold ml-4">{count}</span>
    </div>
  );
};

export default LabelCard;
