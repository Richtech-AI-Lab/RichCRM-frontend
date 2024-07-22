import React from "react";

const Card = ({ title, dueText, dueInDays }) => {
  return (
    <div className="card shadow-card">
      <p className="text-secondary-800 text-base leading-6 mb-1 font-medium">{title}</p>
      <span className="text-secondary-700 text-sm mb-4 block">Selling</span>
      <p className="text-[22px] font-medium leading-[30px] mb-[18px]">
        <span>{dueText}</span>
        <span className="text-text-red ml-2">{dueInDays}</span>
      </p>
      <div className="text-right py-4 pr-8">
        <a className="font-medium text-base leading-5 text-secondary-900">
          Ignore
        </a>
        <a className="font-medium text-base leading-5 text-primary2 ml-8">
          View Details
        </a>
      </div>
    </div>
  );
};

export default Card;
