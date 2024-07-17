import React from "react";

const XButton = ({ text, onClick, type }) => {
  return (
    <button
      type={type}
      className="bg-primary text-sm text-white py-[10px] px-6 rounded-[100px]"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default XButton;
