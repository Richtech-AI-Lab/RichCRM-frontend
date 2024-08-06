import React, { useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import { CaseCardDetails, PageHeader, XButton } from "../../../components";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { IoLogoWechat } from "react-icons/io5";
import CasesActionbar from "../../../components/actionbar/casesActionBar";
import { caseDetailTab } from "../../../constants/constants";
import ParticipantCaseDetails from "./participantCaseDetails";
import PremisesCaseDetails from "./premisesCaseDetails";
import OthersCaseDetails from "./othersCaseDetails";

const CaseDetails = () => {
  const [activeTab, setActiveTab] = useState(caseDetailTab.PARTICIPANTS);

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
    { label: "Seller", placeholder: "Enter seller name" },
    { label: "SSN", placeholder: "Enter a SSN" },
    { label: "Email",icon: <MdOutlineEmail className="text-xl"/>, placeholder: "Enter a Email Address" },
    {
      label: "Cell Phone",
      icon: <MdOutlinePhone className="text-xl"/>,
      placeholder: "Enter a Phone Number",
    },
    {
      label: "Work Phone",
      icon: <MdOutlinePhone className="text-xl"/>,
      placeholder: "Enter a Phone Number",
    },
    { label: "WeChat", placeholder: "Enter a WeChat Number", icon: <IoLogoWechat className="text-xl"/> },
    {
      label: "Address",
      icon: <GrLocation className="text-xl"/>,
      placeholder: "Enter Address",
    },
  ];
  const buyerItems = [
    { label: "Purchaser", placeholder: "Add a purchaser" },
    { label: "SSN", placeholder: "Enter a SSN" },
    { label: "Email",icon: <MdOutlineEmail className="text-xl"/>, placeholder: "Enter a Email Address" },
    {
      label: "Cell Phone",
      icon: <MdOutlinePhone className="text-xl"/>,
      placeholder: "Enter a Phone Number",
    },
    {
      label: "Work Phone",
      icon: <MdOutlinePhone className="text-xl"/>,
      placeholder: "Enter a Phone Number",
    },
    { label: "WeChat", icon: <IoLogoWechat className="text-xl"/>, placeholder: "Enter a WeChat Number" },
    {
      label: "Address",
      icon: <GrLocation className="text-xl"/>,
      placeholder: "Enter address",
    },
  ];
  const financialItems = [
    { label: "Purchase Price", placeholder: "Enter an Amount" },
    { label: "Down Payment", placeholder: "Enter an Amount" },
    { label: "Mortgage Amount", placeholder: "Enter an Amount" },
    { label: "Annual Property Tax", placeholder: "Enter an Amount" },
    { label: "Seller’s Concession", placeholder: "Enter an Amount" },
  ];
  const attorneyItems = [
    { label: "Seller Attorney",  placeholder: "Enter an attorney" },
    { label: "Purchaser Attorney",  placeholder: "Enter an attorney" },
    { label: "Bank Attorney",  placeholder: "Enter an attorney" },
    { label: "Co-op Attorney",  placeholder: "Enter an attorney" },
  ];
  const companyTitleItems = [
    { label: "Title Company",  placeholder: "Enter an title company" },
    { label: "Title Number",  placeholder: "Enter an title number" },
    { label: "Mortage",  placeholder: "Enter an mortage" },
  ];
  const brokersItems = [
    { label: "Brokers Sale",  placeholder: "Enter an Amount" },
    { label: "Brokers Listing",  placeholder: "Enter an Amount" },
    { label: "Referred by",  placeholder: "Add a referral" },
    { label: "Bank (L/O)",  placeholder: "Add content" },
    { label: "Personal Property",  placeholder: "Add content" },
    { label: "Excluded Property",  placeholder: "Add content" },
  ];
  const lowerSectionItems = [
    {
      label: "Premise Status",
      isCheckbox: true,
      checkboxOptions: [
        { id: "soldYes", label: "Being sold", defaultChecked: true },
        { id: "boughtYes", label: "Being bought", defaultChecked: true },
      ],
    },
    {
      label: "Premise Address",
      placeholder: "Enter premise address",
    },
    { label: "Block", placeholder: "Enter a block" },
    { label: "Lot", placeholder: "Enter a lot" },
    { label: "Section", placeholder: "Enter a section" },
    {
      label: "Type",
      isCheckbox: true,
      checkboxOptions: [
        { id: "coop", label: "Co-op", defaultChecked: true },
        { id: "townhouse", label: "Townhouse", defaultChecked: true },
        { id: "condo", label: "Condo", defaultChecked: true },
        { id: "vacantLand", label: "Vacant Land", defaultChecked: true },
      ],
    },
    {
      label: "Vacant at closing",
      isCheckbox: true,
      checkboxOptions: [
        { id: "vacantYes", label: "Yes", defaultChecked: true },
        { id: "vacantNo", label: "No", defaultChecked: true },
      ],
    },
    {
      label: "Subject to Tenancy",
      isCheckbox: true,
      checkboxOptions: [
        { id: "tenancyYes", label: "Yes", defaultChecked: true },
        { id: "tenancyNo", label: "No", defaultChecked: true },
      ],
    },
    {
      label: "H.O.A",
      isCheckbox: true,
      checkboxOptions: [
        { id: "hoaYes", label: "Yes", defaultChecked: true },
        { id: "hoaNo", label: "No", defaultChecked: true },
      ],
    },
    {
      label: "Parking Space",
      isCheckbox: true,
      checkboxOptions: [
        { id: "parkingYes", label: "Yes", defaultChecked: true },
        { id: "parkingNo", label: "No", defaultChecked: true },
      ],
    },
    { label: "Parking Space Number", placeholder:"Enter parking space no" },
    { label: "Maintenance fee", placeholder:"Enter an Amount"},

    { label: "Assessments", placeholder:"Enter an Amount" },
    { label: "Paid by", placeholder:"Enter an Amount" },
    { label: "Managing Company", placeholder:"Enter an Amount" },
 
  ];
  const premisesType=[
    {
      label: "Component",
      isCheckbox: true,
      checkboxOptions: [
        { id: "newConstruction", label: "New Const.", defaultChecked: true },
        { id: "oneFamily", label: "1 Family", defaultChecked: true },
        { id: "twoFamily", label: "2 Family", defaultChecked: true },
      ],
    },
    {
      label: "1st Floor",
      floor:true,
      nestedItems: [
        { label: "Tenant Name", placeholder:"Enter name" },
        { label: "Rent",  placeholder:"Enter rent" },
        { label: "Sec.", placeholder:"Enter sec" },
        {
          label: "Lease",
          isCheckbox: true,
          checkboxOptions: [
            { id: "leaseYes1", label: "Yes", defaultChecked: true },
            { id: "leaseNo2", label: "No", defaultChecked: true },
          ],
        },
      ],
    },
    {
      label: "2nd Floor",
      floor:true,
      nestedItems: [
        { label: "Tenant Name", placeholder:"Enter name" },
        { label: "Rent", placeholder:"Enter rent" },
        { label: "Sec.", placeholder:"Enter sec"},
        {
          label: "Lease",
          isCheckbox: true,
          checkboxOptions: [
            { id: "leaseYes3", label: "Yes", defaultChecked: true },
            { id: "leaseNo4", label: "No", defaultChecked: true },
          ],
        },
      ],
    },
  ]
  const closingDateItems = [
    {
      label: "Closing",
      isCheckbox: true,
      checkboxOptions: [
        { id: "accept1", defaultChecked: true, label: "on/about" },
        { id: "accept2", defaultChecked: true, label: "Before" },
        { id: "accept3", defaultChecked: true, label: "T.O.E." },
        { id: "accept4", defaultChecked: true, label: "June 05,2024" },
      ],
    },
    { label: "Closing date", placeholder:"Enter an date" },
  ];
  const inspectionItems = [
    {
      label: "Engineer Inspection",
      isCheckbox: true,
      checkboxOptions: [
        { id: "accept4", defaultChecked: true, label: "Yes" },
        { id: "accept5", defaultChecked: true, label: "No" },
      ],
    },
    { label: "Scheduled Date", placeholder:"Enter Scheduled Date" },
    { label: "Received Date",placeholder:"Enter Received Date" },
  ];
  const termitesInspectionItems = [
    {
      label: "Termites Inspection",
      isCheckbox: true,
      checkboxOptions: [
        { id: "accept6", defaultChecked: true, label: "Yes" },
        { id: "accept7", defaultChecked: true, label: "No" },
      ],
    },
  ];
  const renderActiveTab = (activeTab) => {
    switch (activeTab) {
      case caseDetailTab.PARTICIPANTS:
        return <ParticipantCaseDetails />;
      case caseDetailTab.PREMISES:
        return <PremisesCaseDetails />;
      case caseDetailTab.OTHERS:
        return <OthersCaseDetails />;
      default:
        return <ParticipantCaseDetails />;
    }
  };
  return (
    <div>
      <PageHeader items={headerItems} />
      <CasesActionbar active={activeTab} setActive={setActiveTab}/> 
      {renderActiveTab(activeTab)}
        {/* <div className="col-span-6">
          <CaseCardDetails items={sellerItems} />
          <CaseCardDetails items={buyerItems} />
          <CaseCardDetails items={financialItems} />
          <CaseCardDetails items={attorneyItems} />
          <CaseCardDetails items={brokersItems} />
        </div>
        <div className="col-span-6">
          <CaseCardDetails items={attorneyItems} />
          <CaseCardDetails items={companyTitleItems} />
          <CaseCardDetails items={lowerSectionItems} />
          <CaseCardDetails items={closingDateItems} />
          <CaseCardDetails items={inspectionItems} />
          <CaseCardDetails items={termitesInspectionItems} />
          
        </div> */}
         
      <div className="flex justify-end mt-6">
        <XButton
          text="Cancel"
          className="bg-badge-gray font-medium text-base text-primary py-[10px] px-6 rounded-[100px] shadow-shadow-light"
        />
        <XButton
          type="submit"
          text="Save"
          className="bg-primary text-base text-white py-[10px] px-6 rounded-[100px] ml-4"
        />
      </div>
    </div>
  );
};

export default CaseDetails;
