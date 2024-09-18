import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { settingTab, settingTabLabel } from "../../../constants/constants";
import ContactTabs from "../../../components/actionbar/contactTabs";


const SettingActionbar = ({ active = "", setActive = "", setIsEdit = "", isEdit }) => {

    const location = useLocation();

    const toggleEdit = () => {
        setIsEdit(prevState => !prevState);
    };

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <div className="flex">
                    <ContactTabs active={active} setActive={setActive} tabs={settingTabLabel} />
                </div>
            </div>
        </>
    );
};

export default SettingActionbar;

