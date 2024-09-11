import React, { useState } from 'react';

import { FiPlus } from 'react-icons/fi';
import NewContactModal from '../contactModal/newContactModal';
import XButton from '../button/XButton';

const ContactButtonWithModal = ({ buttonClass, modalClass, modalContent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div>
      <XButton
        text="New Contact"
        icon={<FiPlus className="text-base mr-2 inline-block" />}
        className={buttonClass}
        onClick={toggleModal}
      />
      {isModalOpen && (
        <NewContactModal className={modalClass} onClose={toggleModal} />
      )}
    </div>
  );
};

export default ContactButtonWithModal;