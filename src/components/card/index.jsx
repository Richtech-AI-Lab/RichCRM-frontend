import React from "react";
import { daysLeft } from "../../utils";

const Card = ({ title, dueText, dueInDays, data }) => {

  return (
    <div className="card shadow-card">
      <p className="text-[22px] text-secondary-800 font-medium leading-[30px] mb-[18px]">
        <span>{data.mortgageContingencyDate ? "Mortgage":"Closing"} is Due in</span>
        <span className="text-error ml-2">{data.mortgageContingencyDate ? daysLeft(data.mortgageContingencyDate) : daysLeft(data.closingDate)} days</span>
      </p>
      <p className="text-base text-secondary-800 font-semibold mb-1">{data.clientName}</p>
          <p className="text-sm text-secondary-800 font-medium mb-1">{data.premisesName}</p>
          <span className="text-sm text-secondary-300">{data.caseType ? "Selling" : "Purchasing"}</span>
    </div>
  );
};

export default Card;
