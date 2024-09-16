import React from 'react';
import { Modal } from 'flowbite-react';
import XButton from "../../components/button/XButton"


const ComposeEmail = ({ onClose }) => {
  return (
    <Modal show={true} size="md" onClose={onClose} className="new-case-modal calendar-modal">
    <Modal.Header className="border-b-0">
      <h2 className="text-4 font-medium text-secondary-800">Compose Message</h2>
    </Modal.Header>

    <Modal.Body className="pt-3">
      <div className="rounded-2xl mb-2">
        <div className="mb-4">
          <label className="block text-sm font-medium text-secondary-800">To</label>
          <input
            type="text"
            value="Jack Fu"
            readOnly
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-secondary-800">Subject</label>
          <input
            type="text"
            value="Contract review scheduling"
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-secondary-800">Message</label>
          <textarea
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg h-40"
            defaultValue={`Dear Counsel,

Enclosed please find the proposed contract of sale and rider regarding the above-referenced transaction. Please kindly review and if it is acceptable to you and your clients, please have your client sign one (1) original and return to our office together with the downpayment check in the amount of $20,000.00 made payable to "MG LAW GROUP PLLC, as attorney".

Please be advised that nothing is binding on our client until approved and signed by our client. Should you have any questions regarding this matter you may call our office. Thank you!

Thank you!
Gary Tang
Paralegal ; Office Manager`}
          ></textarea>
        </div>

        <div className="flex justify-end mt-6">
          <XButton
            text="Cancel"
            onClick={onClose}
            className="bg-badge-gray text-base text-primary2 py-[10px] px-6 rounded-[100px] w-1/3"
          />
          <XButton
            text="Send"
            className="bg-primary2 text-white text-base py-[10px] px-6 rounded-[100px] ml-4 w-1/3"
          />
        </div>
      </div>
    </Modal.Body>
  </Modal>
  );
};

export default ComposeEmail;
