import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import XButton from '../button/XButton';

const TagButtonWithModal = ({ buttonClass, modalClass, modalContent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div>
      <XButton
        text="New Tags"
        icon={<FiPlus className="text-base mr-2 inline-block" />}
        className={buttonClass}
        onClick={toggleModal}
      />
      {isModalOpen && (
        React.cloneElement(modalContent, { onClose: toggleModal })
      )}
    </div>
  );
};

export default TagButtonWithModal;