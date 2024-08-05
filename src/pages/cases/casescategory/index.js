import React from "react";
import { Actionbar, PageHeader } from "../../../components";
import CasesCategoryCard from "../../../components/casecategorycard";
import { useNavigate } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import { ROUTES } from "../../../constants/api";

const CasesCategory = () => {
  const navigate = useNavigate();
  const headerItems = [
    { text: "Cases", className: "mr-8" },
    { text: "Contract Preparing", separator: <SlArrowRight className="inline mr-10" />},
  ];
  const cases = [
    { badgeColor: "red", badgeText: "No Response",  caseDetails: "535 W 52nd St #9G coop",caseTitle: "Gee, First Name",caseCount: "1/3",},
    { badgeColor: "red", badgeText: "No Response", caseDetails: "535 W 52nd St #9G coop" ,caseTitle: "Gee, First Name",caseCount: "1/3",},
    { badgeColor: "red", badgeText: "No Response", caseDetails: "535 W 52nd St #9G coop" ,caseTitle: "Gee, First Name",caseCount: "1/3",},
    { badgeColor: "red", badgeText: "No Response", caseDetails: "535 W 52nd St #9G coop" ,caseTitle: "Gee, First Name",caseCount: "1/3",},
    { badgeColor: "yellow", badgeText: "Unfinished", caseDetails: "535 W 52nd St #9G coop" ,caseTitle: "Gee, First Name",caseCount: "1/3",},
    { badgeColor: "yellow", badgeText: "Unfinished", caseDetails: "535 W 52nd St #9G coop",caseTitle: "Gee, First Name",caseCount: "1/3", },
    { badgeColor: "yellow", badgeText: "Unfinished", caseDetails: "535 W 52nd St #9G coop",caseTitle: "Gee, First Name" ,caseCount: "1/3",},
    { badgeColor: "yellow", badgeText: "Unfinished", caseDetails: "535 W 52nd St #9G coop" ,caseTitle: "Gee, First Name",caseCount: "1/3",},
    { badgeColor: "yellow", badgeText: "Unfinished", caseDetails: "535 W 52nd St #9G coop" ,caseTitle: "Gee, First Name",caseCount: "1/3",},
    { badgeColor: "yellow", badgeText: "Unfinished", caseDetails: "535 W 52nd St #9G coop" ,caseTitle: "Gee, First Name",caseCount: "1/3",},
    { badgeColor: "yellow", badgeText: "Unfinished", caseDetails: "535 W 52nd St #9G coop",caseTitle: "Gee, First Name" ,caseCount: "1/3",},
    { badgeColor: "gray", badgeText: "Done", caseDetails: "535 W 52nd St #9G coop",caseTitle: "Gee, First Name" ,caseCount: "1/3",},
    { badgeColor: "gray", badgeText: "Done", caseDetails: "535 W 52nd St #9G coop" ,caseTitle: "Gee, First Name",caseCount: "1/3",},
    { badgeColor: "gray", badgeText: "Waiting", caseDetails: "535 W 52nd St #9G coop" ,caseTitle: "Gee, First Name",caseCount: "1/3",},
    { badgeColor: "gray", badgeText: "Waiting", caseDetails: "535 W 52nd St #9G coop" ,caseTitle: "Gee, First Name",caseCount: "1/3",},
    { badgeColor: "gray", badgeText: "Waiting", caseDetails: "535 W 52nd St #9G coop" ,caseTitle: "Gee, First Name",caseCount: "1/3",},
    { badgeColor: "gray", badgeText: "Waiting", caseDetails: "535 W 52nd St #9G coop" ,caseTitle: "Gee, First Name",caseCount: "1/3",},
    { badgeColor: "gray", badgeText: "Waiting", caseDetails: "535 W 52nd St #9G coop" ,caseTitle: "Gee, First Name",caseCount: "1/3",},
    { badgeColor: "gray", badgeText: "Waiting", caseDetails: "535 W 52nd St #9G coop" ,caseTitle: "Gee, First Name",caseCount: "1/3",},
    { badgeColor: "gray", badgeText: "Waiting", caseDetails: "535 W 52nd St #9G coop" ,caseTitle: "Gee, First Name",caseCount: "1/3",},
    { badgeColor: "gray", badgeText: "Waiting", caseDetails: "535 W 52nd St #9G coop" ,caseTitle: "Gee, First Name",caseCount: "1/3",},
  ];
  const handleCaseCardClick = () => {
    navigate(ROUTES.CASES_DATA);
  };
  return (
    <div>
      <PageHeader items={headerItems} />
      <Actionbar />
      <CasesCategoryCard
        cases={cases}
        onCardClick={handleCaseCardClick}
      />
    </div>
  );
};

export default CasesCategory;
