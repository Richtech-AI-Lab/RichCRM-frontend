import React, { useState } from "react";
import XButton from "../button/XButton";
import { caseDetailTab, SORT_OPTIONS } from "../../constants/constants";
import { FiEdit3, FiPlus } from "react-icons/fi";
import { RiDownloadLine } from "react-icons/ri";
import CaseExportModal from "../caseExportModal";
import { ROUTES } from "../../constants/api";
import { useLocation } from "react-router-dom";
import ContactTabs from "./contactTabs";
import CaseExportPdf from "../caseExportPdf";


const CasesActionbar = ({ active="", setActive="", setIsEdit="" , isEdit }) => {

    const location = useLocation();
    const [pdfModal, setPdfModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
      };
      const togglePdf = () => {
        setPdfModal(!pdfModal);
      };
      const toggleEdit = () => {
        setIsEdit(prevState => !prevState);
      };
      const shouldShowOpenClosed = () => {
        const pathsToShow = [ROUTES.CONTACTS];
        return pathsToShow.includes(location.pathname);
      };

      const addFromCasesTabs = [
        { id: caseDetailTab.PARTICIPANTS, label: "Participants" },
        { id: caseDetailTab.PREMISES, label: "Premises" },
        { id: caseDetailTab.OTHERS, label: "Others" }
      ];
    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <div className="flex">
          <ContactTabs active={active} setActive={setActive} tabs={addFromCasesTabs} />
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
               { !isEdit && <XButton
                  text="Edit"
                  onClick={toggleEdit}
                  icon={<FiEdit3 className="text-base mr-2 inline-block" />}
                  className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium"
                />}
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
        {isModalOpen && <CaseExportModal onClose={toggleModal} setPdfModal={togglePdf} />}
        {pdfModal && <CaseExportPdf onClose={togglePdf}/>}
      </>
    );
};

export default CasesActionbar;

