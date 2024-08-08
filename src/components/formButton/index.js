import React from 'react';
import XButton from '../button/XButton';

const FormButton = ({onSave }) => {
  return (
    <div className="flex justify-end mt-6">
      <XButton
        text="Cancel"
        className="bg-badge-gray font-medium text-base text-primary py-[10px] px-6 rounded-[100px] shadow-shadow-light"
      />
      <XButton
        type="submit"
        text="Save Changes"
        onClick={onSave}
        className="bg-primary text-base text-white py-[10px] px-6 rounded-[100px] ml-4"
      />
    </div>
  );
};

export default FormButton;