import React, { useState } from "react";
import { contactTab } from "../../constants/constants";
import { SlArrowRight } from "react-icons/sl";
import ContactsActionbar from "../../components/actionbar/contactsActionBar";
import ContactListingV1 from "./contactListingV1";
import { ROUTES } from "../../constants/api";
import { useLocation } from "react-router-dom";
import { PageHeader } from "../../components";

const Contacts = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeFilter, setActiveFilter] = useState(0);
  const location = useLocation();
  const shouldShow = (routePath) => {
    const pathsToShow = [routePath];
    return pathsToShow.includes(location.pathname);
  };
  return (
    <div className={shouldShow(ROUTES.DASHBOARD) ? "mt-2" : "mt-14" }>
      <ContactsActionbar active={activeTab} setActive={setActiveTab} activeFilter={activeFilter} setActiveFilter={setActiveFilter}/>
      <ContactListingV1 active={activeTab} activeFilter={activeFilter}/>
    </div>
  );
};

export default Contacts;
