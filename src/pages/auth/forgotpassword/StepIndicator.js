import React from "react";

const StepIndicator = ({ currentStep }) => {
  const steps = ["Step 1", "Step 2", "Step 3"];

  return (
    <div className="flex justify-between items-center mb-5">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        return (
          <div
            key={index}
            className={`flex-1 text-center ${
              index !== steps.length ? "mx-2" : ""
            }`}
          >
            <div
              className={`h-1 mt-1 rounded-full ${
                isActive ? "bg-primary" : "bg-gray-300"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
