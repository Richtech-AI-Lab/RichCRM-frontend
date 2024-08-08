import React, { useState } from "react";
import XButton from "../button/XButton";
import { contactTab, SORT_OPTIONS } from "../../constants/constants";
import { FiEdit3, FiPlus } from "react-icons/fi";
import { RiDownloadLine } from "react-icons/ri";
import CaseExportModal from "../caseExportModal";
import { ROUTES } from "../../constants/api";
import NewCaseModal from "../caseModal/newCaseModal";
import { useLocation } from "react-router-dom";


const ContactsActionbar = ({ active="", setActive="" }) => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const shouldShowOpenClosed = (routePath) => {
    const pathsToShow = [routePath];
    return pathsToShow.includes(location.pathname);
  };
  return (
    <>
      {shouldShowOpenClosed(ROUTES.CONTACTS) &&
        <div className="flex justify-between items-center mb-6">
          <div className="flex">
            <div
              onClick={() => {
                setActive(contactTab.PARTNERS);
              }}
              className={`${active === contactTab.PARTNERS ? "bg-badge-gray" : ""
                } px-4 py-2 rounded-full mr-4 cursor-pointer`}
            >
              <span className="text-base font-medium text-secondary-800">
                Partners
              </span>
            </div>
            <div
              onClick={() => {
                setActive(contactTab.CLIENTS);
              }}
              className={`${active === contactTab.CLIENTS ? "bg-badge-gray" : ""
                } px-4 py-2 rounded-full mr-4 cursor-pointer`}
            >
              <span className="text-base font-medium text-secondary-800">
                Clients
              </span>
            </div>
            <div
              onClick={() => {
                setActive(contactTab.OTHERS);
              }}
              className={`${active === contactTab.OTHERS ? "bg-badge-gray" : ""
                } px-4 py-2 rounded-full mr-4 cursor-pointer`}
            >
              <span className="text-base font-medium text-secondary-800">
                Others
              </span>
            </div>
          </div>
          <div>
            <XButton text="New case" icon={<FiPlus className="text-base mr-2 inline-block" />} className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium ml-4" onClick={toggleModal} />
            {isModalOpen && <NewCaseModal onClose={toggleModal} />}
          </div>
        </div>}

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

