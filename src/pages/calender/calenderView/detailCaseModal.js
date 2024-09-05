import React from 'react';
import { Modal } from 'flowbite-react';
import XButton from '../../../components/button/XButton';


const DetailCaseModal = ({ onAddReminderClick, onClose }) => {
  return (
    <Modal show={true} size="md" onClose={onClose} className="new-case-modal">
      <Modal.Header className="border-b-0">
        <h2 className="text-[28px] font-medium text-secondary-800">Reminder details</h2>
      </Modal.Header>
      <Modal.Body>
        <div className="card rounded-2xl mb-2">
          <h2 className="text-[28px] font-medium text-secondary-800">Mortgage Due in 4 Days</h2>
          <p className="text-base text-secondary-800 font-semibold">Woooo, Larry</p>
          <p className="text-sm text-secondary-800 font-medium">130 W 3rd St # 1203_New York NY 10012-1296</p>
          <span className="text-xs text-secondary-700">Selling</span>
          <div className="flex justify-end mt-6">
            <XButton text="Extended" onClick={onAddReminderClick} className="bg-badge-gray text-base text-primary py-[10px] px-6 rounded-[100px]" />
            <XButton text="View Case Details" className="bg-primary text-white text-base py-[10px] px-6 rounded-[100px] ml-4" />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DetailCaseModal;
