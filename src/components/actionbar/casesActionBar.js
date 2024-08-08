import React, { useState } from "react";
import XButton from "../button/XButton";
import { caseDetailTab, SORT_OPTIONS } from "../../constants/constants";
import { FiEdit3, FiPlus } from "react-icons/fi";
import { RiDownloadLine } from "react-icons/ri";
import CaseExportModal from "../caseExportModal";
import { ROUTES } from "../../constants/api";
import { useLocation } from "react-router-dom";


const CasesActionbar = ({ active, setActive }) => {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
      };

      const shouldShowOpenClosed = () => {
        const pathsToShow = [ROUTES.CONTACTS];
        return pathsToShow.includes(location.pathname);
      };
    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <div className="flex">
            <div
              onClick={() => {
                setActive(caseDetailTab.PARTICIPANTS);
              }}
              className={`${
                active === caseDetailTab.PARTICIPANTS ? "bg-badge-gray" : ""
              } px-4 py-2 rounded-full mr-4 cursor-pointer`}
            >
              <span className="text-base font-medium text-secondary-800">
                Participants
              </span>
            </div>
            <div
              onClick={() => {
                setActive(caseDetailTab.PREMISES);
              }}
              className={`${
                active === caseDetailTab.PREMISES ? "bg-badge-gray" : ""
              } px-4 py-2 rounded-full mr-4 cursor-pointer`}
            >
              <span className="text-base font-medium text-secondary-800">
                Premises
              </span>
            </div>
            <div
              onClick={() => {
                setActive(caseDetailTab.OTHERS);
              }}
              className={`${
                active === caseDetailTab.OTHERS ? "bg-badge-gray" : ""
              } px-4 py-2 rounded-full mr-4 cursor-pointer`}
            >
              <span className="text-base font-medium text-secondary-800">
                Others
              </span>
            </div>
          </div>
          <div>
            {shouldShowOpenClosed() ? (
              <XButton
                text="New case"
                icon={<FiPlus className="text-base mr-2 inline-block" />}
                className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium ml-4"
                onClick={toggleModal}
              />
            ) : (
              <>
                <XButton
                  text="Edit"
                  icon={<FiEdit3 className="text-base mr-2 inline-block" />}
                  className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium"
                />
                <XButton
                  text="Export"
                  onClick={toggleModal}
                  icon={
                    <RiDownloadLine className="text-base mr-2 inline-block" />
                  }
                  className="bg-primary2 text-sm text-white py-[10px] px-6 rounded-[100px] font-medium ml-4"
                />
              </>
            )}
          </div>
        </div>
        {isModalOpen && <CaseExportModal onClose={toggleModal} />}
      </>
    );
};

export default CasesActionbar;

