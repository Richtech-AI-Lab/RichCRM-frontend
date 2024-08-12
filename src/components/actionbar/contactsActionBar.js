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


const ContactsActionbar = ({ active="", setActive="" , isAddFromContactModal}) => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const shouldShowOpenClosed = (routePath) => {
    const pathsToShow = [routePath];
    return pathsToShow.includes(location.pathname);
  };

  const addFromContactTabs = [
    { id: addFromContactTab.BROKERS, label: "Brokers" },
    { id: addFromContactTab.CLIENTS, label: "Clients" },
    { id: addFromContactTab.ATTORNEY, label: "Attorney" },
    { id: addFromContactTab.TITLE, label: "Title" },
    { id: addFromContactTab.LENDER, label: "Lender" },
    { id: addFromContactTab.OTHER, label: "Other" }
  ];
  return (
    <>

        {shouldShowOpenClosed(ROUTES.CONTACTS)  && (
        <div className="flex justify-between items-center mb-6">
          <ContactTabs active={active} setActive={setActive} tabs={addFromContactTabs} />
          <div>
            <XButton
              text="New case"
              icon={<FiPlus className="text-base mr-2 inline-block" />}
              className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium ml-4"
              onClick={toggleModal}
            />
            {isModalOpen && <NewCaseModal onClose={toggleModal} />}
          </div>
        </div>
      )}

{isAddFromContactModal && (
        <div className="flex justify-between items-center mb-6">
          <ContactTabs active={active} setActive={setActive} tabs={addFromContactTabs} isAddFromContactModal={isAddFromContactModal} />
        </div>
      )}
      {shouldShowOpenClosed(ROUTES.CONTACT_PARTNER) &&
        <div className="flex justify-end items-center mb-6">
          <div>

                <XButton
                  text="Edit"
                  icon={<FiEdit3 className="text-base mr-2 inline-block" />}
                  className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium"
                />
                <XButton
                  text="Share"
                  onClick={toggleModal}
                  icon={
                    <RiDownloadLine className="text-base mr-2 inline-block" />
                  }
                  className="bg-primary2 text-sm text-white py-[10px] px-6 rounded-[100px] font-medium ml-4"
                />
          </div>
        </div>}
    </>
  );
};

export default ContactsActionbar;

