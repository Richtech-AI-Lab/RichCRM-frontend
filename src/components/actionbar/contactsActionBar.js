import React, { useState } from "react";
import XButton from "../button/XButton";
import { addFromContactTab, contactTab, SORT_OPTIONS } from "../../constants/constants";
import { FiEdit3, FiPlus } from "react-icons/fi";
import { RiDownloadLine } from "react-icons/ri";
import CaseExportModal from "../caseExportModal";
import { ROUTES } from "../../constants/api";
import NewCaseModal from "../caseModal/newCaseModal";
import { useLocation } from "react-router-dom";
import ContactTabs from "./contactTabs";
import { AiOutlineLink } from "react-icons/ai";

const ContactsActionbar = ({ active = "", setActive = "", isAddFromContactModal , isEdit, toggleEdit}) => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const shouldShow = (routePath) => {
    const pathsToShow = [routePath];
    return pathsToShow.includes(location.pathname);
  };

  const addFromContactTabs = [
    { id: addFromContactTab.BROKERS, label: "Realtors" },
    { id: addFromContactTab.ATTORNEY, label: "Attorney" },
    { id: addFromContactTab.TITLE, label: "Title" },
    { id: addFromContactTab.LENDER, label: "Lender" },
    { id: addFromContactTab.CLIENTS, label: "Clients" },
    { id: addFromContactTab.OTHER, label: "Other" }
  ];
  return (
    <>
      {shouldShow(ROUTES.CONTACTS) && (
        <div className="flex justify-between items-center mb-6">
          <ContactTabs active={active} setActive={setActive} tabs={addFromContactTabs} />
          <div>
            <XButton
              text="New Contact"
              icon={<FiPlus className="text-base mr-2 inline-block" />}
              className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium ml-4"
              onClick={toggleModal}
            />
            {/* {isModalOpen && <NewCaseModal onClose={toggleModal} />} */}
          </div>
        </div>
      )}

      {isAddFromContactModal && (
        <div className="flex justify-between items-center mb-6">
          <ContactTabs active={active} setActive={setActive} tabs={addFromContactTabs} isAddFromContactModal={isAddFromContactModal} />
        </div>
      )}
      {shouldShow(ROUTES.CONTACT_PARTNER) &&
        <div className="flex justify-end items-center mb-6">
          <div>

            <XButton
              text="Connect"
              icon={<AiOutlineLink className="text-base mr-2 inline-block"/>}
              className="shadow-shadow-light-2 text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium"
            />
           {!isEdit && <XButton
              onClick={()=>toggleEdit()}
              text="Edit"
              icon={<FiEdit3 className="text-base mr-2 inline-block" />}
              className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium ml-4"
            />}
          </div>
        </div>}
    </>
  );
};

export default ContactsActionbar;

