import React, { useState } from "react";
import { CaseCardDetails } from "../../../components";


const OthersCaseDetails = () => {
  const financialItems = [
    { label: "Purchase Price", placeholder: "Enter an Amount" },
    { label: "Down Payment", placeholder: "Enter an Amount" },
    { label: "Mortgage Amount", placeholder: "Enter an Amount" },
    { label: "Annual Property Tax", placeholder: "Enter an Amount" },
    { label: "Seller’s Concession", placeholder: "Enter an Amount" },
  ];
  const brokersItems = [
    { label: "Brokers Sale", placeholder: "Enter an Amount" },
    { label: "Brokers Listing", placeholder: "Enter an Amount" },
    { label: "Referred by", placeholder: "Add a referral" },
    { label: "Bank (L/O)", placeholder: "Add content" },
    { label: "Personal Property", placeholder: "Add content" },
    { label: "Excluded Property", placeholder: "Add content" },
  ];
  const closingDateItems = [
    {
      label: "Closing",
      isDropdown: true,
      dropDownOptions: [
        { id: "accept1", defaultChecked: true, label: "on/about" },
        { id: "accept2", defaultChecked: true, label: "Before" },
        { id: "accept3", defaultChecked: true, label: "T.O.E." },
        { id: "accept4", defaultChecked: true, label: "June 05,2024" },
      ],
    },
    { label: "Closing date", placeholder: "Month Day, Year" },
  ];
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-6">
        <CaseCardDetails items={financialItems} />
        <CaseCardDetails items={brokersItems} />

      </div>
      <div className="col-span-6">
        <CaseCardDetails items={closingDateItems} />
      </div>
    </div >
  );
};

export default OthersCaseDetails;

