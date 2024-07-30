import React from "react";
import { Actionbar, PageHeader } from "../../../components";
import CasesCategoryCard from "../../../components/casecategorycard";
import { useNavigate } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import { ROUTES } from "../../../constants/api";

const CasesCategory = () => {
  const navigate = useNavigate();
  const startedItems = [
    {
      badgeColor: "yellow",
      badgeText: "Setting up",
      caseDetails: "Client’s Name - Case Type",
    },
    {
      badgeColor: "yellow",
      badgeText: "Setting up",
      caseDetails: "Client’s Name - Case Type",
    },
    {
      badgeColor: "yellow",
      badgeText: "Setting up",
      caseDetails: "Client’s Name - Case Type",
    },
  ];

  const confirmingItems = [
    {
      badgeColor: "gray",
      badgeText: "Confirming",
      caseDetails: "Client’s Name - Case Type",
    },
    {
      badgeColor: "gray",
      badgeText: "Confirming",
      caseDetails: "Client’s Name - Case Type",
    },
    {
      badgeColor: "gray",
      badgeText: "Confirming",
      caseDetails: "Client’s Name - Case Type",
    },
    {
      badgeColor: "gray",
      badgeText: "Confirming",
      caseDetails: "Client’s Name - Case Type",
    },
    {
      badgeColor: "gray",
      badgeText: "Confirming",
      caseDetails: "Client’s Name - Case Type",
    },
    {
      badgeColor: "gray",
      badgeText: "Confirming",
      caseDetails: "Client’s Name - Case Type",
    },
  ];
  const readyItems = [
    {
      badgeColor: "green",
      badgeText: "Confirmed",
      caseDetails: "Client’s Name - Case Type",
    },
    {
      badgeColor: "green",
      badgeText: "Confirmed",
      caseDetails: "Client’s Name - Case Type",
    },
    {
      badgeColor: "green",
      badgeText: "Confirmed",
      caseDetails: "Client’s Name - Case Type",
    },
    {
      badgeColor: "green",
      badgeText: "Confirmed",
      caseDetails: "Client’s Name - Case Type",
    },
    {
      badgeColor: "green",
      badgeText: "Confirmed",
      caseDetails: "Client’s Name - Case Type",
    },
    {
      badgeColor: "green",
      badgeText: "Confirmed",
      caseDetails: "Client’s Name - Case Type",
    },
  ];
  const handleCaseCardClick = () => {
    navigate(ROUTES.CASES_DATA);
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
        readyItems={readyItems}

        onCardClick={handleCaseCardClick}
      />
    </div>
  );
};

export default CasesCategory;
