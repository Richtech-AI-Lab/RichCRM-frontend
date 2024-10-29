import React, { useEffect, useState } from "react";
import { daysLeft } from "../../utils";
import { IoWarning } from "react-icons/io5";

const Card = ({ title, dueText, dueInDays, data }) => {
  const [showAlert, setShowAlert] = useState(false);

  // Calculate the days left based on mortgageContingencyDate or closingDate
  const remainingDays = data.mortgageContingencyDate
    ? daysLeft(data.mortgageContingencyDate)
    : daysLeft(data.closingDate);

  // Set showAlert if days are negative (i.e., past due)
  useEffect(() => {
    if (remainingDays < 0) {
      setShowAlert(true);
    }
  }, [remainingDays]);

  return (
    <div className="card shadow-card">
      {showAlert && (
        <>
          <div className="flex items-center text-red-600 mb-3">
            <IoWarning className="text-base mr-2 inline-block" />
            <span>Case has a past closing date but remains open</span>
          </div>
          <p className="text-[22px] text-secondary-800 font-medium leading-[30px] mb-[18px]">
            <span>
              {data.mortgageContingencyDate ? "Mortgage" : "Closing"} Overdue by
            </span>
            <span className="text-error ml-2">
              {Math.abs(remainingDays)} days
            </span>
          </p>
        </>
      )}

      {!showAlert && (
        <p className="text-[22px] text-secondary-800 font-medium leading-[30px] mb-[18px]">
          <span>
            {data.mortgageContingencyDate ? "Mortgage" : "Closing"} is Due in
          </span>
          <span className="text-error ml-2">
            {data.mortgageContingencyDate
              ? daysLeft(data.mortgageContingencyDate)
              : daysLeft(data.closingDate)}{" "}
            days
          </span>
        </p>
      )}
      <p className="text-base text-secondary-800 font-semibold mb-1">
        {data.clientName}
      </p>
      <p className="text-sm text-secondary-800 font-medium mb-1">
        {data.premisesName}
      </p>
      <span className="text-sm text-secondary-300">
        {data.caseType ? "Selling" : "Purchasing"}
      </span>
    </div>
  );
};

export default Card;
