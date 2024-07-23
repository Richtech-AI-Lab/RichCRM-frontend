import React from "react";

const XButton = ({ text, onClick, type, className, icon }) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {icon}
      {text}
    </button>
  );
};

export default XButton;
