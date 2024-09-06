import React from 'react';

const StepperProgress = ({ steps, currentStep }) => {
  return (
    <ol className="flex items-center justify-between w-full">
      {steps.map((step, index) => (
        <li
          key={index}
          className={`w-[88%] stepper-li relative after:content-[''] after:w-full after:h-1 after:border-b after:border-8 after:inline-block after:absolute after:top-2 after:left-[26px] bg-white z-1 ${index < steps.length - 1
              ? ""
              : ""
            } ${index < currentStep
              ? "text-blue-600 dark:text-blue-500 after:border-primary2 dark:after:border-blue-800"
              : "after:border-active-blue dark:after:border-gray-700"
            }`}
        >
          <span>
            {index < currentStep ? (
              // Completed step icon
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1"
                  y="1"
                  width="22"
                  height="22"
                  rx="11"
                  fill="#366093"
                />
                <rect
                  x="1"
                  y="1"
                  width="22"
                  height="22"
                  rx="11"
                  stroke="#366093"
                  strokeWidth="2"
                />
                <path
                  d="M17.3333 8L9.99996 15.3333L6.66663 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : index === currentStep ? (
              // Current active step icon
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1.75"
                  y="1"
                  width="22"
                  height="22"
                  rx="11"
                  fill="white"
                />
                <rect
                  x="1.75"
                  y="1"
                  width="22"
                  height="22"
                  rx="11"
                  stroke="#366093"
                  strokeWidth="2"
                />
                <circle cx="12.75" cy="12" r="6" fill="#366093" />
              </svg>
            ) : (
              // Inactive step icon
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="1" y="1" width="22" height="22" rx="11" fill="white" />
                <rect
                  x="1"
                  y="1"
                  width="22"
                  height="22"
                  rx="11"
                  stroke="#C5DCFF"
                  strokeWidth="2"
                />
              </svg>
            )}
          </span>

          <span className="mt-2 inline-block text-secondary-800 font-medium text-[12px] xl:text-base">
            {step}
          </span>

        </li>
      ))}
    </ol>


  );
};

export default StepperProgress;


