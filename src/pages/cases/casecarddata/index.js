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
import { FaRegEdit } from "react-icons/fa";
import { ROUTES } from "../../../constants/api";

const CaseCardData = () => {
  const navigate=useNavigate();
  const handleCaseDetails=()=>{
    navigate(ROUTES.CASES_DETAILS)
  }

  const headerItems = [
    { text: "Cases", className: "mr-8" },
    { text: "Fu - Skyline #5712", separator: <SlArrowRight className="inline mr-10" />},
  ];
  const contactData = [
    {
      profileImage: IMAGES.profile,
      name: "Jack Fu",
      email: "xxxxxx@xxx.xxx",
      phone: "1(+1) xxx xxx xxxx",
      weChat: "(+1) xxx xxx xxxx",
      address: "2000 Panorama Blvd Apt 3605 New York, NY 10022",
    },
    {
      profileImage: IMAGES.profile,
      name: "Alexander Reed",
      email: "xxxxxx@xxx.xxx",
      phone: "(+1) xxx xxx xxxx",
      weChat: "(+1) xxx xxx xxxx",
    address: "137 Maple Avenue Brooklyn, NY 11215",
    },
  ];
  return (
    <div>
      <PageHeader items={headerItems} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4">
          <CaseDetailsCard
            title="Fu - Skyline #5712"
            clientName="Jack Fu"
            caseType="Purchasing"
            createdOn="June 10, 2024"
            address="1500 Skyline Avenue Apt 2503 Apt 2503"
          />
          <XButton
            text="Edit Case Details"
            icon={<FaRegEdit className="text-base mr-2 inline-block" />}
            className="bg-active-blue text-active-blue-text shadow-shadow-light rounded-full text-sm font-medium w-full py-3 px-3 mb-7 flex items-center justify-center"
            onClick={handleCaseDetails}
          />
          {/* <ContactCard
            profileImage={IMAGES.profile}
            name="Jack Fu"
            // notes="Notes"
            email="xxxxxx@xxx.xxx"
            phone="(+1) xxx xxx xxxx"
            weChat="(+1) xxx xxx xxxx"
            address="2000 Panorama Blvd Apt 3605 New York, NY 10022"
          /> */}
           <ContactCard contactData={contactData} />
        </div>
        <StagesChecklist />
      </div>
    </div>
  );
};

export default CaseCardData;
