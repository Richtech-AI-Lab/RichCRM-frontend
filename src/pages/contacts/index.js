import React, { useState } from "react";
import CasesActionbar from "../../components/actionbar/casesActionBar";
import { caseDetailTab } from "../../constants/constants";

const Contacts = () => {
  const [activeTab, setActiveTab] = useState(caseDetailTab.PARTICIPANTS);

  return (
    <div className="mt-14">
      <CasesActionbar active={activeTab} setActive={setActiveTab} />
    </div>
  );
};

export default Contacts;
