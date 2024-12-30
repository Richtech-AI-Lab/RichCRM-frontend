import React from "react";
import CardItem from "../carditem";
import { ROUTES } from "../../constants/api";
import { useNavigate } from "react-router-dom";

const ClosedCasesGrid = ({ closedCases }) => {
  const navigate = useNavigate();
  const handleCaseCardClick = (casedetails) => {
    localStorage.setItem("c_id", casedetails?.caseId)
    navigate(ROUTES.CASES_DATA, { state: { casedetails } });
  };
  return (
    <div className="card bg-card-300 px-2 py-3 min-h-[calc(100vh-230px)]">
      {closedCases?.length >0 ? <div className="grid grid-cols-4 gap-2">
        {closedCases.map((item, index) => (
          <CardItem
            item={item}
            key={index}
            onClick={() => { handleCaseCardClick(item); }}
            caseStatus={item?.caseStatus}
            caseDetails={item?.premisesId}
            caseTitle={item?.clientName}
            closedCases={closedCases}
            caseType={item?.caseType}
          />
        ))}



      </div>:
      <div className="flex items-center justify-center h-[60vh] w-full">
          <p className="text-center text-gray-500">No closed cases available</p>
        </div>}
    </div>
  );
};

export default ClosedCasesGrid;
