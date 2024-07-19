import React from "react";

const XButton = ({ text, onClick, type,className }) => {
  return (
    <button
      type={type}
      className={className }
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default XButton;
