import React from "react";

const LabelText = ({ labelText, count }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <p className="text-secondary-100 text-base leading-[30px] font-semibold mb-5">
        {labelText}{" "}
      </p>
      <span className="text-text-blue-300 font-extrabold ml-4">{count}</span>
    </div>
  );
};

export default LabelText;
