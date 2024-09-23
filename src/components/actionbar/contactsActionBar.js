import React, { useState } from "react";
import XButton from "../button/XButton";
import { addFromContactTab, addFromContactTabs, addFromContactV1Tabs, contactTab, SORT_OPTIONS } from "../../constants/constants";
import { FiEdit3, FiPlus } from "react-icons/fi";
import { RiDownloadLine } from "react-icons/ri";
import CaseExportModal from "../caseExportModal";
import { ROUTES } from "../../constants/api";
import NewCaseModal from "../caseModal/newCaseModal";
import { useLocation } from "react-router-dom";
import ContactTabs from "./contactTabs";
import { AiOutlineLink } from "react-icons/ai";
import ContactButtonWithModal from "../newContactButton";
import NewIndividualContactModalV1 from "../contactModal/newIndividualContactModalV1";
import NewOrganizationContactModalV1 from "../contactModal/newOrganizationContactModalV1";

const ContactsActionbar = ({ active = "", setActive = "", isAddFromContactModal, isEdit, toggleEdit }) => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const shouldShow = (routePath) => {
    const pathsToShow = [routePath];
    return pathsToShow.includes(location.pathname);
  };


  return (
    <>
      {shouldShow(ROUTES.CONTACTS) && (
        <div className="flex justify-between items-center mb-6">
          <ContactTabs active={active} setActive={setActive} tabs={addFromContactV1Tabs} />
          <div>
            <ContactButtonWithModal
              buttonClass="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium mt-4"
              // modalClass=""  
              modalContent={active == 0 ? <NewIndividualContactModalV1 /> : <NewOrganizationContactModalV1 />}
            />
            {/* <XButton
              text="New Contact"
              icon={<FiPlus className="text-base mr-2 inline-block" />}
              className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium ml-4"
              onClick={toggleModal}
            />
            {isModalOpen && <NewContactModal onClose={toggleModal} />} */}
          </div>
        </div>
      )}

      {shouldShow(ROUTES.DASHBOARD) && (
        <div className="flex justify-between items-center mb-6">
          <ContactTabs active={active} setActive={setActive} tabs={addFromContactV1Tabs} />
          <div>
           
            {/* <XButton
              text="New Contact"
              icon={<FiPlus className="text-base mr-2 inline-block" />}
              className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium ml-4"
              onClick={toggleModal}
            />
            {isModalOpen && <NewContactModal onClose={toggleModal} />} */}
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
              icon={<AiOutlineLink className="text-base mr-2 inline-block" />}
              className="shadow-shadow-light-2 text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium"
            />
            {!isEdit && <XButton
              onClick={() => toggleEdit()}
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

