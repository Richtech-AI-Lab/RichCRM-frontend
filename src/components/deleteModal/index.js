import React from 'react';
import { Modal } from 'flowbite-react';
import XButton from '../button/XButton';

const DeleteModal = ({ isOpen, onConfirm, onCancel, title, message, confirmText, cancelText }) => {
    return (
        <Modal show={isOpen} size="md" onClose={onCancel} className="new-case-modal calendar-modal">
            <Modal.Header className="border-b-0">
                <h2 className="text-4 font-medium text-secondary-800">{title}</h2>
            </Modal.Header>
            <Modal.Body className="pt-3">
                <div className="rounded-2xl mb-2">
                    <p className="text-sm text-secondary-800 font-medium mb-1">{message}</p>
                    <div className="flex justify-end mt-6">
                        <XButton 
                            text={confirmText} 
                            onClick={onConfirm}
                            className="bg-primary2 text-white text-base py-[10px] px-6 rounded-[100px] ml-4 w-1/2" 
                        />
                        <XButton
                            text={cancelText} 
                            onClick={onCancel} 
                            className="bg-gray-300 text-base text-secondary-800 py-[10px] px-6 rounded-[100px] ml-4 w-1/2" 
                        />
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default DeleteModal;
