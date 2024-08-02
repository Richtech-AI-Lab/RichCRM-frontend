import React, { useState } from "react";
import XButton from "../button/XButton";
import { caseDetailTab, SORT_OPTIONS } from "../../constants/constants";
import { FiEdit3 } from "react-icons/fi";
import { RiDownloadLine } from "react-icons/ri";

const CasesActionbar = ({ active, setActive }) => {
    return (
        <div className="flex justify-between items-center mb-6">
            <div className="flex">
                <div onClick={() => { setActive(caseDetailTab.PARTICIPANTS) }} className={`${active === caseDetailTab.PARTICIPANTS ? "bg-badge-gray" : ""} px-4 py-2 rounded-full mr-4 cursor-pointer`}>
                    <span className="text-base font-medium text-secondary-800">Participants</span>
                </div>
                <div onClick={() => { setActive(caseDetailTab.PREMISES) }} className={`${active === caseDetailTab.PREMISES ? "bg-badge-gray" : ""} px-4 py-2 rounded-full mr-4 cursor-pointer`}>
                    <span className="text-base font-medium text-secondary-800">Premises</span>
                </div>
                <div onClick={() => { setActive(caseDetailTab.OTHERS) }} className={`${active === caseDetailTab.OTHERS ? "bg-badge-gray" : ""} px-4 py-2 rounded-full mr-4 cursor-pointer`}>
                    <span className="text-base font-medium text-secondary-800">Others</span>
                </div>
            </div>
            <div>
                <XButton text="Edit" icon={<FiEdit3 className="text-base mr-2 inline-block" />} className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium" />
                <XButton text="Export" icon={<RiDownloadLine className="text-base mr-2 inline-block" />} className="bg-primary2 text-sm text-white py-[10px] px-6 rounded-[100px] font-medium ml-4" />
            </div>
        </div>
    );
};

export default CasesActionbar;

