import React from 'react';
import XButton from '../button/XButton';

const FormButton = ({onSave, onCancel }) => {
  return (
    <div className="flex justify-end mt-6 fixed bottom-5 right-5">
      <XButton
        text="Cancel"
        type="button" 
        onClick={onCancel} 
        className="bg-badge-gray font-medium text-base text-primary py-[10px] px-6 rounded-[100px] shadow-shadow-light"
      />
      <XButton
        type="submit"
        text="Save Changes"
        onClick={onSave}
        className="bg-primary text-base text-white py-[10px] px-6 rounded-[100px] ml-4 shadow-shadow-light"
      />
    </div>
  );
};

export default FormButton;