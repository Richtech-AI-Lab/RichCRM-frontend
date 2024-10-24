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
import { useDispatch, useSelector } from "react-redux";
import OrganizationCaseDetails from "./organizationCaseDetails";
import { ROUTES } from "../../../constants/api";
import DeleteModal from "../../../components/deleteModal";

const CaseDetails = () => {
  const { cases } = useSelector((state) => state.case.casesData);
  const [dirtyFormnik, setDirtyFormnik] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const caseId = localStorage.getItem('c_id')
  const [activeTab, setActiveTab] = useState(caseDetailTab.PARTICIPANTS);
  const [isEdit, setIsEdit] = useState(false)
  const [newTab, setNewTab] = useState(null);
  function getCaseValue() {
    // console.log(cases,"_____")
    const caseObject = cases.find(caseItem => caseItem.caseId === caseId);
    if (!caseObject) {
      return undefined;
    }
    return caseObject;
    // return caseObject[keyName];
  }
  const headerItems = [
    { text: "Cases", link: ROUTES.CASES, className: "mr-8" },
    {
      text: `${getCaseValue()?.clientName} - ${getCaseValue()?.premisesName}`,
      separator: <SlArrowRight className="inline mr-10" />,
      className: "mr-8",
    },
    {
      text: "Case Details",
      separator: <SlArrowRight className="inline mr-10" />,
    },
  ];

  const handleTabSwitch = (newTab) => {
    if (dirtyFormnik) {
      setNewTab(newTab); // Set the new tab for confirmation
      setIsModalOpen(true); // Open the confirmation modal
    } else {
      setActiveTab(newTab); // Switch to the new tab directly
    }
    // console.log(dirtyFormnik, "dirtyFormnik")
    // if (dirtyFormnik) {
    //   if (window.confirm("You have unsaved changes. Do you want to proceed without saving?")) {
    //    setNewTab(newTab);
    //     setDirtyFormnik(false)
    //   }
    // } else {
    //   setActiveTab(newTab);
    // }
  };

  const renderActiveTab = (activeTab) => {
    switch (activeTab) {
      case caseDetailTab.PARTICIPANTS:
        return getCaseValue()?.clientType == 0 ?
          <ParticipantCaseDetails isEdit={isEdit} setIsEdit={setIsEdit} caseType={getCaseValue()?.caseType} setDirtyFormnik={setDirtyFormnik} /> :
          <OrganizationCaseDetails isEdit={isEdit} setIsEdit={setIsEdit} caseType={getCaseValue()?.caseType} setDirtyFormnik={setDirtyFormnik} />;
      case caseDetailTab.PREMISES:
        return <PremisesCaseDetails isEdit={isEdit} setIsEdit={setIsEdit} setDirtyFormnik={setDirtyFormnik} />;
      case caseDetailTab.OTHERS:
        return <OthersCaseDetails isEdit={isEdit} setIsEdit={setIsEdit} setDirtyFormnik={setDirtyFormnik} />;
      default:
        return <PremisesCaseDetails isEdit={isEdit} setIsEdit={setIsEdit} setDirtyFormnik={setDirtyFormnik} />;
    }
  };
  const handleConfirm = () => {
    setActiveTab(newTab); // Switch to the next tab
    setDirtyFormnik(false); // Reset dirty state
    setIsModalOpen(false); // Close the modal
  };

  const handleClose = () => {
    setIsModalOpen(false); // Close the modal without switching tabs
  };

  return (
    <div>
      <PageHeader items={headerItems} />
      <CasesActionbar active={activeTab} setActive={handleTabSwitch} setIsEdit={setIsEdit} isEdit={isEdit} />
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
      <DeleteModal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleClose}
        title="Unsaved Changes"
        message="You have unsaved changes. Do you want to proceed without saving?"
        confirmText="Proceed"
        cancelText="Cancel"
      />
    </div>
  );
};

export default CaseDetails;
