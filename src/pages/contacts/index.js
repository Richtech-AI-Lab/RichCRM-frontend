import React, { useState } from "react";
import { contactTab } from "../../constants/constants";
import ContactsActionbar from "../../components/actionbar/contactsActionBar";
import ContactListingV1 from "./contactListingV1";
import { ROUTES } from "../../constants/api";
import { useLocation } from "react-router-dom";

const Contacts = () => {
  const [activeTab, setActiveTab] = useState(0);
  const location = useLocation();
  const shouldShow = (routePath) => {
    const pathsToShow = [routePath];
    return pathsToShow.includes(location.pathname);
  };
  return (
    <div className={shouldShow(ROUTES.DASHBOARD) ? "mt-2" : "mt-14" }>
      <ContactsActionbar active={activeTab} setActive={setActiveTab} />
      <ContactListingV1 active={activeTab} />
    </div>
  );
};

export default Contacts;
