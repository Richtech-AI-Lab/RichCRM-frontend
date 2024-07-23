import React from "react";
import { SlArrowRight } from "react-icons/sl";
import { CaseCardDetails, PageHeader, XButton } from "../../../components";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { IoLogoWechat } from "react-icons/io5";

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
    { label: "Seller", value: "Alexander Reed" },
    { label: "SSN", value: "xxx xx xxxx" },
    { label: "Email", value: "xxxxxx@xxx.xxx", icon: <MdOutlineEmail /> },
    {
      label: "Cell Phone",
      value: "(+1) xxx xxx xxxx",
      icon: <MdOutlinePhone />,
    },
    {
      label: "Work Phone",
      value: "(+1) xxx xxx xxxx",
      icon: <MdOutlinePhone />,
    },
    {
      label: "Address",
      value: "137 Maple Avenue Brooklyn, NY 11215",
      icon: <GrLocation />,
    },
  ];

  const buyerItems = [
    { label: "Purchaser", value: "Jack Fu" },
    { label: "SSN", value: "xxx xx xxxx" },
    { label: "Email", value: "xxxxxx@xxx.xxx", icon: <MdOutlineEmail /> },
    {
      label: "Cell Phone",
      value: "(+1) xxx xxx xxxx",
      icon: <MdOutlinePhone />,
    },
    {
      label: "Work Phone",
      value: "(+1) xxx xxx xxxx",
      icon: <MdOutlinePhone />,
    },
    { label: "WeChat", value: "(+1) xxx xxx xxxx", icon: <IoLogoWechat /> },
    {
      label: "Address",
      value: "2000 Panorama Blvd Apt 3605 New York, NY 10022",
      icon: <GrLocation />,
    },
  ];

  const financialItems = [
    { label: "Purchase Price", value: "$xxx,xxx,xxx" },
    { label: "Down Payment", value: "$xxx,xxx,xxx" },
    { label: "Mortgage Amount", value: "$xxx,xxx,xxx" },
    { label: "Annual Property Tax", value: "$xxx,xxx,xxx" },
    { label: "Seller’s Concession", value: "$xxx,xxx,xxx" },
  ];
  const attorneyItems = [
    { label: "Seller Attorney", value: "xxxxxxxxxxxx" },
    { label: "Purchaser Attorney", value: "xxxxxxxxxxxx" },
  ];

  const brokersItems = [
    { label: "Brokers Sale", value: "$xxx,xxx,xxx" },
    { label: "Brokers Listing", value: "$xxx,xxx,xxx" },
    { label: "Referred by", value: "Add a referral" },
    { label: "Bank (L/O)", value: "Add content" },
    { label: "Personal Property", value: "Add content" },
    { label: "Excluded Property", value: "Add content" },
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
      value: "1500 Skyline Avenue Apt 2503 New York, NY 10019",
    },
    { label: "Block", value: "xxxxxxxxxxxx" },
    { label: "Lot", value: "xxxxxxxxxxxx" },
    { label: "Section", value: "xxxxxxxxxxxx" },
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
    { label: "Parking Space Number", value: "2" },
    { label: "Maintenance fee", value: "$xxxxx" },

    { label: "Assessments", value: "$xxxxx" },
    { label: "Paid by", value: "xxxxxxx" },
    { label: "Managing Company", value: "xxxxxxx" },
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
      nestedItems: [
        { label: "Tenant Name", value: "Name" },
        { label: "Rent", value: "$xxxxx" },
        { label: "Sec.", value: "$xxxxx" },
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
      nestedItems: [
        { label: "Tenant Name", value: "Name" },
        { label: "Rent", value: "$xxxxx" },
        { label: "Sec.", value: "$xxxxx" },
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
  ];
  const closingDateItems = [
    {
      label: "Closing Date",
      isCheckbox: true,
      checkboxOptions: [
        { id: "accept1", defaultChecked: true, label: "on/about" },
        { id: "accept2", defaultChecked: true, label: "before" },
        { id: "accept3", defaultChecked: true, label: "T.O.E." },
        { id: "accept4", defaultChecked: true, label: "June 05,2024" },
      ],
    },
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
    { label: "Scheduled Date", value: "June 05, 2024" },
    { label: "Received Date", value: "Month Day, Year" },
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

  return (
    <div>
      <PageHeader items={headerItems} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-6">
          <CaseCardDetails items={sellerItems} />
          <CaseCardDetails items={buyerItems} />
          <CaseCardDetails items={financialItems} />
          <CaseCardDetails items={attorneyItems} />
          <CaseCardDetails items={brokersItems} />
        </div>
        <div className="col-span-6">
          <CaseCardDetails items={lowerSectionItems} />
          <CaseCardDetails items={closingDateItems} />
          <CaseCardDetails items={inspectionItems} />
          <CaseCardDetails items={termitesInspectionItems} />
        </div>
      </div>
      <div className="flex justify-end">
        <XButton
          text="Cancel"
          className="bg-bg-pink text-sm text-primary py-[10px] px-6 rounded-[100px]"
        />
        <XButton
          type="submit"
          text="Save"
          className="bg-primary text-sm text-white py-[10px] px-6 rounded-[100px]"
        />
      </div>
    </div>
  );
};

export default CaseDetails;
