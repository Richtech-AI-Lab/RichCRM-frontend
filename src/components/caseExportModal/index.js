import React, { useState } from "react";
import { Modal } from "flowbite-react";
import XButton from "../button/XButton";
import SelectInput from "../selectinput";
import { RiDownloadLine } from "react-icons/ri";

const CaseExportModal = ({ onClose }) => {
    const dropdownOptions = [{ value: 1, label: "case overview" }, { value: 2, label: "case details" }]
    return (
        <>
        <Modal show={true} size="md" onClose={onClose} className="new-case-modal">
            <Modal.Header className="border-b-0">
                <div>
                    <h2 className="mb-2 text-[28px] leading-9 font-medium text-secondary-800">Export</h2>
                </div>
            </Modal.Header>
            <Modal.Body>
                    <div className="space-y-6">
                        <div>
                            <h2>Template</h2>
                            <div className="flex items-center w-full" >
                                <div className="flex items-center w-full gap-7">
                                    <div className="grid gap-3">
                                        <SelectInput
                                            inputClassName="bg-white shadow-shadow-light py-[12px] px-6 rounded-full border-0 text-base leading-5 font-semibold text-label"
                                            labelClassName="ext-label mr-3"
                                            name='Template'
                                            options={dropdownOptions.map((option) => ({
                                                value: option.id,
                                                label: option.label,
                                            }))}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2>Format</h2>
                            <div className="flex items-center w-full" >
                                <div className="flex items-center w-full gap-7">
                                    <div className="grid gap-3">
                                        <SelectInput
                                            inputClassName="bg-white shadow-shadow-light py-[12px] px-6 rounded-full border-0 text-base leading-5 font-semibold text-label"
                                            labelClassName="ext-label mr-3"
                                            name='Template'
                                            options={dropdownOptions.map((option) => ({
                                                value: option.id,
                                                label: option.label,
                                            }))}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <XButton text="Cancel" onClick={onClose} className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium" />
                    <XButton text="Save" icon={<RiDownloadLine className="text-base mr-2 inline-block" />} className="bg-primary2 text-sm text-white py-[10px] px-6 rounded-[100px] font-medium ml-4" />
                    </div>
                </Modal.Body>
        </Modal >
        </>
    );
};

export default CaseExportModal;
