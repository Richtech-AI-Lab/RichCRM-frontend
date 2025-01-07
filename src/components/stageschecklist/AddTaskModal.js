import React, { useCallback, useEffect, useState } from "react";
import { Checkbox, Label, Modal, Spinner } from 'flowbite-react';
import XButton from "../button/XButton";
import NewCaseDropdown from "../newcasedropdown";
import TextInput from "../TextInput";


const AddTaskModal = ({ onClose, title }) => {
    const keyValueArray = [
        { value: 0, label: "ACTION" },
        { value: 1, label: "CONTACT" },
        { value: 2, label: "UPLOAD" }
    ];
    return (
        <Modal show={true} size="md" onClose={onClose} className="new-case-modal">
            <Modal.Header className="border-b-0">
                {true && <div className="flex flex-col justify-center items-start gap-2 self-stretch">
                    <span className="font-sans text-[28px] font-medium leading-[36px]">Add a task</span>
                    <p className="font-sans text-sm font-normal leading-[20px] tracking-[0.25px]">Create a task by filling the basic information about the task.</p>
                </div>}
            </Modal.Header>
            <Modal.Body className="flex items-center self-stretch p-3 px-4">
                <div className="flex flex-col gap-8 w-full">
                    <div className='flex flex-col gap-4 self-stretch'>
                        <div className={`text-base font-medium leading-6 tracking-wide`}>Event Type</div>
                        <div className={`items-dropdown single-select gray-btn `}  >
                            <NewCaseDropdown
                                name="state"
                                // value={values.state}
                                //   onChange={handleChange}
                                //   onBlur={handleBlur}
                                options={keyValueArray}
                            // field={{ name: "state" }}
                            // form={{ errors, touched }}
                            />
                        </div>
                    </div>
                    <TextInput
                        name="title"
                        type="text"
                        placeholder="Event Name"
                    />
                    <div className="flex gap-4 justify-end">
                        <XButton
                            text={"Cancel"}
                            onClick={onClose}
                            // disabled={isSubmitting}
                            className="bg-card-300 text-sm text-primary2 py-[10px] px-6 rounded-[100px]"
                        />
                        <XButton
                            type="submit"
                            text={"Create"}
                            // disabled={isSubmitting}
                            className="bg-primary text-sm text-white py-[10px] px-6 rounded-[100px]"
                        />
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default AddTaskModal;
