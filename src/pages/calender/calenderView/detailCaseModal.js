import React from 'react';
import { Modal } from 'flowbite-react';
import XButton from '../../../components/button/XButton';
import { daysLeft } from '../../../utils';
import { ROUTES } from '../../../constants/api';
import { useNavigate } from 'react-router-dom';


const DetailCaseModal = ({ onAddReminderClick, onClose, eventData, title, clientName, premisesName }) => {
  const navigate = useNavigate();
  const toggleDetailModalOpenAdd = () => {
    onAddReminderClick()
    onClose()
  };

  const handleCaseCardClick = () => {
    localStorage.setItem("c_id", eventData?.caseId)
    navigate(ROUTES.CASES_DATA, { state: { casedetails : eventData } });
  };

  return (
    <Modal show={true} size="md" onClose={onClose} className="new-case-modal calendar-modal">
      <Modal.Header className="border-b-0">
        <h2 className="text-4 font-medium text-secondary-800">Reminder details</h2>
      </Modal.Header>
      <Modal.Body className="pt-3">
        <div className="rounded-2xl mb-2">
          <h2 className="text-[22px] font-medium text-secondary-800 mb-4">{title} in <span className="text-danger-100">{title ==="Closing Due" ? daysLeft(eventData?.closingDate) : daysLeft(eventData?.mortgageContingencyDate)} days</span></h2>
          <p className="text-base text-secondary-800 font-semibold mb-1">{clientName}</p>
          <p className="text-sm text-secondary-800 font-medium mb-1">{premisesName}</p>
          <span className="text-sm text-secondary-300">{eventData?.caseType ? "Selling" : "Premises"}</span>
          <div className="flex justify-end mt-6">
            <XButton text="Extended" onClick={toggleDetailModalOpenAdd} className="bg-badge-gray text-base text-primary2 py-[10px] px-6 rounded-[100px] w-1/2" />
            <XButton text="View Case Details"  onClick={handleCaseCardClick} className="bg-primary2 text-white text-base py-[10px] px-6 rounded-[100px] ml-4 w-1/2" />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DetailCaseModal;
