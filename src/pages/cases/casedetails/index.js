import React, { useEffect, useState } from "react";
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
import { fetchAddressByIdRequest } from "../../../redux/actions/utilsActions";
import { useDispatch } from "react-redux";

const CaseDetails = () => {
  const [activeTab, setActiveTab] = useState(caseDetailTab.PARTICIPANTS);
  const [isEdit, setIsEdit] = useState(false)
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

  const renderActiveTab = (activeTab) => {
    switch (activeTab) {
      case caseDetailTab.PARTICIPANTS:
        return <ParticipantCaseDetails isEdit={isEdit} setIsEdit={setIsEdit} />;
      case caseDetailTab.PREMISES:
        return <PremisesCaseDetails isEdit={isEdit} setIsEdit={setIsEdit} />;
      case caseDetailTab.OTHERS:
        return <OthersCaseDetails isEdit={isEdit} setIsEdit={setIsEdit}  />;
      default:
        return <ParticipantCaseDetails isEdit={isEdit} setIsEdit={setIsEdit}  />;
    }
  };
  return (
    <div>
      <PageHeader items={headerItems} />
      <CasesActionbar active={activeTab} setActive={setActiveTab} setIsEdit={setIsEdit} isEdit={isEdit}/> 
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
         
      {/* <div className="flex justify-end mt-6">
        <XButton
          text="Cancel"
          className="bg-badge-gray font-medium text-base text-primary py-[10px] px-6 rounded-[100px] shadow-shadow-light"
        />
        <XButton
          type="submit"
          text="Save Changes"
          className="bg-primary text-base text-white py-[10px] px-6 rounded-[100px] ml-4"
        />
      </div> */}
    </div>
  );
};

export default CaseDetails;
