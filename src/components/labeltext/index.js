import React from "react";

const LabelText = ({ labelText, count }) => {
  return (
    <div className="flex items-cente p-4 bg-white rounded-tl-3xl rounded-tr-3xl shadow-shadow-light">
      <p className="text-secondary-800 text-base leading-[30px] font-semibold mr-2">
        {labelText}{" "}
      </p>
      <span className="text-secondary-800 font-semibold text-sm bg-badge-gray rounded-full w-8 h-8 p-1 inline-block text-center leading-[22px]">{count}</span>
    </div>
  );
};

export default LabelText;
