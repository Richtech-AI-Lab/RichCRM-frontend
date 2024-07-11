import React from "react";
import { Button } from "react-bootstrap";

const XButton = ({ variant, onClick, children, className, type }) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      className={className}
      type={type}
    >
      {children}
    </Button>
  );
};

export default XButton;
