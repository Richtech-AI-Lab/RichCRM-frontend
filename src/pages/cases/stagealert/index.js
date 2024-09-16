import React from 'react';
import { Modal } from 'flowbite-react';
import XButton from '../../../components/button/XButton';


const StageUncompleteAlert = ({ onMove, onClose }) => {

    return (
        <Modal show={true} size="md" onClose={onClose} className="new-case-modal calendar-modal">
            <Modal.Header className="border-b-0">
                <h2 className="text-4 font-medium text-secondary-800">You have unfinished tasks</h2>
            </Modal.Header>
            <Modal.Body className="pt-3">
                <div className="rounded-2xl mb-2">
                    <p className="text-sm text-secondary-800 font-medium mb-1">There are unfinished tasks in the current stage, do you want to ignore it and move on to the next stage? You can always go back to the current phase to view the tasks.</p>
                    <div className="flex justify-end mt-6">
                        <XButton text="Move Anyway" onClick={()=>onMove()} className="bg-badge-gray text-base text-primary2 py-[10px] px-6 rounded-[100px] w-1/2" />
                        <XButton text="Back" onClick={()=>onClose()} className="bg-primary2 text-white text-base py-[10px] px-6 rounded-[100px] ml-4 w-1/2" />
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default StageUncompleteAlert;
