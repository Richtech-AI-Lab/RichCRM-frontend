import React from "react";
import { Button } from "flowbite-react";
const XButton = ({ color, onClick, children, className, type }) => {
  return (
    <Button color={color} onClick={onClick} className={className} type={type}>
      {children}
    </Button>
  );
};

export default XButton;
