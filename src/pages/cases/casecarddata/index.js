import React from "react";
import { SlArrowRight } from "react-icons/sl";
import {
  CaseDetailsCard,
  ContactCard,
  PageHeader,
  XButton,
} from "../../../components";
import { IMAGES } from "../../../constants/imagePath";
import StagesChecklist from "../../../components/stageschecklist";
import { useNavigate } from "react-router-dom";

const CaseCardData = () => {
  const navigate=useNavigate();
  const handleCaseDetails=()=>{
    navigate("/rich-crm/casedetails")
  }

  const headerItems = [
    { text: "Cases", className: "mr-8" },
    { text: "Fu - Skyline #5712", separator: <SlArrowRight className="inline mr-10" />},
  ];
  return (
    <div>
      <PageHeader items={headerItems} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4">
          <CaseDetailsCard
            title="Fu - Skyline #5712"
            clientName="Client Name"
            caseType="Purchase"
            createdOn="Month Day, Year"
            address="The Address"
          />
          <XButton
            text="Case Details"
            className="bg-bg-pink rounded-full text-sm font-medium w-full py-3 px-3 mb-7"
            onClick={handleCaseDetails}
          />
          <ContactCard
            profileImage={IMAGES.profile}
            name="Jack Fu"
            notes="Notes"
            email="xxxxxx@xxx.xxx"
            phone="(+1) xxx xxx xxxx"
            weChat="WeChat Number"
            address="Mailing Address"
          />
        </div>
        <StagesChecklist />
      </div>
    </div>
  );
};

export default CaseCardData;
