import React from "react";
import { Spinner } from "flowbite-react";

const XSpinnerLoader = ({ size = "md", loading }) => {
  if (!loading) return null;

  return (
    <div className="spinner-overlay">
      <div className="spinner-container">
        <Spinner
          animation="border"
          role="status"
          variant="primary"
          className={`spinner-${size}`}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </div>
  );
};

export default XSpinnerLoader;
