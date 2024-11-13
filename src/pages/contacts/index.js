import React, { useEffect, useState } from "react";
import { contactTab } from "../../constants/constants";
import { SlArrowRight } from "react-icons/sl";
import ContactsActionbar from "../../components/actionbar/contactsActionBar";
import ContactListingV1 from "./contactListingV1";
import { ROUTES } from "../../constants/api";
import { useLocation } from "react-router-dom";
import { clearOrgData } from "../../redux/actions/organizationActions";
import { useDispatch, useSelector } from "react-redux";

const Contacts = () => {
  const dispatch= useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [activeFilterOrg, setActiveFilterOrg] = useState(0);
  const tagDetails = useSelector((state) => state.tag.tag);
  const [activeFilterTag, setActiveFilterTag] = useState(
    tagDetails && tagDetails.length > 0 ? tagDetails[0]?.label : ''
  );
  const location = useLocation();
  const shouldShow = (routePath) => {
    const pathsToShow = [routePath];
    return pathsToShow.includes(location.pathname);
  };

  useEffect(()=>{
    dispatch(clearOrgData())
  },[])

  return (
    <div className={shouldShow(ROUTES.DASHBOARD) ? "mt-2" : "mt-14" }>
      <ContactsActionbar active={activeTab} setActive={setActiveTab} activeFilterOrg={activeFilterOrg} setActiveFilterOrg={setActiveFilterOrg} activeFilterTag={activeFilterTag} setActiveFilterTag={setActiveFilterTag}/>
      <ContactListingV1 active={activeTab} activeFilterOrg={activeFilterOrg} activeFilterTag={activeFilterTag} />
    </div>
  );
};

export default Contacts;
