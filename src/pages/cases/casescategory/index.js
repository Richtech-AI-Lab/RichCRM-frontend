import React from "react";
import { Actionbar, PageHeader } from "../../../components";
import CasesCategoryCard from "../../../components/casecategorycard";
import { useLocation, useNavigate } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import { ROUTES } from "../../../constants/api";

const CasesCategory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { card, filteredCases,stageCount } = location.state || {};
  const headerItems = [
    { text: "Cases", className: "mr-4" },
    { text: "Contract Preparing", separator: <SlArrowRight className="inline mr-4" />},
  ];
  const handleCaseCardClick = (casedetails) => {
    localStorage.setItem("c_id", casedetails?.caseId)
    navigate(ROUTES.CASES_DATA, { state: { casedetails } });
  };
  return (
    <div>
      <PageHeader items={headerItems} />
      <Actionbar />
      <CasesCategoryCard
        cases={filteredCases}
        onCardClick={handleCaseCardClick}
        categoryTitle={card?.label}
        stageCount={stageCount}
      />
    </div>
  );
};

export default CasesCategory;
