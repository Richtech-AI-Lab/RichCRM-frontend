import React, { useState } from "react";
import { Actionbar, CardGrid } from "../../components";
import { casesCardData, closedCasesCardData } from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/api";
import ClosedCasesGrid from "../../components/closedcasesgrid";

const Cases = () => {
  const [filter, setFilter] = useState("Open");
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(ROUTES.CASES_CATEGORY);
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const closedCases = [
    { caseDetails: "535 W 52nd St #9G coop", caseTitle: "Gee, First Name" },
    { caseDetails: "535 W 52nd St #9G coop", caseTitle: "Gee, First Name" },
    { caseDetails: "535 W 52nd St #9G coop", caseTitle: "Gee, First Name" },
    { caseDetails: "535 W 52nd St #9G coop", caseTitle: "Gee, First Name" },
    { caseDetails: "535 W 52nd St #9G coop", caseTitle: "Gee, First Name" },
    { caseDetails: "535 W 52nd St #9G coop", caseTitle: "Gee, First Name" },
    { caseDetails: "535 W 52nd St #9G coop", caseTitle: "Gee, First Name" },
    { caseDetails: "535 W 52nd St #9G coop", caseTitle: "Gee, First Name" },
    { caseDetails: "535 W 52nd St #9G coop", caseTitle: "Gee, First Name" },
    { caseDetails: "535 W 52nd St #9G coop", caseTitle: "Gee, First Name" },
    { caseDetails: "535 W 52nd St #9G coop", caseTitle: "Gee, First Name" },
    { seDetails: "535 W 52nd St #9G coop", caseTitle: "Gee, First Name" },
    { seDetails: "535 W 52nd St #9G coop", caseTitle: "Gee, First Name" },
    { caseDetails: "535 W 52nd St #9G coop", caseTitle: "Gee, First Name" },
    { caseDetails: "535 W 52nd St #9G coop", caseTitle: "Gee, First Name" },
    { caseDetails: "535 W 52nd St #9G coop", caseTitle: "Gee, First Name" },
    { caseDetails: "535 W 52nd St #9G coop", caseTitle: "Gee, First Name" },
    { caseDetails: "535 W 52nd St #9G coop", caseTitle: "Gee, First Name" },
    { caseDetails: "535 W 52nd St #9G coop", caseTitle: "Gee, First Name" },
    { caseDetails: "535 W 52nd St #9G coop", caseTitle: "Gee, First Name" },
    { caseDetails: "535 W 52nd St #9G coop", caseTitle: "Gee, First Name" },
  ];

  return (
    <div className="mt-14">
      <Actionbar onFilterChange={handleFilterChange} />
      {filter === "Open" ? (
        <CardGrid cards={casesCardData} onCardClick={handleCardClick} />
      ) : (
        <ClosedCasesGrid closedCases={closedCases} />
      )}
    </div>
  );
};

export default Cases;
