import React from "react";

const XButton = ({ text, onClick, type, className, icon, disable=false}) => {
  return (
    <button type={type} className={className} disabled={disable} onClick={onClick}>
      {icon}
      {text}
    </button>
  );
};

export default XButton;
