import React from "react";

const Card = ({ title, dueText, dueInDays }) => {
  return (
    <div className="card">
      <p className="text-secondary-100 text-base leading-6 mb-1">{title}</p>
      <p className="text-xl font-medium leading-[30px] mb-[18px]">
        <span>{dueText}</span>
        <span className="text-text-red ml-2">{dueInDays}</span>
      </p>
      <div className="text-right py-2">
        <a className="font-medium text-base leading-5 text-secondary-300">
          Ignore
        </a>
        <a className="font-medium text-base leading-5 text-text-blue-100 ml-8">
          View Details
        </a>
      </div>
    </div>
  );
};

export default Card;
