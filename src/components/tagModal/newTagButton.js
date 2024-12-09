import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import XButton from '../button/XButton';
import { IMAGES } from '../../constants/imagePath';

const TagButtonWithModal = ({ buttonClass, modalClass, modalContent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div>
      <XButton
        text="Edit Tag"
        icon={<img
          src={IMAGES.editTag}
          alt="icon"
          className='w-[14px] h-[14px] mr-2 mt-1'
        />}
        // icon={<FiPlus className="text-base mr-2 inline-block" />}
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