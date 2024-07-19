import React from "react";
import { Actionbar, PageHeader } from "../../../components";
import CasesCategoryCard from "../../../components/casecategorycard";
import { useNavigate } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";

const CasesCategory = () => {
  const navigate = useNavigate();
  const startedItems = [
    {
      badgeColor: "yellow",
      badgeText: "Set up",
      caseDetails: "Client’s Name - Case Type",
    },
    {
      badgeColor: "yellow",
      badgeText: "Set up",
      caseDetails: "Client’s Name - Case Type",
    },
    {
      badgeColor: "yellow",
      badgeText: "Set up",
      caseDetails: "Client’s Name - Case Type",
    },
  ];

  const confirmingItems = [
    {
      badgeColor: "green",
      badgeText: "Confirming",
      caseDetails: "Client’s Name - Case Type",
    },
    {
      badgeColor: "green",
      badgeText: "Confirming",
      caseDetails: "Client’s Name - Case Type",
    },
    {
      badgeColor: "green",
      badgeText: "Confirming",
      caseDetails: "Client’s Name - Case Type",
    },
    {
      badgeColor: "green",
      badgeText: "Confirming",
      caseDetails: "Client’s Name - Case Type",
    },
    {
      badgeColor: "green",
      badgeText: "Confirming",
      caseDetails: "Client’s Name - Case Type",
    },
    {
      badgeColor: "green",
      badgeText: "Confirming",
      caseDetails: "Client’s Name - Case Type",
    },
  ];
  const handleCaseCardClick = () => {
    console.log("hello");
    navigate("/rich-crm/casesdata");
  };
  return (
    <div>
      <PageHeader mainText="Cases" secondaryText="Started">
        <SlArrowRight className="inline mr-10" />
      </PageHeader>
      <Actionbar />
      <CasesCategoryCard
        startedItems={startedItems}
        confirmingItems={confirmingItems}
        onCardClick={handleCaseCardClick}
      />
    </div>
  );
};

export default CasesCategory;
