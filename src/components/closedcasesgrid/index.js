import React from "react";
import CardItem from "../carditem";

const ClosedCasesGrid = ({ closedCases }) => {
  return (
    <div className="card bg-card-300 px-2 py-3">
      <div className="grid grid-cols-4 gap-2">
        {closedCases.map((item, index) => (
          <CardItem
            key={index}
            caseDetails={item?.premisesId}
            caseTitle={item?.clientName }
            closedCases={closedCases}
            caseType={item?.caseType}
          />
        ))}
      </div>
    </div>
  );
};

export default ClosedCasesGrid;
