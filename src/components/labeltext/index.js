import React from "react";

const LabelText = ({ labelText, count }) => {
  return (
    <p className="text-secondary-100 text-base leading-[30px] font-semibold mb-5">
      {labelText}{" "}
      <span className="text-text-blue-300 font-extrabold ml-4">{count}</span>
    </p>
  );
};

export default LabelText;
