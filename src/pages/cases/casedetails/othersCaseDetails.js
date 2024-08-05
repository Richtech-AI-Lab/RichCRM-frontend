import React, { useState } from "react";
import { CaseCardDetails } from "../../../components";
import { FaCircleMinus } from "react-icons/fa6";


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
    // { label: "Referred by", placeholder: "Add a referral" },
    // { label: "Bank (L/O)", placeholder: "Add content" },
    // { label: "Personal Property", placeholder: "Add content" },
    // { label: "Excluded Property", placeholder: "Add content" },
  ];
  const closingDateItems = [
    {
      label: "Schedule",
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

  const otherItemss=[
    {
      show: false, optional: true, icon: <FaCircleMinus   className="text-xl"/>, buttonText: "Add A Referred", label: "Referred",  placeholder: "Enter a referred",
    },
    {
      show: false, optional: true, icon: <FaCircleMinus   className="text-xl"/>, buttonText: "Add A Bank (L/O)", label: "Bank",  placeholder: "Enter a bank",
    },
    {
      show: false, optional: true, icon: <FaCircleMinus   className="text-xl"/>, buttonText: "Add Notes as Personal Property", label: "Personal Property Notes",  placeholder: "Enter notes",
    },
    {
      show: false, optional: true, icon: <FaCircleMinus   className="text-xl"/>, buttonText: "Add Notes as Excluded Property", label: "Excluded Property Notes",  placeholder: "Enter notes",
    }
  ]
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-6">
        <CaseCardDetails items={financialItems}  title="Prices" />
        <CaseCardDetails items={brokersItems}  title="Brokers" />

      </div>
      <div className="col-span-6">
        <CaseCardDetails items={closingDateItems}  title="Closing"/>
        <CaseCardDetails items={otherItemss}  title="Others"/>
      </div>
    </div >
  );
};

export default OthersCaseDetails;

