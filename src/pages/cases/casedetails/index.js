import React from "react";
import { SlArrowRight } from "react-icons/sl";
import { CaseCardDetails, PageHeader } from "../../../components";

const CaseDetails = () => {
  const headerItems = [
    { text: "Cases", className: "mr-8" },
    {
      text: "Fu - Skyline #5712",
      separator: <SlArrowRight className="inline mr-10" />,
      className: "mr-8",
    },
    {
      text: "Case Details",
      separator: <SlArrowRight className="inline mr-10" />,
    },
  ];
  const sellerItems = [
    { label: "Seller", value: "Name" },
    { label: "SSN", value: "xxx xx xxxx" },
    { label: "Address", value: "xxxxxxxxxxxx" },
    { label: "Cell", value: "(+1) xxx xxx xxxx" },
    { label: "Work", value: "(+1) xxx xxx xxxx" },
  ];

  const buyerItems = [
    { label: "Buyer", value: "Name" },
    { label: "SSN", value: "xxx xx xxxx" },
    { label: "Address", value: "xxxxxxxxxxxx" },
    { label: "Cell", value: "(+1) xxx xxx xxxx" },
    { label: "Work", value: "(+1) xxx xxx xxxx" },
  ];

  const financialItems = [
    { label: "Purchase Price", value: "$xxxxxxxxx" },
    { label: "Down Payment", value: "$xxxxxxxxx" },
    { label: "Mortgage Amount", value: "$xxxxxxxxx" },
    { label: "Annual Property Tax", value: "$xxxxxxxxx" },
    { label: "Seller’s Concession", value: "$xxxxxxxxx" },
  ];

  return (
    <div>
      <PageHeader items={headerItems} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-6">
          <CaseCardDetails items={sellerItems} />
          <CaseCardDetails items={buyerItems} />
          <CaseCardDetails items={financialItems} />
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;
