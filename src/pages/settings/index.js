import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { settingTab, settingTabLabel } from "../../constants/constants";
import SettingActionbar from "./actionbar";
import { ProfileSetting } from "./form/profilesetting";
import { GeneralSetting } from "./form/generalsetting";
import { LinkSetting } from "./form/linksetting";

const Setting = () => {
  const dispatch = useDispatch();
  
  const [activeTab, setActiveTab] = useState(settingTab.PROFILE);
  const [isEdit, setIsEdit] = useState(false)

  const getTitleByActiveTab = (activeTab) => {
    const activeLabel = settingTabLabel.find(tab => tab.id === activeTab);
    return activeLabel ? activeLabel.label : "Default Title";
  };
  const renderActiveTab = (activeTab) => {
    switch (activeTab) {
      case settingTab.PROFILE:
        return <ProfileSetting title={getTitleByActiveTab(activeTab)} isEdit={isEdit} setIsEdit={setIsEdit} />;
      case settingTab.GENERAL:
        return <GeneralSetting title={getTitleByActiveTab(activeTab)} isEdit={isEdit} setIsEdit={setIsEdit} />;
      case settingTab.LINK_PREFRENCES:
        return <LinkSetting title={getTitleByActiveTab(activeTab)} isEdit={isEdit} setIsEdit={setIsEdit} />;
      default:
        return <ProfileSetting title={getTitleByActiveTab(activeTab)} isEdit={isEdit} setIsEdit={setIsEdit} />;
    }
  };

  return (
    <div>
      <SettingActionbar active={activeTab} setActive={setActiveTab} />
      <div className="grid grid-cols-12 gap-6">
      <div className="col-span-6">
      {renderActiveTab(activeTab)}
      </div>
      </div>
      
    </div>
  );
};

export default Setting;

