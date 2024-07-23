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
import { BsThreeDotsVertical } from "react-icons/bs";

const NewCaseInfo = () => {
  const navigate = useNavigate();
  const handleCaseDetails = () => {
    navigate("/rich-crm/casedetails");
  };

  const headerItems = [
    { text: "Cases", className: "mr-8" },
    {
      text: "Guo - 5 Pine Street",
      separator: <SlArrowRight className="inline mr-10" />,
    },
  ];
  return (
    <div>
      <PageHeader items={headerItems} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4">
          <CaseDetailsCard
            title="Guo - 5 Pine Street"
            clientName="Jessica Guo"
            caseType="Selling"
            createdOn="July 21, 2024"
            address="5 Pine Street New York, NY 10042"
          />
          <XButton
            text="Edit Case Details"
            icon={<FaRegEdit className="text-base mr-2 inline-block" />}
            className="bg-active-blue text-active-blue-text shadow-shadow-light rounded-full text-sm font-medium w-full py-3 px-3 mb-7"
            onClick={handleCaseDetails}
          />
          <div className="bg-white py-4 rounded-2xl mb-5">
            <div className="flex justify-between items-center mb-6 px-4">
              <span className="text-[22px] leading-7 text-secondary-800 font-medium">
                Contacts
              </span>
              <BsThreeDotsVertical />
            </div>

            <div className="flex flex-col gap-4 mb-2 px-4">
              <XButton
                text="Create a New Contact"
                className="btn-theme w-full"
              />
              <XButton text="Add from Contacts" className="btn-theme w-full" />
            </div>
          </div>
        </div>
        <StagesChecklist label="Setting up: Case details need to be filled"/>
      </div>
    </div>
  );
};

export default NewCaseInfo;
