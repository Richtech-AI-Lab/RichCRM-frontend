import React from 'react';
import { Modal } from 'flowbite-react';
import XButton from '../../../components/button/XButton';


const DetailCaseModal = ({ onAddReminderClick, onClose }) => {
  return (
    <Modal show={true} size="md" onClose={onClose} className="new-case-modal calendar-modal">
      <Modal.Header className="border-b-0">
        <h2 className="text-4 font-medium text-secondary-800">Reminder details</h2>
      </Modal.Header>
      <Modal.Body className="pt-3">
        <div className="rounded-2xl mb-2">
          <h2 className="text-[22px] font-medium text-secondary-800 mb-4">Mortgage Due in <span className="text-danger-100">4 Days</span></h2>
          <p className="text-base text-secondary-800 font-semibold mb-1">Woooo, Larry</p>
          <p className="text-sm text-secondary-800 font-medium mb-1">130 W 3rd St # 1203_New York NY 10012-1296</p>
          <span className="text-sm text-secondary-300">Selling</span>
          <div className="flex justify-end mt-6">
            <XButton text="Extended" onClick={onAddReminderClick} className="bg-badge-gray text-base text-primary2 py-[10px] px-6 rounded-[100px] w-1/2" />
            <XButton text="View Case Details" className="bg-primary2 text-white text-base py-[10px] px-6 rounded-[100px] ml-4 w-1/2" />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DetailCaseModal;
