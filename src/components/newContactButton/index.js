import React, { useState } from 'react';

import { FiPlus } from 'react-icons/fi';
import NewContactModal from '../contactModal/newContactModal';
import XButton from '../button/XButton';
import NewContactModalV1 from '../contactModal/newIndividualContactModalV1';

const ContactButtonWithModal = ({ buttonClass, modalClass, modalContent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div>
      <XButton
        text="New Contact"
        icon={<FiPlus className="text-base mr-2 w-[18px] h-[18px] inline-block" />}
        className={buttonClass}
        onClick={toggleModal}
      />
      {isModalOpen && (
        React.cloneElement(modalContent, { onClose: toggleModal })
      )}
    </div>
  );
};

export default ContactButtonWithModal;