import React from "react";
import { Card } from "../../components"; // Assuming you have a Card component
import { useSelector } from "react-redux";
import { daysLeft } from "../../utils";

const CaseAlert = () => {
  const { cases } = useSelector((state) => state?.case?.casesData);
  const casesWithDates = cases.filter((caseItem) => caseItem.closingDate || caseItem.mortgageContingencyDate);
  const filteredCases = casesWithDates
  .map((caseItem) => {
    // Get the date to check (either closingDate or mortgageContingencyDate)
    const targetDate = caseItem.closingDate || caseItem.mortgageContingencyDate;

    // Calculate days left using the provided function
    const days = daysLeft(targetDate);

    // Return the case data along with the days left
    return { ...caseItem, dueInDays: days };
  })
  .filter((caseItem) => caseItem.dueInDays <= 7);
  return (
    <div className="remders rounded-[32px] scroller-remove shadow-shadow-light">
       <p class="text-[18px] text-secondary-800 font-medium leading-[30px] mb-[18px]"><span>Reminders</span></p>
      <div className="col-span-12 md">
        <div className="flex flex-col">
          {filteredCases?.map((data, index) => (
            <Card
              key={index}
              title={data.title}
              dueText={data.dueText}
              dueInDays={data.dueInDays}
              data={data}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseAlert;
